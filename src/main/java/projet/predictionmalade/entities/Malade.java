package projet.predictionmalade.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
@Entity
@Data @NoArgsConstructor
@AllArgsConstructor
public class Malade implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private Long id;
    private String SymptomesApparentes;
    private String status;
    @ManyToOne
    private User user;
}
