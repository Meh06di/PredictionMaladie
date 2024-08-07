package projet.predictionmalade.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.predictionmalade.entities.Malade;

import java.util.UUID;

public interface MaladeRespository extends JpaRepository<Malade, Long> {
    Malade findMaladeByMaladeNom(String maladeNom);
}
