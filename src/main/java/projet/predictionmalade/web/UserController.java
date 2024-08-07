package projet.predictionmalade.web;

// UserController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import projet.predictionmalade.entities.HistoryCompte;
import projet.predictionmalade.entities.User;
import projet.predictionmalade.service.UserService;

import java.util.List;
import java.util.UUID;

// UserController.java


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signUp")
    public void signUp(@RequestBody User user) {
        userService.saveUser(user);
    }
    @PostMapping("/login")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/{userId}/operations")
    public List<HistoryCompte> getUserOperations(@PathVariable UUID userId) {
        return userService.getUserOperations(userId);
    }

    @PostMapping("/{userId}/operations")
    public void addOperation(@PathVariable UUID userId, @RequestParam String type, @RequestParam String details) {
        userService.addOperation(userId, type, details);
    }
}


