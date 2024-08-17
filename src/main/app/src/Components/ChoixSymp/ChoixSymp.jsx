import React, { useState } from 'react';
import Select from 'react-select';
import Navbar from './Nav.jsx';
import './ChoixSymp.css';
import symptomsData from './Symp.json';

const SymptomSelector = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');
    const maxSymptoms = 10;
    const minSymptoms = 3;  // Nombre minimum de symptômes à sélectionner

    // Crée un tableau de symptômes avec des objets pour react-select
    const symptomsList = symptomsData.map(symptom => ({
        value: symptom,
        label: symptom
    }));

    const handleChange = (selectedOptions) => {
        if (selectedOptions.length <= maxSymptoms) {
            setSelectedSymptoms(selectedOptions);
        } else {
            alert(`You can only select up to ${maxSymptoms} symptoms.`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier que le nombre de symptômes sélectionnés est au moins minSymptoms
        if (selectedSymptoms.length < minSymptoms) {
            alert(`Please select at least ${minSymptoms} symptoms.`);
            return;
        }

        // Initialise un vecteur de zéros pour les 132 symptômes
        const symptomVector = new Array(132).fill(0);  // Utilise la taille exacte de 132

        // Mets à jour le vecteur avec des 1 pour les symptômes sélectionnés
        selectedSymptoms.forEach(option => {
            const index = symptomsData.indexOf(option.value);
            if (index !== -1) {
                symptomVector[index] = 1;
            }
        });

        console.log('Symptom vector:', symptomVector);  // Pour déboguer

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms: symptomVector }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.prediction) {
                setPrediction(data.prediction);
                setError('');
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            setError('Error fetching prediction: ' + error.message);
            setPrediction('');
        }
    };
    return (
        <div className="symptom-page">
            <Navbar />
            <main className="page-main">
                <div className="prediction-container">
                    <h2>Select Symptoms</h2>
                    <Select
                        isMulti
                        options={symptomsList}
                        value={selectedSymptoms}
                        onChange={handleChange}
                        placeholder="Select symptoms..."
                        className="symptom-select"
                    />
                    <button type="submit" onClick={handleSubmit} className="submit-button">
                        Predict Disease
                    </button>
                    {prediction && (
                        <div className="prediction-result">
                            <h3>Prediction Result: {prediction}</h3>
                        </div>
                    )}
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </main>
            <footer className="page-footer">
                <p>&copy; 2024 Disease Prediction. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SymptomSelector;