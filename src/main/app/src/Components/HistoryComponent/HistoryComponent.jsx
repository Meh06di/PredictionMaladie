import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import './HistoryComponent.css';

const HistoryComponent = ({ username }) => {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) {
            setError('Username is not defined');
            setLoading(false);
            return;
        }

        const fetchPredictions = async () => {
            try {
                const response = await fetch(`http://localhost:8081/users/${username}/predictions`);
                if (!response.ok) {
                    throw new Error('pas d\'historique');
                }
                const data = await response.json();
                setPredictions(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPredictions();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container className="history-page">
            <h1>Prediction History</h1>
            <h2 className="subtitle">
                Here you can find a record of all your past predictions based on the symptoms you provided.
            </h2>
            <div className="history-container">
                {predictions.length === 0 ? (
                    <div className="no-history">
                        <h3>No Prediction History Available</h3>
                        <p>You haven't made any predictions yet.</p>
                    </div>
                ) : (
                    predictions.map((prediction, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <Card.Title>Prediction on {new Date(prediction.date).toLocaleDateString()}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong>Symptoms:</strong>
                                        <ul>
                                            {prediction.symptoms.length === 0 ? (
                                                <li>No symptoms recorded.</li>
                                            ) : (
                                                prediction.symptoms.map((symptom, idx) => (
                                                    <li key={idx}>{symptom}</li>
                                                ))
                                            )}
                                        </ul>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Prediction:</strong> {prediction.result}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </Container>
    );
};

export default HistoryComponent;
