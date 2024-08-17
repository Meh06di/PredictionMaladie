import React, { useState } from 'react';
import SymptomSelector from '../ChoixSymp/ChoixSymp.jsx';
import './DiseasePrediction.css';

const DiseasePrediction = () => {
    const [predictionResult, setPredictionResult] = useState(null);

    const handleFormSubmit = (selectedSymptoms) => {
        // Replace this with a real API call to your Python model
        const simulatedPrediction = "Simulated Disease";
        setPredictionResult(simulatedPrediction);
    };

    return (
        <div>
            <SymptomSelector onSubmit={handleFormSubmit} />
            <DiseasePredictionResult result={predictionResult} />
        </div>
    );
};

export default DiseasePrediction;
