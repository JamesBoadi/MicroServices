FROM openjdk:8-jre
ADD export/eureka.yml eureka.yml 
ADD export/eureka.jar eureka.jar
COPY export/eureka_lib eureka_lib
EXPOSE 8761
ENV JAVA_OPTS="-XX:PermSize=8024m -XX:MaxPermSize=1024m"
CMD java -jar eureka.jar