import React from 'react';
import './PredictionHistory.css'

const PredictionHistory = ({ data }) => {
    return (
        <div>
            <h2>Historique des Prédictions</h2>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Prédiction</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.prediction}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PredictionHistory;