package projet.predictionmalade.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.predictionmalade.entities.Compte;
import projet.predictionmalade.entities.User;


import java.util.UUID;

public interface RepositoryCompte extends JpaRepository<Compte, UUID> {
    User findByUserId(UUID compteID);
}
