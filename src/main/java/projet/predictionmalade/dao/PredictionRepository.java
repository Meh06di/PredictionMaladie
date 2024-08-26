package projet.predictionmalade.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import projet.predictionmalade.entities.Prediction;

import java.util.List;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    @Query("SELECT p FROM Prediction p WHERE p.user.username = :username")
    List<Prediction> findByUsername(String username);
}
