import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useConvertToGraphNode } from "./extends/use-convert-to-graph-node";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useCronJob: UseResource = () => {
  const convertToGraphNode = useConvertToGraphNode();
  const cronJobs = useGetArrayObject(ResourceTypes.CRON_JOB);

  return useCallback(
    ({ addNode }) => {
      cronJobs.forEach(cronJob => {
        addNode(convertToGraphNode(ResourceTypes.CRON_JOB, cronJob));
      });
    },
    [cronJobs, convertToGraphNode]
  );
};
