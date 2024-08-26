package projet.predictionmalade.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class HistoryCompte implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String type;
    private String details;
    private LocalDateTime timeTracker;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
