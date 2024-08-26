import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './ChoixSymp.css';
import symptomsData from './Symp.json';

const SymptomSelector = ({ onPrediction }) => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(null);  // State to store username
    const maxSymptoms = 10;
    const minSymptoms = 3;

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

    }, []);

    const symptomsList = symptomsData.map(symptom => ({
        value: symptom,
        label: symptom
    }));

    const handleChange = (selectedOptions) => {
        if (selectedOptions.length <= maxSymptoms) {
            setSelectedSymptoms(selectedOptions);
            setError('');
        } else {
            setError(`You can only select up to ${maxSymptoms} symptoms.`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Sending request to:', `http://localhost:8081/users/${username}/savePrediction`);

        if (selectedSymptoms.length < minSymptoms) {
            setError(`Please select at least ${minSymptoms} symptoms.`);
            return;
        }

        const symptomVector = new Array(symptomsData.length).fill(0);
        selectedSymptoms.forEach(option => {
            const index = symptomsData.indexOf(option.value);
            if (index !== -1) {
                symptomVector[index] = 1;
            }
        });

        console.log('Symptom vector:', symptomVector);

        setLoading(true);

        try {
            const predictionResponse = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms: symptomVector }),
            });

            console.log('Prediction response status:', predictionResponse.status);

            if (!predictionResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const predictionData = await predictionResponse.json();
            console.log('Prediction data:', predictionData);

            if (predictionData.prediction) {
                setPrediction(predictionData.prediction);
                setError('');
                setShowModal(true);

                if (username) {
                    const saveResponse = await fetch(`http://localhost:8081/users/${username}/savePrediction`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            prediction: predictionData.prediction,
                            symptoms: selectedSymptoms.map(symptom => symptom.label),
                        }),
                    });

                    if (!saveResponse.ok) {
                        throw new Error('Failed to save prediction');
                    }

                    const saveData = await saveResponse.json();
                    console.log('Save Response Data:', saveData);
                } else {
                    setError('Username is not available.');
                }
            } else {
                throw new Error('Invalid response data');
            }
        } catch (error) {
            setError(`Error fetching prediction: ${error.message}`);
            setPrediction('');
        } finally {
            setLoading(false);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="symptom-page">
            <h1 className="page-title">Disease Prediction</h1>
            <p className="page-subtitle">Select your symptoms to predict potential diseases based on your input.</p>
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
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}
                    {loading && (
                        <div className="loading-indicator">
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                        </div>
                    )}
                    <p className="form-note">
                        <span className="form-note-highlight">Please note:</span> This tool provides a general
                        prediction based on your symptoms. For accurate medical advice, consult a healthcare
                        professional.
                    </p>
                </div>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Based on your symptoms:</h3>
                            <ul>
                                {selectedSymptoms.map((symptom, index) => (
                                    <li key={index}>{symptom.label}</li>
                                ))}
                            </ul>
                            <h3 className="result">
                                Prediction Result: <span className="prediction-highlight">{prediction}</span>
                            </h3>
                            <div className="modal-footer">
                                <button onClick={handleCloseModal} className="modal-close-button">
                                    OK
                                </button>
                                <button
                                    onClick={() => onPrediction(prediction)}
                                    className="modal-more-details-button"
                                >
                                    More Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SymptomSelector;
