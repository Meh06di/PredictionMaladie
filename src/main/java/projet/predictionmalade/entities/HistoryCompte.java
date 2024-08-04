package projet.predictionmalade.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class HistoryCompte {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String details;
    private LocalDateTime timeTracker;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
