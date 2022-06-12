`docker build . -t opencodes/posts`
`docker push opencodes/posts`  
`kubectl apply -f ../infra/k8s/posts-depl.yaml`
`kubectl apply -f ../infra/k8s/posts-srv.yaml`
`kubectl rollout restart deployment posts-depl`  