import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;


        setMessages([...messages, { text: input, sender: 'user' }]);

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ message: input }),
            });
            const data = await response.json();

            if (data.reply) {
                setMessages([...messages, { text: input, sender: 'user' }, { text: data.reply, sender: 'bot' }]);
            } else {
                setMessages([...messages, { text: input, sender: 'user' }, { text: 'Error: Unable to get response.', sender: 'bot' }]);
            }
        } catch (error) {
            setMessages([...messages, { text: input, sender: 'user' }, { text: 'Error: Unable to connect to the server.', sender: 'bot' }]);
        }

        setInput('');
    };

    return (
        <div className="chatbot">
            <div className="chatbot-header">
                <h2>Chat with Dr. Vito</h2>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chatbot-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
