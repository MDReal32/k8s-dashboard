#!/bin/bash

pushd "$(dirname "$0")" || exit

kubectl create ns kubeview-test || true
helm upgrade --install kubeview-test ../external/kubeview/charts/kubeview --namespace kubeview-test --values ../values/kubeview.yml
