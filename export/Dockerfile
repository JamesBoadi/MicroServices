FROM openjdk:8-jre
ADD /application.properties application.properties
ADD /application.yml application.yml 
ADD /app.jar app.jar
COPY /app_lib app_lib
ADD /gateway.jar gateway.jar
ADD /gateway.properties gateway.properties
ADD /gateway.yml gateway.yml
COPY /Gateway_lib /Gateway_lib
ADD /identity.jar identity.jar
ADD /identity-provider.properties identity-provider.properties
ADD /identity-provider.yml identity-provider.yml
COPY /Identity_lib /Identity_lib
EXPOSE 8761
EXPOSE 8081
EXPOSE 8082