package projet.predictionmalade.service;

// UserService.java
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projet.predictionmalade.dao.MaladeRespository;
import projet.predictionmalade.dao.RepositoryHistoryCompte;
import projet.predictionmalade.dao.SymptomesRepository;
import projet.predictionmalade.dao.UserRepository;
import projet.predictionmalade.entities.HistoryCompte;
import projet.predictionmalade.entities.Malade;
import projet.predictionmalade.entities.Symptomes;
import projet.predictionmalade.entities.User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;



@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RepositoryHistoryCompte historyCompte;
    @Autowired
    private SymptomesRepository symptomesRepository;
    @Autowired
    private MaladeRespository maladeRepository;
    @Autowired
    public PasswordEncoder passwordEncoder;

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }
    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username) != null;
    }

    public void saveUser(User user) {
        if (emailExists(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
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
    public Malade MaladeDiognostic(UUID userId,String nomMalade) {
        User user = userRepository.findById(userId).orElse(null);
        if(user == null) { return null;}
        Malade malade = new Malade();
        Symptomes symptomes = new Symptomes();
        malade.getSymptomes().add(symptomes);
        malade.setMaladeNom(nomMalade);
        malade.setUser(user);
        return malade;
    }
    public List<Malade> userMalades(UUID userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user == null) { return null;}
        return (List<Malade>) user.getMalades();
    }

}


