FROM openjdk:8-jre
ADD export/gateway.jar gateway.jar
ADD export/gateway.yml gateway.yml
COPY export/gateway_lib /gateway_lib
EXPOSE 8081
ENV JAVA_OPTS="-XX:PermSize=8024m -XX:MaxPermSize=1024m"
CMD java -jar gateway.jar