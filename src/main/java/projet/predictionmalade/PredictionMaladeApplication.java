package projet.predictionmalade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import projet.predictionmalade.dao.UserRepository;
import projet.predictionmalade.entities.User;
import projet.predictionmalade.service.UserService;

import java.util.Date;
import java.util.UUID;

@SpringBootApplication
public class PredictionMaladeApplication {
	@Autowired
	public UserRepository UserRepository;

	public static void main(String[] args) {
		SpringApplication.run(PredictionMaladeApplication.class, args);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
