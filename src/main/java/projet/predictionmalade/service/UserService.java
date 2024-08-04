package projet.predictionmalade.service;

// UserService.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projet.predictionmalade.dao.RepositoryHistoryCompte;
import projet.predictionmalade.dao.UserRepository;
import projet.predictionmalade.entities.HistoryCompte;
import projet.predictionmalade.entities.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;



@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RepositoryHistoryCompte historyCompte;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<HistoryCompte> getUserOperations(UUID userId) {
        return historyCompte.findByUserId(userId);
    }

    public HistoryCompte addOperation(UUID userId, String type, String details) {
        User user = userRepository.findById(userId).orElse(null);
        if(user == null) { return null;}
        HistoryCompte operation = new HistoryCompte();
        operation.setUser(user);
        operation.setType(type);
        operation.setDetails(details);
        operation.setTimeTracker(LocalDateTime.now());
        historyCompte.save(operation);
        return operation;
    }
}


