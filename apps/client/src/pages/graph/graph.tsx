import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GraphCanvas, GraphCanvasRef, useSelection } from "reagraph";

import { Controls } from "../../components/controls";
import { useAddNodesAndEdges } from "../../hooks/use-add-nodes-and-edges";
import { useGetResources } from "../../hooks/use-get-resources";
import { pathMap } from "../../routes";
import { ResourceTypes } from "../../types";

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

  const graphRef = useRef<GraphCanvasRef | null>(null);

  const { namespace: namespaces, ...resources } = useGetResources(
    namespace,
    Object.values(ResourceTypes)
  );

  const [graphLayoutType, setGraphLayoutType] = useState<GraphLayoutType>(defaultGraphLayoutType);

  const { nodes, edges } = useAddNodesAndEdges(resources);

  const { selections, onNodeClick, onCanvasClick } = useSelection({
    ref: graphRef,
    nodes,
    edges,
    focusOnSelect: false
  });

  return (
    <div>
      <Controls>
        <select value={namespace} onChange={e => navigate(pathMap.GRAPH_NAMESPACE(e.target.value))}>
          <option key="_" value="_">
            all
          </option>
          {namespaces.data?.map(namespace => (
            <option key={namespace.metadata?.name} value={namespace.metadata?.name || ""}>
              {namespace.metadata?.name}
            </option>
          ))}
        </select>

        <select
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

      <GraphCanvas
        nodes={nodes}
        edges={edges}
        cameraMode="pan"
        layoutType={graphLayoutType === "2d" ? "forceDirected2d" : "forceDirected3d"}
        selections={selections}
        onNodeClick={onNodeClick}
        onCanvasClick={onCanvasClick}
        onNodeContextMenu={node => {
          console.log(node.data);
        }}
      />
    </div>
  );
};
