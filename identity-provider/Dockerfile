FROM openjdk:8-jre
ADD export/identity.jar identity.jar
ADD export/identity-provider.yml identity-provider.yml
COPY export/identity_lib /identity_lib
EXPOSE 8082
ENV JAVA_OPTS="-XX:PermSize=8024m -XX:MaxPermSize=1024m"
CMD java -jar identity.jar