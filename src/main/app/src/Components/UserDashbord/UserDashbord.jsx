import React, { useState, useEffect } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import './UserDashbord.css';
import user from '../../assets/user.jpg';
import HomeComponent from '../HomeComponent/HomeComponent.jsx';
import SymptomsComponent from '../ChoixSymp/ChoixSymp.jsx';
import ConsultationsComponent from '../ChatBoot/ChatBoot.jsx';
import ProfileComponent from '../ProfileComponent/ProfileComponent.jsx';
import HistoryComponent from "../HistoryComponent/HistoryComponent.jsx";
import { FaHome, FaHeartbeat, FaHistory, FaUser, FaSignOutAlt, FaComments } from 'react-icons/fa';
import logoImage from '../../assets/dr robot.png'
const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('home');
    const [username, setUsername] = useState('Guest');
    const [showModal, setShowModal] = useState(false);
    const [prediction, setPrediction] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleSignOut = () => {
        setShowModal(true);
    };

    const handleConfirmSignOut = () => {
        localStorage.removeItem('username');
        window.location.href = '/users/login'; // Redirect to login page
    };

    const handleCloseModal = () => setShowModal(false);

    const handlePrediction = (pred) => {
        setPrediction(pred);
        setActiveComponent('consultations');
    };

    const examplePredictions = [
        {
            date: '2024-08-15',
            symptoms: 'Fever, Cough, Shortness of breath',
            result: 'Possible flu',
        },
        {
            date: '2024-08-14',
            symptoms: 'Headache, Nausea, Fatigue',
            result: 'Possible migraine',
        },
        {
            date: '2024-08-13',
            symptoms: 'Sore throat, Runny nose, Mild fever',
            result: 'Possible cold',
        }
    ];

    const renderContent = () => {
        switch (activeComponent) {
            case 'home':
                return <HomeComponent />;
            case 'Disease Prediction':
                return <SymptomsComponent onPrediction={handlePrediction} />;
            case 'symptoms':
                return <HistoryComponent predictions={examplePredictions} />;
            case 'consultations':
                return <ConsultationsComponent prediction={prediction} />;
            case 'profile':
                return <ProfileComponent />;
            default:
                return <HomeComponent />;
        }
    };

    return (
        <div className="d-flex" style={{ height: '100vh' }}>

            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark side" style={{ width: '280px', height: '100vh' }}>
                <a href="#"
                   className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img src={logoImage} alt="Logo" className="ms-2 logo"/>
                    <span className="fs-4">Dr Vito Dashboard</span>
                </a>

                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className={`nav-link ${activeComponent === 'home' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('home')}>
                            <FaHome className="me-2"/> Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${activeComponent === 'Disease Prediction' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('Disease Prediction')}>
                            <FaHeartbeat className="me-2"/> Disease Prediction
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${activeComponent === 'consultations' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('consultations')}>
                            <FaComments className="me-2"/> Consultations
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${activeComponent === 'symptoms' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('symptoms')}>
                            <FaHistory className="me-2"/> History
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`nav-link ${activeComponent === 'profile' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('profile')}>
                            <FaUser className="me-2"/> Profile
                        </a>
                    </li>
                </ul>
                <hr/>
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user} alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>{username}</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li>
                            <a className="dropdown-item" href="#" onClick={handleSignOut}>
                                <FaSignOutAlt className="me-2"/> Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="d-flex flex-column flex-grow-1 p-3">
                {renderContent()}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Sign Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to sign out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmSignOut}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
