import { isMatch } from "lodash";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { GraphEdge, GraphElementBaseAttributes, GraphNode } from "reagraph";

import { V1Service } from "@kubernetes/client-node";

import { K8sResource, ResourceTypeMap, ResourceTypes } from "../types";
import { convertKindToResourceType } from "../utils/convert-kind-to-resource-type";
import { ArrayObject, useGetArrayObject } from "./use-get-array-object";
import { useGetColorByCategory } from "./use-get-color-by-category";
import { ResourceObject } from "./use-get-resources";

type Clustered<TResource> = { cluster: string; resourceType: ResourceTypes } & TResource;
type GraphNodeType<T> = Omit<GraphNode, "data"> & GraphElementBaseAttributes<Clustered<T>>;

export const useAddNodesAndEdges = (dataObject: ResourceObject<K8sResource[]>) => {
  const getColor = useGetColorByCategory();

  const nodesObject = useGetArrayObject(ResourceTypes.NODE, dataObject.node.data);
  const ingressesObject = useGetArrayObject(ResourceTypes.INGRESS, dataObject.ingress.data);
  const deploymentsObject = useGetArrayObject(ResourceTypes.DEPLOYMENT, dataObject.deployment.data);
  const statefulSetsObject = useGetArrayObject(
    ResourceTypes.STATEFUL_SET,
    dataObject.statefulSet.data
  );
  const daemonSetsObject = useGetArrayObject(ResourceTypes.DAEMON_SET, dataObject.daemonSet.data);
  const replicaSetsObject = useGetArrayObject(
    ResourceTypes.REPLICA_SET,
    dataObject.replicaSet.data
  );
  const servicesObject = useGetArrayObject(ResourceTypes.SERVICE, dataObject.service.data);
  const jobsObject = useGetArrayObject(ResourceTypes.JOB, dataObject.job.data);
  const podsObject = useGetArrayObject(ResourceTypes.POD, dataObject.pod.data);
  const configMapObject = useGetArrayObject(ResourceTypes.CONFIG_MAP, dataObject.configMap.data);

  const allObjects = useMemo(
    () =>
      ({
        [ResourceTypes.NODE]: nodesObject,
        [ResourceTypes.INGRESS]: ingressesObject,
        [ResourceTypes.DEPLOYMENT]: deploymentsObject,
        [ResourceTypes.STATEFUL_SET]: statefulSetsObject,
        [ResourceTypes.DAEMON_SET]: daemonSetsObject,
        [ResourceTypes.REPLICA_SET]: replicaSetsObject,
        [ResourceTypes.SERVICE]: servicesObject,
        [ResourceTypes.JOB]: jobsObject,
        [ResourceTypes.POD]: podsObject,
        [ResourceTypes.CONFIG_MAP]: configMapObject
      }) satisfies Record<K8sResource, ArrayObject<ResourceTypeMap[K8sResource]>>,
    [
      nodesObject,
      ingressesObject,
      deploymentsObject,
      statefulSetsObject,
      daemonSetsObject,
      replicaSetsObject,
      servicesObject,
      jobsObject,
      podsObject,
      configMapObject
    ]
  );

  const objectResourceTypeMap = useMemo(() => {
    const objectResourceTypeMap = new Map<ResourceTypeMap[ResourceTypes], K8sResource>();

    for (const resourceType in allObjects) {
      const object = allObjects[resourceType as K8sResource];
      object.forEach(item => {
        objectResourceTypeMap.set(item, resourceType as K8sResource);
      });
    }

    return objectResourceTypeMap;
  }, [allObjects]);

  const convertToGraphNode = <TResourceType extends K8sResource>(
    resourceType: TResourceType,
    node: ResourceTypeMap[TResourceType]
  ): GraphNodeType<ResourceTypeMap[TResourceType]> => {
    if (!node.metadata?.uid) {
      throw new Error(`Node ${resourceType}:${node.metadata?.name} doesn't have a uid.`);
    }

    const namespace = node.metadata?.namespace || "default";

    return {
      id: [resourceType, node.metadata.uid].join(":"),
      label: node.metadata.name,
      fill: getColor(resourceType),
      data: { cluster: namespace, resourceType, ...node }
    };
  };

  const convertToGraphEdge = useCallback(
    (source: ResourceTypeMap[K8sResource], target: ResourceTypeMap[K8sResource]): GraphEdge => {
      const sourceUId = source.metadata?.uid;
      const targetUId = target.metadata?.uid;

      if (!sourceUId || !targetUId) {
        throw new Error(`Node ${sourceUId} or ${targetUId} does not have a uid.`);
      }

      const sourceId = [objectResourceTypeMap.get(source), sourceUId].join(":");
      const targetId = [objectResourceTypeMap.get(target), targetUId].join(":");

      return {
        id: `${sourceId}-${targetId}`,
        target: targetId,
        source: sourceId,
        data: { from: source, to: target }
      };
    },
    [objectResourceTypeMap]
  );

  return useMemo(() => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const ipMappings: Record<string, ResourceTypeMap[K8sResource]> = {};
    const ipAddresses: Record<string, ResourceTypeMap[K8sResource]> = {};
    const serviceLabelMap = new Map<string, Set<V1Service>>();

    const ownerReference = (node: ResourceTypeMap[K8sResource]) => {
      const owners = node.metadata?.ownerReferences;
      if (owners) {
        for (const owner of owners) {
          const object = allObjects[convertKindToResourceType(owner.kind)];
          const idx = object?.dataNameIndexes[owner.name];
          const item = object?.[idx];
          if (item) {
            edges.push(convertToGraphEdge(item, node));
          }
        }
      }
      return !!owners;
    };

    const byLabel = (node: ResourceTypeMap[K8sResource]) => {
      const labels = node.metadata?.labels;
      if (labels) {
        for (const [serviceLabel, services] of serviceLabelMap) {
          const parsedServiceLabel = JSON.parse(serviceLabel) as Record<string, string>;
          const matched = isMatch(labels, parsedServiceLabel);
          if (matched) {
            services.forEach(service => edges.push(convertToGraphEdge(node, service)));
            break;
          }
        }
      }
    };

    console.group(ResourceTypes.NODE);
    nodesObject.forEach(node => {
      const internalIpAddress = node.status?.addresses?.find(
        address => address.type === "InternalIP"
      )?.address;

      const graphNode = convertToGraphNode(ResourceTypes.NODE, node);
      graphNode.subLabel = graphNode.label;
      graphNode.label = internalIpAddress || graphNode.label;
      nodes.push(graphNode);

      internalIpAddress && (ipAddresses[internalIpAddress] = node);
      node.spec?.podCIDR && (ipMappings[node.spec.podCIDR] = node);
    });
    console.groupEnd();

    console.group(ResourceTypes.INGRESS);
    ingressesObject.forEach(ingress => {
      const graphNode = convertToGraphNode(ResourceTypes.INGRESS, ingress);
      graphNode.label = ingress.spec?.rules?.map(rule => rule.host).join(", ") || graphNode.label;
      nodes.push(graphNode);

      const loadBalancer = ingress.status?.loadBalancer;
      if (loadBalancer) {
        loadBalancer.ingress?.forEach(ingressLoadBalancer => {
          const ip = ingressLoadBalancer.ip;
          if (!ip) return;
          edges.push(convertToGraphEdge(ipAddresses[ip], ingress));
        });
      } else {
        edges.push(convertToGraphEdge(nodesObject[nodesObject.dataNameIndexes.minikube], ingress));
      }

      ingress.spec?.rules
        ?.flatMap(rule => rule.http?.paths || [])
        .map(path => path.backend.service?.name)
        .map(
          serviceName => serviceName && servicesObject[servicesObject.dataNameIndexes[serviceName]]
        )
        .filter(Boolean)
        .forEach(service => edges.push(convertToGraphEdge(ingress, service)));
    });
    console.groupEnd();

    console.group(ResourceTypes.DEPLOYMENT);
    deploymentsObject.forEach(deployment => {
      nodes.push(convertToGraphNode(ResourceTypes.DEPLOYMENT, deployment));
    });
    console.groupEnd();

    console.group(ResourceTypes.STATEFUL_SET);
    statefulSetsObject.forEach(statefulSet => {
      nodes.push(convertToGraphNode(ResourceTypes.STATEFUL_SET, statefulSet));
      ownerReference(statefulSet);
    });
    console.groupEnd();

    console.group(ResourceTypes.DAEMON_SET);
    daemonSetsObject.forEach(daemonSet => {
      nodes.push(convertToGraphNode(ResourceTypes.DAEMON_SET, daemonSet));
      ownerReference(daemonSet);
    });
    console.groupEnd();

    console.group(ResourceTypes.REPLICA_SET);
    replicaSetsObject.forEach(replicaSet => {
      nodes.push(convertToGraphNode(ResourceTypes.REPLICA_SET, replicaSet));
      ownerReference(replicaSet);
    });
    console.groupEnd();

    console.group(ResourceTypes.SERVICE);
    servicesObject.forEach(service => {
      nodes.push(convertToGraphNode(ResourceTypes.SERVICE, service));

      service.spec?.clusterIP && (ipAddresses[service.spec.clusterIP] = service);
      const selector = service.spec?.selector;
      if (selector) {
        const stringifySelector = JSON.stringify(selector);
        const services = serviceLabelMap.get(stringifySelector) || new Set();
        services.add(service);
        serviceLabelMap.set(stringifySelector, services);
      }
    });
    console.groupEnd();

    console.group(ResourceTypes.JOB);
    jobsObject.forEach(job => {
      nodes.push(convertToGraphNode(ResourceTypes.JOB, job));
      ownerReference(job);
    });
    console.groupEnd();

    console.group(ResourceTypes.POD);
    podsObject.forEach(pod => {
      nodes.push(convertToGraphNode(ResourceTypes.POD, pod));

      byLabel(pod);
      ownerReference(pod);

      pod.spec?.volumes?.forEach(volume => {
        volume.configMap?.name &&
          edges.push(
            convertToGraphEdge(
              pod,
              configMapObject[configMapObject.dataNameIndexes[volume.configMap.name]]
            )
          );
      });

      pod.spec?.initContainers?.forEach(container => {
        container.envFrom?.forEach(envFrom => {
          envFrom.configMapRef?.name &&
            edges.push(
              convertToGraphEdge(
                pod,
                configMapObject[configMapObject.dataNameIndexes[envFrom.configMapRef.name]]
              )
            );
        });

        container.env?.forEach(env => {
          env.valueFrom?.configMapKeyRef?.name &&
            env.valueFrom?.configMapKeyRef?.name &&
            edges.push(
              convertToGraphEdge(
                pod,
                configMapObject[
                  configMapObject.dataNameIndexes[env.valueFrom?.configMapKeyRef.name]
                ]
              )
            );
        });
      });
    });
    console.groupEnd();

    console.group(ResourceTypes.CONFIG_MAP);
    configMapObject.forEach(configMap => {
      nodes.push(convertToGraphNode(ResourceTypes.CONFIG_MAP, configMap));
    });
    console.groupEnd();

    return { nodes, edges };
  }, [
    nodesObject,
    ingressesObject,
    deploymentsObject,
    statefulSetsObject,
    daemonSetsObject,
    replicaSetsObject,
    servicesObject,
    jobsObject,
    podsObject,
    configMapObject,
    allObjects
  ]);
};
