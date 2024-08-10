package projet.predictionmalade.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.predictionmalade.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
