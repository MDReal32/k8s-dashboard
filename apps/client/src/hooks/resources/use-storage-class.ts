import { useCallback } from "react";

import { ResourceTypes } from "@k8sd/shared";

import { UseResource } from "../../types/use-resource";
import { useAddOwnerReferences } from "./extends/use-add-owner-references";
import { useGetArrayObject } from "./extends/use-get-array-object";

export const useStorageClass: UseResource = () => {
  const storageClasses = useGetArrayObject(ResourceTypes.STORAGE_CLASS);
  const addOwnerReference = useAddOwnerReferences();

  return useCallback(
    ({ addNode }) => {
      storageClasses.forEach(storageClass => {
        addNode(ResourceTypes.STORAGE_CLASS, storageClass);
      });
    },
    [storageClasses, addOwnerReference]
  );
};
