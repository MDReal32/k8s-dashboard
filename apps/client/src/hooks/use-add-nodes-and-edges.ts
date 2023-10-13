import { isMatch } from "lodash";
import { useCallback, useMemo } from "react";
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

  const nodesObject = useGetArrayObject(dataObject.node.data);
  const ingressesObject = useGetArrayObject(dataObject.ingress.data);
  const deploymentsObject = useGetArrayObject(dataObject.deployment.data);
  const statefulSetsObject = useGetArrayObject(dataObject.statefulSet.data);
  const daemonSetsObject = useGetArrayObject(dataObject.daemonSet.data);
  const replicaSetsObject = useGetArrayObject(dataObject.replicaSet.data);
  const jobsObject = useGetArrayObject(dataObject.job.data);
  const servicesObject = useGetArrayObject(dataObject.service.data);
  const podsObject = useGetArrayObject(dataObject.pod.data);

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
        [ResourceTypes.POD]: podsObject
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
      podsObject
    ]
  );

  const convertToGraphNode = <TResourceType extends K8sResource>(
    resourceType: TResourceType,
    node: ResourceTypeMap[TResourceType]
  ): GraphNodeType<ResourceTypeMap[TResourceType]> => {
    if (!node.metadata?.uid) {
      throw new Error(`Node ${resourceType}:${node.metadata?.name} doesn't have a uid.`);
    }

    const namespace = node.metadata?.namespace || "default";

    return {
      id: node.metadata.uid,
      label: node.metadata.name,
      fill: getColor(resourceType),
      data: { cluster: namespace, resourceType, ...node }
    };
  };

  const convertToGraphEdge = useCallback(
    (from: ResourceTypeMap[K8sResource], to: ResourceTypeMap[K8sResource]): GraphEdge => {
      if (!from.metadata?.uid || !to.metadata?.uid) {
        throw new Error(`Node ${from.metadata?.name} or ${to.metadata?.name} does not have a uid.`);
      }

      return {
        id: `${from.metadata.uid}-${to.metadata.uid}`,
        target: to.metadata.uid,
        source: from.metadata.uid,
        data: { from, to }
      };
    },
    []
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
          const ownerObject =
            allObjects[convertKindToResourceType(owner.kind)]?.dataObject[owner.name];
          if (ownerObject) {
            edges.push(convertToGraphEdge(ownerObject, node));
          }
        }
      }
      return !!owners;
    };

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
        edges.push(convertToGraphEdge(nodesObject.dataObject.minikube, ingress));
      }

      ingress.spec?.rules
        ?.flatMap(rule => rule.http?.paths || [])
        .map(path => path.backend.service?.name)
        .map(serviceName => serviceName && servicesObject.dataObject[serviceName])
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

      console.log(service);
    });
    console.groupEnd();

    console.group(ResourceTypes.JOB);
    jobsObject.forEach(job => {
      nodes.push(convertToGraphNode(ResourceTypes.JOB, job));
    });
    console.groupEnd();

    console.group(ResourceTypes.POD);
    podsObject.forEach(pod => {
      nodes.push(convertToGraphNode(ResourceTypes.POD, pod));

      const labels = pod.metadata?.labels;
      if (labels) {
        for (const [serviceLabel, services] of serviceLabelMap) {
          const parsedServiceLabel = JSON.parse(serviceLabel) as Record<string, string>;
          const matched = isMatch(labels, parsedServiceLabel);
          if (matched) {
            services.forEach(service => edges.push(convertToGraphEdge(service, pod)));
            break;
          }
        }
      }

      ownerReference(pod);
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
    allObjects
  ]);
};
