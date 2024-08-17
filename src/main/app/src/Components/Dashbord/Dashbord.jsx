import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashbord.css'

import DashHeader from "../DashHeader/DashHeader.jsx";
import SymptomsForm from '../../../../../../../DR.VITO/src/main/app/src/Components/SymptomsForm/SymptomsForm.jsx';
import PredictionHistory from '../../../../../../../DR.VITO/src/main/app/src/Components/PredictionHistory/PredictionHistory.jsx';

const Dashboard = () => {
    const [symptomsData, setSymptomsData] = useState([]);
    const [predictionHistory, setPredictionHistory] = useState([]);

    useEffect(() => {
        // Simulation des données
        const fakeSymptomsData = [
            { date: '2024-08-01', value: 5 },
            { date: '2024-08-02', value: 3 },
            { date: '2024-08-03', value: 4 },
        ];

        const fakePredictionHistory = [
            { date: '2024-08-01', disease: 'Flu', confidence: '85%' },
            { date: '2024-08-02', disease: 'Cold', confidence: '75%' },
        ];

        setSymptomsData(fakeSymptomsData);
        setPredictionHistory(fakePredictionHistory);
    }, []);

    const chartData = {
        labels: symptomsData.map(item => item.date),
        datasets: [
            {
                label: 'Symptômes au fil du temps',
                data: symptomsData.map(item => item.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="dashboard-background">
            <DashHeader />
            <div className="dashboard-content">
                <SymptomsForm />
                <div className="chart-container">
                    <h2>Évolution des Symptômes</h2>
                    <Line data={chartData} />
                </div>
                <PredictionHistory data={predictionHistory} />
            </div>
        </div>
    );
};

export default Dashboard;
