package projet.predictionmalade.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Entity
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String predictionResult;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "prediction", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<PredictionSymptom> symptoms;

    @Temporal(TemporalType.TIMESTAMP) // Specify the precision of the date
    private Date date;

    // Default constructor
    public Prediction() {
    }

    // Parameterized constructor
    public Prediction(String predictionResult, User user, Collection<PredictionSymptom> symptoms, Date date) {
        this.predictionResult = predictionResult;
        this.user = user;
        this.symptoms = symptoms;
        this.date = date;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPredictionResult() {
        return predictionResult;
    }

    public void setPredictionResult(String predictionResult) {
        this.predictionResult = predictionResult;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collection<PredictionSymptom> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(Collection<PredictionSymptom> symptoms) {
        this.symptoms = symptoms;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void addSymptom(PredictionSymptom symptom) {
        symptoms.add(symptom);
        symptom.setPrediction(this);
    }

    public void removeSymptom(PredictionSymptom symptom) {
        symptoms.remove(symptom);
        symptom.setPrediction(null);
    }

    @Override
    public String toString() {
        return "Prediction{" +
                "id=" + id +
                ", predictionResult='" + predictionResult + '\'' +
                ", user=" + user +
                ", symptoms=" + symptoms +
                ", date=" + date +
                '}';
    }
}
