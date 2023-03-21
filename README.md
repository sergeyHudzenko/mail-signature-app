# mail-signature-app

For running application you should have *Docker, k8s, postgresql, npm, skaffold* on your PC;

On root folder you should run:

<b>skaffold dev</b> or <b>DOCKER_HOST="unix:///Users/YOUR_USER/.docker/run/docker.sock" skaffold dev</b>

What's done: 
- I deployed a microservice architecture using docker and k8s.
- Deployed 5 services ( auth-service, frontend-service, mail-service, mysql-service, profile-service)
- Services communicate with each other via API. The idea was that frontend would be able to communicate with services inside the cluster, without these APIs accessing the outside world. But I decided to make the APIs available to the outside world so that you could check them if needed.

frontend-service - available on <a href="http://localhost:30000">localhost:30000</a>
auth-service - available on  <a href="http://localhost:30001">localhost:30001</a>
profile-service - available on  <a href="http://localhost:30002">localhost:30002</a>
mail-service - available at  <a href="http://localhost:30003">localhost:30003</a>

Translated with www.DeepL.com/Translator (free version)
