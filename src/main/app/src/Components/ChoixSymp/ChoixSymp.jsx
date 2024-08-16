import React, { useState } from 'react';
import Select from 'react-select';
import Navbar from './Nav.jsx'; // Assurez-vous que ce chemin est correct
import './ChoixSymp.css';
import symptomsData from './Symp.json';

const SymptomSelector = ({ onSubmit }) => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const maxSymptoms = 6;

    // Convertir les données JSON en format attendu par react-select
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedValues = selectedSymptoms.map(option => option.value);
        onSubmit(selectedValues);
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
                    <button type="submit" onClick={handleSubmit} className="submit-button">Predict Disease</button>
                </div>
            </main>
            <footer className="page-footer">
                <p>&copy; 2024 Disease Prediction. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SymptomSelector;
