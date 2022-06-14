`docker build . -t opencodes/client`
`docker push opencodes/client`  
`kubectl apply -f ../infra/k8s/client-depl.yaml`
`kubectl rollout restart deployment client-depl`  

 Unfortunately, create-react-app currently has two bugs that prevent it from running correctly in a docker container:
 To solve this, we have to add two environment variables to the Dockerfile in the client folder.  Find the Dockerfile in the client folder and make the following change:
# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0
dfds