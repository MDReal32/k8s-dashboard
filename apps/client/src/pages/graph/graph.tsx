import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GraphCanvas } from "reagraph";

import { ResourceTypes } from "@k8sd/shared";

import { Controls } from "../../components/controls";
import { useAddNodesAndEdges } from "../../hooks/use-add-nodes-and-edges";
import { useGetArrayObject } from "../../hooks/use-get-array-object";
import { useGetResources } from "../../hooks/use-get-resources";
import { pathMap } from "../../routes";

type GraphLayoutType = "2d" | "3d";

export const Graph = () => {
  const [urlSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  const namespace = useMemo(
    () => params.namespace || urlSearchParams.get("namespace") || "default",
    [urlSearchParams, params]
  );

  const defaultGraphLayoutType = useMemo<GraphLayoutType>(
    () => (urlSearchParams.get("mode") as GraphLayoutType) || "2d",
    [urlSearchParams]
  );

  const { namespace: namespaces, ...resources } = useGetResources(
    namespace,
    Object.values(ResourceTypes)
  );

  const [graphLayoutType, setGraphLayoutType] = useState<GraphLayoutType>(defaultGraphLayoutType);
  const namespacesObject = useGetArrayObject(ResourceTypes.NAMESPACE, namespaces.data);

  const { nodes, edges } = useAddNodesAndEdges(resources);

  return (
    <>
      <Controls>
        <select
          className="w-full"
          value={namespace}
          onChange={e => navigate(pathMap.GRAPH_NAMESPACE(e.target.value))}
        >
          <option key="_" value="_">
            all
          </option>
          {namespacesObject.map(namespace => (
            <option key={namespace.metadata?.name} value={namespace.metadata?.name || ""}>
              {namespace.metadata?.name}
            </option>
          ))}
        </select>

        <select
          className="w-full"
          value={graphLayoutType}
          onChange={e => setGraphLayoutType(e.target.value as GraphLayoutType)}
        >
          {(["2d", "3d"] as GraphLayoutType[]).map(layout => (
            <option key={layout} value={layout}>
              {layout}
            </option>
          ))}
        </select>
      </Controls>

      <div className="h-full">
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          cameraMode="pan"
          layoutType={graphLayoutType === "2d" ? "forceDirected2d" : "forceDirected3d"}
          onNodeContextMenu={node => {
            console.log(node.data);
          }}
        />
      </div>
    </>
  );
};
