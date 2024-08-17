import React, { useState } from 'react';
import axios from 'axios';
import './SymptomsForm.css'

const SymptomsForm = () => {
    const [symptom, setSymptom] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/symptoms', { symptom });
            setSymptom('');
            alert('Symptôme ajouté avec succès!');
        } catch (error) {
            console.error("Error submitting symptom", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Symptôme</h2>
            <input
                type="text"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                placeholder="Entrez un symptôme"
                required
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default SymptomsForm;