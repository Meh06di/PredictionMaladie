package projet.predictionmalade;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import projet.predictionmalade.entities.User;
import projet.predictionmalade.service.UserService;

import java.util.Date;

@SpringBootApplication
public class PredictionMaladeApplication {

	public static void main(String[] args) {
		SpringApplication.run(PredictionMaladeApplication.class, args);
	}

//	@Bean
//	CommandLineRunner run(PredictionMaladeApplication app, UserService userService) {
//		return args -> {
//			User user = new User(null,"mehdi","mehdi@gmain.com","1234","ouakyl",new Date(),"med",1,null,null
//					,null);
//			userService.saveUser(user);
//		};
//	}

}
