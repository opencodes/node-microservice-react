`docker build . -t opencodes/comment`
`docker push opencodes/comment`  
`kubectl apply -f ../infra/k8s/comment-depl.yaml`
`kubectl rollout restart deployment comment-depl`  