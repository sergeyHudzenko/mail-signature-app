# mail-signature-app

For running application you should have *Docker, k8s, postgresql, npm, skaffold* on your PC;

On root folder you should run:

<b>skaffold dev</b><br> or <b>DOCKER_HOST="unix:///Users/YOUR_USER/.docker/run/docker.sock" skaffold dev</b><br><br><br>

What's done: 
- I deployed a microservice architecture using docker and k8s.
- Deployed 5 services ( auth-service, frontend-service, mail-service, mysql-service, profile-service)
- I made a service that deals with authorization and authentication (auth-service). Authorization and Authentication is done using JWT. I give a token to the user when registering and logging in. There are APIs which are protected from being viewed by unauthorized users. I made a special middleware helper for checking the necessary APIs. Just apply it to the desired route.
- I originally planned that the services would communicate with each other using Message Brokers such as RabbitMQ inside k8s. For this I created a Message Bus control class (<a href="https://github.com/sergeyHudzenko/mail-signature-app/tree/main/services/profile/src/utils/message-bus.ts">services/profile/src/utils/message-bus.ts</a>). But then I didn't need to use Message Brokers in my implementation, but I kept the class for the future. So you can check this out.
- The <b style="color:red">profile-service</b> manages the user's account and gives out the necessary information when the user is logged in
- The <b style="color:red">mail-service</b> deals with access to signatures, and also has its own engine for generating emails. You can generate an email by logging in and clicking on the "Add Signature" button. After filling in all the fields you will receive a server-generated email template in shtml format. The idea is that it can work with any html, but for now it is not very flexible and can work only with certain fields. (You can find html templates here <a href="https://github.com/sergeyHudzenko/mail-signature-app/tree/main/services/mail/src/templates/mail-templates.ts">services/mail/src/templates/mail-templates.ts</a>). The engine works with double curly braces syntax like <b>{{full name}}</b> - will be replaced by your name
- I started writing integration tests, unit tests, and API tests, but didn't have time to finish them 😢 but you can check it out as well (<a href="https://github.com/sergeyHudzenko/mail-signature-app/tree/main/services/mail/tests"> /mail-signature-app/tree/main/services/mail/tests </a>)
- I added an <a href="https://github.com/sergeyHudzenko/mail-signature-app/blob/main/services/mail/src/middleware/error-handler.ts">error-handler</a> - a midwire that logs all errors, as well as a [logger](https://github.com/sergeyHudzenko/mail-signature-app/blob/main/services/mail/src/lib/logger.ts) to collect logs in the files.
- Services communicate with each other via API. The idea was that frontend would be able to communicate with services inside the cluster, without these APIs accessing the outside world. But I decided to make the APIs available to the outside world so that you could check them if needed.

<ul>
<ol>frontend-service - available on <a href="http://localhost:30000">localhost:30000</a></ol>
<ol>auth-service - available on  <a href="http://localhost:30001">localhost:30001</a></ol>
<ol>profile-service - available on  <a href="http://localhost:30002">localhost:30002</a></ol>
<ol>mail-service - available at  <a href="http://localhost:30003">localhost:30003</a></ol>
</ul> 
<small>(Yes I know I could have used <b>NGNIX ingress</b> for traffic management, but I had no time to set it up (although it is not hard) and I expose my endpoints at the very last moment</small>

<br>
<br>
<br>

# Structure
<br>
<br>
- src/abstract -- files where abstract classes are located <br>
- src/components -- components for building APIs. Each class must extend the BaseApi class. It contains the necessary methods for building the API<br>
- src/config -- This is where the class with the application configurations is located<br>
- src/database -- This is where the class for working with the database is located. It implements the Singleton pattern, initializes connections and the initial migration required for the service<br>
- src/lib -- This is the directory where you can find useful classes for simplifying the system. <br>
- src/models -- a class for working with the database<br>
- src/utils -- helper classes<br>

# API
<br>
<br>
- (GET)  http://localhost:30002/api/profile/user 
<br>Recieving user<br>
Requirements for request:<br>
<b><i>Authorization Bearer Token</i></b>
<br><br>
- (POST)  http://localhost:30001/api/auth/sign-in
<br>Sign in<br>
Requirements for request:<br>
Fields: <b><i>email, password</i></b><br>
<br><br>
- (POST)  http://localhost:30001/api/auth/sign-up
<br>Sign up <br>
Requirements for request:<br>
Fields: <b><i>email, password, fullname</i></b><br>
<br><br>
- (POST)  http://localhost:30001/api/auth/token
<br>Check token<br>
Requirements for request:<br>
<b><i>Authorization Bearer Token</i></b>
<br><br>
- (POST)  http://localhost:30003/api/mail/signature
<br>Create signature<br>
Requirements for request:<br>
<b><i>Authorization Bearer Token</i></b><br>
Fields: <b><i>fullName, title, company, email, phone, address, layout</i></b><br>
<br><br>
- (POST)  http://localhost:30003/api/mail/signature/render
<br>Render HTML Signature and return to user<br>
Requirements for request:<br>
<b><i>Authorization Bearer Token</i></b><br>
Fields: <b><i>fullName, title, company, email, phone, address, layout</i></b><br>
<br><br>
- (GET)  http://localhost:30003/api/mail/signatures
<br>Get user's signatures<br>
Requirements for request:<br>
<b><i>Authorization Bearer Token</i></b>
<br><br>
- (GET)  http://localhost:30003/api/mail/signature
<br>Get user's specific signature<br>
Requirements for request:<br>
<b><i>Authorization Bearer Token</i></b><br>
Fields: <b><i>id</i></b><br>
<br><br>
- (DELETE)  http://localhost:30003/api/mail/signature
<br>Remove user's specific signature<br>
Requirements for request:<br>
<b><i>Authorization Bearer Token</i></b><br>
Fields: <b><i>id</i></b><br>
<br><br>
