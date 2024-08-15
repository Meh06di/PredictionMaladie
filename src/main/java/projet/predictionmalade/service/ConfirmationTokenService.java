package projet.predictionmalade.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import projet.predictionmalade.dao.ConfirmationTokenRepository;
import projet.predictionmalade.dao.UserRepository;
import projet.predictionmalade.entities.ConfirmationToken;
import projet.predictionmalade.entities.User;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendConfirmationToken(User user) {
        // Génération du token
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken();
        confirmationToken.setToken(token);
        confirmationToken.setUser(user);
        confirmationToken.setCreatedAt(LocalDateTime.now());
        confirmationToken.setExpiresAt(LocalDateTime.now().plusMinutes(15));

        confirmationTokenRepository.save(confirmationToken);

        // Envoi du mail
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setFrom("javatest329@gmail.com"); // Remplacez par votre adresse d'envoi
        mailMessage.setText("To confirm your account, please click here : "
                + "http://localhost:8081/users/confirm?token=" + token);
        mailMessage.setText("Votre code de verification est "+user.getCodeVerification());


        javaMailSender.send(mailMessage);
    }

    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        if (confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        confirmationToken.setConfirmedAt(LocalDateTime.now());
        confirmationTokenRepository.save(confirmationToken);

        User user = confirmationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        return "Confirmed";
    }
}