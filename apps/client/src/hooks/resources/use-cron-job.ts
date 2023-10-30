import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useCronJob: UseResource = () => {
  const cronJobs = useGetArrayObject(ResourceTypes.CRON_JOB);

  return useCallback(
    ({ addNode }) => {
      cronJobs.forEach(cronJob => {
        addNode(ResourceTypes.CRON_JOB, cronJob);
      });
    },
    [cronJobs]
  );
};
