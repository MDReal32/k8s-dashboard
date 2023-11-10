import { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GraphCanvas, darkTheme } from "reagraph";

import { ALL_NAMESPACES, ResourceTypes } from "@k8sd/shared";

import { Controls } from "../../components/controls";
import { useGetArrayObject } from "../../hooks/resources/extends/use-get-array-object";
import { useAddNodesAndEdges } from "../../hooks/use-add-nodes-and-edges";
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
  const graphLayout = useMemo<GraphLayoutType>(
    () => (urlSearchParams.get("mode") as GraphLayoutType) || "2d",
    [urlSearchParams]
  );

  const namespaces = useGetArrayObject(ResourceTypes.NAMESPACE);
  const { nodes, edges } = useAddNodesAndEdges();

  const navigateTo = ({ namespace: ns, mode }: { namespace?: string; mode?: GraphLayoutType }) => {
    const variables: Record<string, unknown> = { namespace: ns || namespace };
    if (mode !== "2d" && mode !== graphLayout) {
      variables.mode = mode;
    }
    navigate(pathMap.GRAPH_NAMESPACE(variables as any));
  };

  return (
    <>
      <Controls>
        <select
          className="w-full"
          value={namespace}
          onChange={e => navigateTo({ namespace: e.target.value })}
        >
          <option key={ALL_NAMESPACES} value={ALL_NAMESPACES}>
            all
          </option>
          {namespaces.map(namespace => (
            <option key={namespace.metadata?.name} value={namespace.metadata?.name || ""}>
              {namespace.metadata?.name}
            </option>
          ))}
        </select>

        <select
          className="w-full"
          value={graphLayout}
          onChange={e => navigateTo({ mode: e.target.value as GraphLayoutType })}
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
          layoutType={graphLayout === "2d" ? "forceDirected2d" : "forceDirected3d"}
          onNodeContextMenu={node => {
            console.log(node.data);
          }}
          theme={darkTheme}
        />
      </div>
    </>
  );
};
