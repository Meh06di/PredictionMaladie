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

            userService.saveUser(user);
            return ResponseEntity.ok("User registered successfully. Please check your email to confirm your account.");

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


