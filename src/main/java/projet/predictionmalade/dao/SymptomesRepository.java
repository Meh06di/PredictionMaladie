package projet.predictionmalade.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.predictionmalade.entities.Symptomes;

public interface SymptomesRepository extends JpaRepository<Symptomes, Long> {
    Symptomes findByName(String name);
}
