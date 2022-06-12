`docker build . -t opencodes/moderation`
`docker push opencodes/moderation`  
`kubectl apply -f ../infra/k8s/moderation-depl.yaml`
`kubectl rollout restart deployment moderation-depl`  