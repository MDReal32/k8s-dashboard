import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GraphCanvas, darkTheme } from "reagraph";

import { ALL_NAMESPACES, ResourceTypes } from "@k8sd/shared";

import { Controls } from "../../components/controls";
import { useGetArrayObject } from "../../hooks/resources/extends/use-get-array-object";
import { useAddNodesAndEdges } from "../../hooks/use-add-nodes-and-edges";
import { useDispatch, useSelector } from "../../hooks/use-store";
import { setMode, setNamespace } from "../../redux/reducer/pages/graph";

type GraphLayoutType = "2d" | "3d";

export const Graph = () => {
  const params = useParams();

  const { namespace, mode } = useSelector(state => state.pages.graph);
  const dispatch = useDispatch();

  const namespaces = useGetArrayObject(ResourceTypes.NAMESPACE);
  const { nodes, edges } = useAddNodesAndEdges();

  useEffect(() => {
    if (params.namespace) {
      dispatch(setNamespace(params.namespace));
    }
  }, [params.namespace]);

  return (
    <>
      <Controls>
        <select
          className="w-full"
          value={namespace}
          onChange={e => dispatch(setNamespace(e.target.value))}
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
          value={mode}
          onChange={e => dispatch(setMode(e.target.value as GraphLayoutType))}
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
          layoutType={mode === "2d" ? "forceDirected2d" : "forceDirected3d"}
          onNodeContextMenu={node => {
            console.log(node.data);
          }}
          theme={darkTheme}
        />
      </div>
    </>
  );
};
