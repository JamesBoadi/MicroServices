package src.main.java.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import org.slf4j.LoggerFactory;

@EnableEurekaServer
@SpringBootApplication
public class Eureka {
	public static void main(String[] args) {
		// ${EUREKA_URI:http://localhost:8761/eureka}
		System.setProperty("spring.config.name", "eureka");
		SpringApplication.run(Eureka.class, args);

		LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
		loggerContext.getLogger("org.mongodb.driver").setLevel(Level.WARN);

	}
}
