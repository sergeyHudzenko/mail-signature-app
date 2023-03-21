# mail-signature-app

For running application you should have *Docker, k8s, postgresql, npm, skaffold* on your PC;

On root folder you should run:

<b>skaffold dev</b><br> or <b>DOCKER_HOST="unix:///Users/YOUR_USER/.docker/run/docker.sock" skaffold dev</b><br><br><br>

What's done: 
- I deployed a microservice architecture using docker and k8s.
- Deployed 5 services ( auth-service, frontend-service, mail-service, mysql-service, profile-service)
- I made a service that deals with authorization and authentication (auth-service). Authorization and Authentication is done using JWT. I give a token to the user when registering and logging in. There are APIs which are protected from being viewed by unauthorized users. I made a special middleware helper for checking the necessary APIs. Just apply it to the desired route.
- I originally planned that the services would communicate with each other using Message Brokers such as RabbitMQ inside k8s. For this I created a Message Bus control class (services/profile/src/utils/message-bus.ts). But then I didn't need to use Message Brokers in my implementation, but I kept the class for the future. So you can check this out.
- Services communicate with each other via API. The idea was that frontend would be able to communicate with services inside the cluster, without these APIs accessing the outside world. But I decided to make the APIs available to the outside world so that you could check them if needed.

<ul>
<ol>frontend-service - available on <a href="http://localhost:30000">localhost:30000</a></ol>
<ol>auth-service - available on  <a href="http://localhost:30001">localhost:30001</a></ol>
<ol>profile-service - available on  <a href="http://localhost:30002">localhost:30002</a></ol>
<ol>mail-service - available at  <a href="http://localhost:30003">localhost:30003</a></ol>
</ul> 
<small>(Yes I know I could have used <b>NGNIX ingress</b> for traffic management, but I had no time to set it up (although it is not hard) and I expose my endpoints at the very last moment</small>
