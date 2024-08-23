import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './ProfileComponent.css';

const ProfileComponent = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const username = localStorage.getItem('username'); // Assuming you store the username in localStorage
            try {
                const response = await fetch(`http://localhost:8081/users/${username}/profil`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        nom: data.nom || '',
                        prenom: data.prenom || '',
                        username: data.username || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        password: '',
                        confirmPassword: '',
                    });
                } else {
                    alert('Failed to fetch profile data.');
                }
            } catch (error) {
                alert('Error occurred while fetching profile data.');
                console.error('Error:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    try{
        const { passwordConfirme, ...dataToSend } = formData;

        const response = await fetch('http://localhost:8081/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend), // Send the filtered data
            credentials: 'include',
        });

        if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            alert('Error occurred while updating profile.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="profile-page">
            <h1>Edit Your Profile</h1>
            <div className="profile-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formFirstName">
                        <Form.Label column sm={3}>
                            First Name
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formLastName" className="mt-3">
                        <Form.Label column sm={3}>
                            Last Name
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formUsername" className="mt-3">
                        <Form.Label column sm={3}>
                            Username
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                disabled
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formEmail" className="mt-3">
                        <Form.Label column sm={3}>
                            Email
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPhone" className="mt-3">
                        <Form.Label column sm={3}>
                            Phone
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPassword" className="mt-3">
                        <Form.Label column sm={3}>
                            Password
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter a new password"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formConfirmPassword" className="mt-3">
                        <Form.Label column sm={3}>
                            Confirm Password
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your new password"
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-4">
                        Save Changes
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ProfileComponent;
