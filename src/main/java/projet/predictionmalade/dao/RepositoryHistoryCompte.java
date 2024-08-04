package projet.predictionmalade.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.predictionmalade.entities.HistoryCompte;

import java.util.List;
import java.util.UUID;

public interface RepositoryHistoryCompte extends JpaRepository<HistoryCompte, Long> {
    List<HistoryCompte> findByUserId(UUID userId);
}
