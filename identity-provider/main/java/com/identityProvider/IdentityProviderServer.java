package main.java.com.identityProvider;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;

@SpringBootApplication
@EnableDiscoveryClient
@EnableZuulProxy
public class IdentityProviderServer {

  /*  @Autowired
    protected AccountRepository accountRepository;*/

    /**
     * Run the application using Spring Boot and an embedded servlet engine.
     * 
     * @param args Program arguments - ignored.
     */
    public static void main(String[] args) {
        System.setProperty("spring.config.name", "identity-provider");
        SpringApplication.run(IdentityProviderServer.class, args);
        
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        loggerContext.getLogger("org.mongodb.driver").setLevel(Level.OFF);
    }
}