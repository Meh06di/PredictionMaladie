import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import login from '../../assets/login.png'
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            if (response.ok) {
                console.log('User successfully logged in');
            } else {
                setError('Failed to log in. Please check your credentials.');
            }
        } catch (error) {
            setError('Error occurred during login.');
            console.error('Error:', error);
        }
    };

    return (
        <section className="login" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={login} alt="login image" />
                    </Col>
                    <Col md={6}>
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={12} className="px-1">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        required
                                    />
                                </Col>
                                <Col sm={12} className="px-1">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        required
                                    />
                                </Col>
                                <button type="submit">Log In</button>
                                {error && <Col><p className="error-message">{error}</p></Col>}
                                <div className="signup-link">
                                    <p>Don't have an account? <a href="/users/signUp">Sign up</a></p>
                                </div>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
