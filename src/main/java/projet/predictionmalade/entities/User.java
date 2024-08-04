package projet.predictionmalade.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;
import java.util.UUID;
@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nom;
    private String email;
    private String phone;
    private String password;
    private String prenom;
    @Temporal(TemporalType.DATE)
    private Date dateNaissance;
    private String Username;
    @OneToOne
    private Compte compte;
    @OneToMany(mappedBy = "user")
    private Collection<HistoryCompte> historyComptes;
}

