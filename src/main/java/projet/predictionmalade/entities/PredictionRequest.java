package projet.predictionmalade.entities;

import java.util.Collection;

public class PredictionRequest {
    private String prediction;
    private Collection<String> symptoms;

    public PredictionRequest() {
    }

    public PredictionRequest(String prediction, Collection<String> symptoms) {
        this.prediction = prediction;
        this.symptoms = symptoms;
    }

    // Getter and Setter for prediction
    public String getPrediction() {
        return prediction;
    }

    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }

    // Getter and Setter for symptoms
    public Collection<String> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(Collection<String> symptoms) {
        this.symptoms = symptoms;
    }

    // Override toString() for better debugging
    @Override
    public String toString() {
        return "PredictionRequest{" +
                "prediction='" + prediction + '\'' +
                ", symptoms=" + symptoms +
                '}';
    }
}
