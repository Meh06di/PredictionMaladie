package projet.predictionmalade.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
public class PredictionSymptom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prediction_id", nullable = false)
    private Prediction prediction;

    @ManyToOne
    @JoinColumn(name = "symptom_id", nullable = false)
    private Symptomes symptom;

    // Default constructor
    public PredictionSymptom() {
    }

    // Constructor with fields, excluding 'name' since it's not in the schema
    public PredictionSymptom(Prediction prediction, Symptomes symptom) {
        this.prediction = prediction;
        this.symptom = symptom;
    }
}
