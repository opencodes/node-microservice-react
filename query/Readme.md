`docker build . -t opencodes/query`
`docker push opencodes/query`  
`kubectl apply -f ../infra/k8s/query-depl.yaml`
`kubectl rollout restart deployment query-depl`  