import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { GraphCanvas } from "reagraph";

import { useAddNodesAndEdges } from "../../hooks/use-add-nodes-and-edges";
import { useGetResources } from "../../hooks/use-get-resources";
import { ResourceTypes } from "../../types";

export const Graph = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const namespace = useMemo(() => urlSearchParams.get("namespace") || "default", [urlSearchParams]);

  const { namespace: namespaces, ...resources } = useGetResources(
    namespace,
    Object.values(ResourceTypes)
  );

  const { nodes, edges } = useAddNodesAndEdges(resources);

  return (
    <div>
      <select
        value={namespace}
        onChange={e => {
          setUrlSearchParams({ namespace: e.target.value });
        }}
      >
        <option key="_" value="_">
          all
        </option>
        {namespaces.data?.map(namespace => (
          <option key={namespace.metadata?.name} value={namespace.metadata?.name || ""}>
            {namespace.metadata?.name}
          </option>
        ))}
      </select>
      <div style={{ position: "relative", width: "100%", height: "calc(100vh - 100px)" }}>
        <GraphCanvas
          nodes={nodes}
          edges={edges}
          onNodeContextMenu={node => {
            console.log(node.data);
          }}
        />
      </div>
    </div>
  );
};
