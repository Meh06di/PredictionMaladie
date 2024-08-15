import React, { useState } from 'react';
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
                body: JSON.stringify(formData), // Directly using formData
                credentials: 'include',
            });
            if (response.ok) {
                console.log('User successfully logged in');
                // You can redirect the user or perform other actions on success here
            } else {
                setError('Failed to log in. Please check your credentials.');
            }
        } catch (error) {
            setError('Error occurred during login.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <a href="/users/signUp">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
