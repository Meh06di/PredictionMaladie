package projet.predictionmalade.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.predictionmalade.entities.Malade;
import projet.predictionmalade.entities.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

}
