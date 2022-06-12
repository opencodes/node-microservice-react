# Kubectl Command Cheatsheet
 
## Cluster Management
Display list of running pod
`kubectl get pods`
 
Create Pod
`kubectl apply -f [yaml config file path]`

Describe  Pod
`kubectl describe pod [pod_name]`

Execute the given command in a running pod
`kubectl exec -it [pod_name] [cmd]`
 

Print out logs from the given pod
`kubectl logs [pod_name]`
 
Delete  Pod
`kubectl delete pod [pod_name]`
## Deployment

Display list of running deployments
`kubectl get deployments`

Display description of deployment
`kubectl describe deployment [depl_name]`

Create deployment
`kubectl apply -f [yaml config file path]`

Delete  deployment
`kubectl delete deployment [depl_name]`