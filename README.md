
## Prerequisites

- Java
- Node
- Typescript
- Docker
- Visual Studio Code or Eclipse
- Maven

## Installation

1. Clone this repo using `git clone https://github.com/JamesBoadi/Microservices.git`
2. Move to the appropriate directory: `cd client`
3. Install dependencies: `npm install`

## Run using terminal

Open 3 terminals, one for each microservice from folder `{name}/export` 

Microservices: eureka, gateway, identity-provider

1. Run the servers from the directory `cd export` use the command `java -jar {jar goes here}` run all three jars (eureka.jar, gateway.jar, identity.jar)
2. Move to the directory of the Angular app `cd client` and run the app: `npm start`.

## Run using docker compose

This will build 3 images

1. Open a terminal from the root directory and enter `docker compose up -d`.

2. Go to the directory of the Angular app `cd client` and run the app: `npm start`.

## Configuration

You can configure the database through the `.yml` file, for each microservice you can configure it to any database you like

To generate a jar you must create a runnable jar, from Eclipse, go to file -> export, launch configuration should be the main class you want to export, and click the last option `copy required files into subfolder next to generated Jar` and run the operation.

The project is already configured as a multi module maven project, to rebuild, run `mvmw clean install` from the root of the project.

If you do not want to use docker, then go to each .yml file located in export and change the setting `defaultZone: http://eureka:8761/eureka` to 
`defaultZone: http://localhost:8761/eureka` this will run on localhost only.

## Proxy

You may also need to configure the proxy so that the client side can communicate with the microservices, go to proxy-config file `cd client` and configure based on where you running the app

localhost: `http://localhost:8761`
docker: `http://eureka:8761`

## Run Docker from a single image

If you just want to run docker containers from a single image

1. Fetch the code using git clone `https://github.com/JamesBoadi/MicroServices.git`

2. You can either run `docker build -t microservices .` from the root of directory then go to step 4. or step 3. then step 4

3. Change directory to export `cd export`

	There are 3 jars, app.jar, gateway.jar and identity.jar

    * Use the OpenJDK 8 docker image (freely available at Docker hub) as a starting point. This image defines a minimal Linux system with OpenJDK 8 preinstalled.

4. To build the container (**note** the `.` at the end, indicating to use the current directory as its working directory):

    ```sh
    docker build -t microservices .
    ```

5. Check it worked. You should see `microservices` listed.

    ```sh
    docker images
    ```
    
1. They need to talk to each other, so let's give them a network:

    ```sh
    docker network create identity-net
    ```

2. Now run the first container. This runs up the Eureka registration server, which will allow the other microservices to find each other: 

    ```sh
    docker run --name eureka --hostname eureka --network identity-net -p 8761:8761 microservices java -jar app.jar reg
    ```

    The `-d` (detach) flag is missing so all output will stream to the console so we can see what is happening.
    
3. In your browser, go to http://localhost:8761 and you should see the Eureka dashboard. There are no instances registered.

4. _In a new CMD/Terminal window_, run a second container for the gateway microservice. 

    ```sh
	docker run --name gateway --hostname gateway --network identity-net -p 8081:8081 microservices java -jar gateway.jar gateway
    ```

5. Return to the Eureka Dashboard in your browser and refresh the screen.  You should see that `GATEWAY-SERVICE` is now registered.

6. _In a new CMD/Terminal window_, run a third container for the accounts identityProvider-service. This is a web-application for viewing account information by requesting account data from the identityProvider microservice.

    ```sh
	docker run --name identity-provider --hostname identity-provider --network identity-net -p 8082:8082 microservices java -jar identity.jar identity-provider
    ```

7. Return to the Eureka Dashboard in your browser and refresh the screen.  You should see that `GATEWAY-SERVICE` and `IDENTITY-PROVIDER-SERVICE` are now registered.
 
