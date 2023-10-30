kubectl create ns workload-deployment-test
kubectl apply -f https://k8s.io/examples/controllers/nginx-deployment.yaml -n workload-deployment-test
