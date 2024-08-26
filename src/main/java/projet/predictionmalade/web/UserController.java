package projet.predictionmalade.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import projet.predictionmalade.dao.RepositoryHistoryCompte;
import projet.predictionmalade.dao.UserRepository;
import projet.predictionmalade.entities.HistoryCompte;
import projet.predictionmalade.entities.PredictionRequest;
import projet.predictionmalade.entities.User;
import projet.predictionmalade.service.MLService;
import projet.predictionmalade.service.UserService;
import projet.predictionmalade.service.PredictionService;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private MLService mlService;
    @Autowired
    private RepositoryHistoryCompte historyCompteRepository;
    @Autowired
    public PasswordEncoder passwordEncoder;

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }
        if (userService.isUsernameExists(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already in use.");
        }
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully. Please check your email to confirm your account.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
            User authenticatedUser = userRepository.findByEmail(user.getEmail());
            return ResponseEntity.ok(Map.of(
                    "message", "User successfully logged in",
                    "username", authenticatedUser.getUsername()
            ));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password"));
        }
    }

    @GetMapping("/{username}/profil")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }



    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User user) {

        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }


        existingUser.setNom(user.getNom());
        existingUser.setPrenom(user.getPrenom());
        existingUser.setEmail(user.getEmail()); // Now this works as expected
        existingUser.setPhone(user.getPhone());
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword())); // Ensure proper hashing of the password
        }
        userRepository.save(existingUser);
        return ResponseEntity.ok("Profile updated successfully");
    }


    @PostMapping("/{username}/operations")
    public ResponseEntity<String> addOperation(@PathVariable String username, @RequestParam String type, @RequestParam String details) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        HistoryCompte history = new HistoryCompte();
        history.setType(type);
        history.setDetails(details);
        history.setTimeTracker(LocalDateTime.now());
        history.setUser(user);
        historyCompteRepository.save(history);
        return ResponseEntity.ok("Operation saved successfully");
    }
    @GetMapping("/{username}/history")
    public ResponseEntity<?> getUserHistoryByUsername(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        List<HistoryCompte> history = historyCompteRepository.findByUserId(user.getId());
        return ResponseEntity.ok(history);
    }
    @Autowired
    private PredictionService predictionService;


    @PostMapping("/{username}/savePrediction")
    public ResponseEntity<Map<String, String>> savePrediction(
            @PathVariable String username,
            @RequestBody PredictionRequest request) {

        try {
            predictionService.savePrediction(username, request.getPrediction(), request.getSymptoms());
            return ResponseEntity.ok(Map.of("status", "success", "message", "Prediction saved successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("status", "error", "message", "Failed to save prediction"));
        }
    }
    @GetMapping("/{username}/predictions")
    public ResponseEntity<?> getUserPredictions(@PathVariable String username) {
        try {
            List<Map<String, Object>> predictions = predictionService.getPredictionsByUsername(username);
            if (predictions.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No predictions found for user");
            }
            return ResponseEntity.ok(predictions);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
