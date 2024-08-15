package projet.predictionmalade.web;

// UserController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import projet.predictionmalade.dao.UserRepository;
import projet.predictionmalade.entities.HistoryCompte;
import projet.predictionmalade.entities.User;
import projet.predictionmalade.service.ConfirmationTokenService;
import projet.predictionmalade.service.MLService;
import projet.predictionmalade.service.UserService;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

// UserController.java


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConfirmationTokenService confirmationTokenService;



    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        // Check if the email already exists
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

        // Check if the username already exists
        if (userService.isUsernameExists(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already in use.");
        }

        // Set the user as disabled initially (not verified)
        user.setEnabled(false);

        try {
            user.setCodeVerification(String.format("%06d",new Random().nextInt()));
            userRepository.save(user);

            confirmationTokenService.sendConfirmationToken(user);

            return ResponseEntity.ok("User registered successfully. Please check your email to confirm your account.");

        } catch (Exception e) {
            // Handle exceptions (like email sending failure)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send confirmation email. Please try again later.");
        }
    }
    @PostMapping("/verifyCode")
    public ResponseEntity<?> verifyCode(@RequestParam("email") String email, @RequestParam("code") String code) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid email address.");
        }

        if (!user.getCodeVerification().equals(code)) {
            return ResponseEntity.badRequest().body("Invalid verification code.");
        }

        // If the code matches, enable the user's account
        user.setEnabled(true);
        user.setCodeVerification(null); // Optionally clear the code after verification
        userRepository.save(user);

        return ResponseEntity.ok("Account verified successfully.");
    }

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            // If authentication is successful, return a success message or token (JWT, etc.)
            return ResponseEntity.ok("User successfully logged in");

        } catch (AuthenticationException e) {
            // If authentication fails, return an error response
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    @GetMapping("/confirm")
    public ResponseEntity<?> confirm(@RequestParam("token") String token) {
        try {
            String result = confirmationTokenService.confirmToken(token);
            return ResponseEntity.ok(result);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{username}/profil")
    public User getProfile(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }

    @GetMapping("/{userId}/operations")
    public List<HistoryCompte> getUserOperations(@PathVariable UUID userId) {
        return userService.getUserOperations(userId);
    }

    @PostMapping("/{userId}/operations")
    public void addOperation(@PathVariable UUID userId, @RequestParam String type, @RequestParam String details) {
        userService.addOperation(userId, type, details);
    }
    @Autowired
    private MLService mlService;

    @PostMapping("/predict")
    public Map<String, Object> predict(@RequestBody Map<String, Object> inputParams) {
        String prediction = mlService.getPrediction(inputParams);
        return Map.of("prediction", prediction);
    }
}


