package projet.predictionmalade.web;

// UserController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import projet.predictionmalade.dao.RepositoryCompte;
import projet.predictionmalade.entities.Compte;
import projet.predictionmalade.entities.HistoryCompte;
import projet.predictionmalade.entities.User;
import projet.predictionmalade.service.UserService;

import java.util.List;
import java.util.UUID;

// UserController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
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


