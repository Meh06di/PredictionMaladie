import React, { useState } from 'react';
import './signUp.css';
import {Col, Container, Row} from "react-bootstrap";
import sign from '../../assets/sign.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const SignUp = () => {
    const [formData, setFormData] = useState({
        nom : '',
        prenom: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/users/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            if (response.ok) {
                setSuccess('Registration successful!');
            } else {
                setError('Failed to sign up. Please check your details.');
            }
        } catch (error) {
            setError('Error occurred during registration.');
            console.error('Error:', error);
        }
    };

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={sign} alt="signup image" />
                    </Col>
                    <Col md={6}>
                        <h1>Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        value={formData.prenom}
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Email Adress"
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        placeholder="Phone No."
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>

                                <button type="submit">Sign Up</button>
                    {success && <Col> <p className="success-message">{success}</p> </Col>}
                    {error && <Col> <p className="error-message">{error}</p> </Col>}
                    <div className="login-link">
                        <p>Already have an account? <a href="/users/login">Log in</a></p>
                    </div>
                </Row>
            </form>
                    </Col>
                </Row>
            </Container>
        </section>)
                };

                export default SignUp;