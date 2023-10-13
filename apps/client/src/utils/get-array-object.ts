import { K8sResource, ResourceTypeMap } from "../types";
import { getAppName } from "./get-app-name";

export const getArrayObject = <TResource extends ResourceTypeMap[K8sResource]>(
  data: TResource[]
) => {
  const dataObject = data?.reduce(
    (acc, node) => {
      const appName = getAppName(node);
      const nodeName = node.metadata?.name;

      if (appName) {
        acc.byAppName[appName] ||= [];
        acc.byAppName[appName].push(node);
      }

      if (nodeName) {
        acc.dataObject[nodeName] = node;
      } else {
        throw new Error(`Name of node not found`, { cause: node });
      }

      return acc;
    },
    {
      dataObject: {} as Record<string, TResource>,
      byAppName: {} as Record<string, TResource[]>
    }
  );

  return Object.assign(data, dataObject);
};
