import React, {useEffect, useRef, useState} from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();

            if (data.reply) {
                setMessages([...messages, { text: input, sender: 'user' }, { text: data.reply, sender: 'bot' }]);
            } else {
                setMessages([...messages, { text: input, sender: 'user' }, { text: 'Error: Unable to get response.', sender: 'bot' }]);
            }
        } catch (error) {
            setMessages([...messages, { text: input, sender: 'user' }, { text: 'Error: Unable to connect to the server.', sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);
    return (
        <div className="consultation-page">
            <h1 className="consultation-title">Consultation with Dr. Vito</h1>
            <p className="consultation-subtitle">Discuss your symptoms and get advice from Dr. Vito.</p>
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
                    {loading && (
                        <div className="message bot">
                            <p className="loading-text">Vito is typing</p>
                            <div className="loading-indicator">
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                            </div>
                        </div>
                    )}
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
            </div>
                );
                };


 export default Chatbot;
