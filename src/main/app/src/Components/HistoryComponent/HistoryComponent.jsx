import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import './HistoryComponent.css';

const HistoryComponent = ({ predictions = [] }) => {
    return (
        <Container className="history-page">
            <h1>Prediction History</h1>
            <h2 className="subtitle">Here you can find a record of all your past predictions based on the symptoms you provided.</h2>
            <div className="history-container">
                {predictions.length === 0 ? (
                    <p>No prediction history available.</p>
                ) : (
                    predictions.map((prediction, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <Card.Title>Prediction on {prediction.date}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Symptoms:</strong> {prediction.symptoms}</ListGroup.Item>
                                    <ListGroup.Item><strong>Prediction:</strong> {prediction.result}</ListGroup.Item>
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
