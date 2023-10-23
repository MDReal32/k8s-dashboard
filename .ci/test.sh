sleep 2

kubectl apply -f https://kubernetes.io/examples/controllers/job.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/master/deploy/openshift/kiali-operator.yaml
kubectl apply -f https://raw.githubusercontent.com/kiali/kiali/master/deploy/openshift/kiali-cr.yaml

sleep 10

kubectl delete -f https://kubernetes.io/examples/controllers/job.yaml
kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl delete -f https://raw.githubusercontent.com/kiali/kiali/master/deploy/openshift/kiali-operator.yaml
kubectl delete -f https://raw.githubusercontent.com/kiali/kiali/master/deploy/openshift/kiali-cr.yaml