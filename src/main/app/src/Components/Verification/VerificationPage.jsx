import React, { useState } from 'react';
import './VerificationPage.css';

const VerificationPage = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/verifyCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code }),
        });

        const data = await response.text();
        if (response.ok) {
            setMessage('Account verified successfully!');
        } else {
            setMessage(data);
        }
    };

    return (
        <div className="verification-page">
            <h1>Account Verification</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="code">Verification Code:</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Verify</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default VerificationPage;
