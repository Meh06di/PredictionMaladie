import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import health from '../../assets/health-summary.jpg';
import summary from '../../assets/prediction-history.jpg';
import tool from '../../assets/interactive-tools.jpg';
import './HomeComponent.css'; // Create and include any specific styles if needed

const HomeComponent = () => {
    return (
        <main className="main-content flex-grow-1">
            <Container fluid className="mt-4">
                <h1 className="text-center text-primary mb-4">Welcome, [User's Name]</h1>
                <section className="intro mb-4">
                    <h2 className="text-center intro-heading mb-4">
                        This is the Functionality of Our Website
                    </h2>
                    <p className="text-center intro-description">
                        Welcome to Dr Vito! Our platform offers a range of features to help you monitor and improve
                        your health. Here’s a brief overview of what you can do:
                    </p>
                </section>

                <Row className="card-section mt-4">
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>My Health Summary</Card.Title>
                                <img src={health} alt="Health Summary" className="card-img"/>
                                <Card.Text>
                                    Overview of your recent health data and predictions.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Prediction History</Card.Title>
                                <img src={summary} alt="Prediction History" className="card-img"/>
                                <Card.Text>
                                    View past predictions and analyze trends to gain insights into your health.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Interactive Tools</Card.Title>
                                <img src={tool} alt="Interactive Tools" className="card-img"/>
                                <Card.Text>
                                    Access tools to analyze symptoms or chat with the bot.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default HomeComponent;
