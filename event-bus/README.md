`docker build . -t opencodes/eventbus`
`docker push opencodes/eventbus`  
`kubectl apply -f ../infra/k8s/eventbus-depl.yaml`
`kubectl rollout restart deployment eventbus-depl`  