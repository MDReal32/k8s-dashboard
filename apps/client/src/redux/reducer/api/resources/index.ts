import { Reducer } from "redux";

import { CombinedState } from "@reduxjs/toolkit/query";

import { ParsableResourceTypes } from "@k8sd/shared";

import { FixName } from "../../../utils/fix-name";
import { clusterRoleBindingApi } from "./cluster-role-binding";
import { configMapApi } from "./config-map";
import { cronJobApi } from "./cron-job";
import { daemonSetApi } from "./daemon-set";
import { deploymentApi } from "./deployment";
import { endpointApi } from "./endpoint";
import { horizontalPodAutoscalerApi } from "./horizontal-pod-autoscaler";
import { ingressApi } from "./ingress";
import { jobApi } from "./job";
import { namespaceApi } from "./namespace";
import { nodeApi } from "./node";
import { podApi } from "./pod";
import { replicaSetApi } from "./replica-set";
import { roleApi } from "./role";
import { roleBindingApi } from "./role-binding";
import { secretApi } from "./secret";
import { serviceApi } from "./service";
import { serviceAccountApi } from "./service-account";
import { statefulSetApi } from "./stateful-set";
import { storageClassApi } from "./storage-class";

export const resourceApis = {
  "namespace": namespaceApi,
  "node": nodeApi,
  "ingress": ingressApi,
  "deployment": deploymentApi,
  "stateful-set": statefulSetApi,
  "statefulSet": statefulSetApi,
  "daemon-set": daemonSetApi,
  "daemonSet": daemonSetApi,
  "replica-set": replicaSetApi,
  "replicaSet": replicaSetApi,
  "cron-job": cronJobApi,
  "cronJob": cronJobApi,
  "service": serviceApi,
  "service-account": serviceAccountApi,
  "serviceAccount": serviceAccountApi,
  "horizontal-pod-autoscaler": horizontalPodAutoscalerApi,
  "horizontalPodAutoscaler": horizontalPodAutoscalerApi,
  "job": jobApi,
  "pod": podApi,
  "endpoint": endpointApi,
  "config-map": configMapApi,
  "configMap": configMapApi,
  "secret": secretApi,
  "storage-class": storageClassApi,
  "storageClass": storageClassApi,
  "cluster-role-binding": clusterRoleBindingApi,
  "clusterRoleBinding": clusterRoleBindingApi,
  "role-binding": roleBindingApi,
  "roleBinding": roleBindingApi,
  "role": roleApi
} satisfies Record<
  ParsableResourceTypes | FixName<ParsableResourceTypes[keyof ParsableResourceTypes] & string>,
  any
>;

export const apiReducers = {
  [namespaceApi.reducerPath]: namespaceApi.reducer,
  [nodeApi.reducerPath]: nodeApi.reducer,
  [ingressApi.reducerPath]: ingressApi.reducer,
  [deploymentApi.reducerPath]: deploymentApi.reducer,
  [statefulSetApi.reducerPath]: statefulSetApi.reducer,
  [daemonSetApi.reducerPath]: daemonSetApi.reducer,
  [replicaSetApi.reducerPath]: replicaSetApi.reducer,
  [cronJobApi.reducerPath]: cronJobApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [serviceAccountApi.reducerPath]: serviceAccountApi.reducer,
  [horizontalPodAutoscalerApi.reducerPath]: horizontalPodAutoscalerApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [podApi.reducerPath]: podApi.reducer,
  [endpointApi.reducerPath]: endpointApi.reducer,
  [configMapApi.reducerPath]: configMapApi.reducer,
  [secretApi.reducerPath]: secretApi.reducer,
  [storageClassApi.reducerPath]: storageClassApi.reducer,
  [clusterRoleBindingApi.reducerPath]: clusterRoleBindingApi.reducer,
  [roleBindingApi.reducerPath]: roleBindingApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer
} satisfies Record<
  `api.k8sd.${ParsableResourceTypes[keyof ParsableResourceTypes] & string}`,
  Reducer<CombinedState<any, any, any>>
>;
