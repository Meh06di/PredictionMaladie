package projet.predictionmalade.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projet.predictionmalade.dao.PredictionRepository;
import projet.predictionmalade.dao.SymptomesRepository;
import projet.predictionmalade.dao.UserRepository;
import projet.predictionmalade.entities.Prediction;
import projet.predictionmalade.entities.PredictionSymptom;
import projet.predictionmalade.entities.Symptomes;
import projet.predictionmalade.entities.User;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PredictionService {

    @Autowired
    private PredictionRepository predictionRepository;

    @Autowired
    private SymptomesRepository symptomRepository;

    @Autowired
    private UserRepository userRepository;

    public void savePrediction(String username, String predictionResult, Collection<String> symptomNames) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Prediction prediction = new Prediction();
        prediction.setPredictionResult(predictionResult);
        prediction.setUser(user);
        prediction.setDate(new Date()); // Set the current date

        Collection<Symptomes> symptoms = symptomNames.stream()
                .map(name -> symptomRepository.findByName(name))
                .filter(Objects::nonNull)  // Ensure that null values are filtered out
                .collect(Collectors.toList());

        Collection<PredictionSymptom> predictionSymptoms = symptoms.stream()
                .map(symptom -> {
                    PredictionSymptom ps = new PredictionSymptom();
                    ps.setPrediction(prediction);
                    ps.setSymptom(symptom);
                    return ps;
                })
                .collect(Collectors.toList());

        prediction.setSymptoms(predictionSymptoms);

        predictionRepository.save(prediction);
    }
    public List<Map<String, Object>> getPredictionsByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Prediction> predictions = predictionRepository.findByUsername(username);

        return predictions.stream().map(prediction -> {
            Map<String, Object> predictionData = new HashMap<>();
            predictionData.put("date", prediction.getDate() != null ? prediction.getDate().toString() : "Invalid Date");
            predictionData.put("result", prediction.getPredictionResult());
            predictionData.put("symptoms", prediction.getSymptoms().stream()
                    .map(predictionSymptom -> {
                        Symptomes symptom = predictionSymptom.getSymptom();
                        return symptom != null ? symptom.getName() : "Unknown";
                    })
                    .collect(Collectors.toList()));
            return predictionData;
        }).collect(Collectors.toList());
    }
}
