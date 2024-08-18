package projet.predictionmalade.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.UUID;
@Entity
@Data @AllArgsConstructor @NoArgsConstructor
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nom;
    private String email;
    private String password;
    private String prenom;
    private String username;
    private String phone;
    @OneToMany(mappedBy = "user")
    private Collection<HistoryCompte> historyComptes;
    @OneToMany(mappedBy = "user")
    private Collection<Malade> malades;
    @ManyToMany()
    private Collection<Role> roles;

}

