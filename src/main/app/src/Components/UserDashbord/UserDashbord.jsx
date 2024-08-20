import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './UserDashbord.css';
import user from '../../assets/user.jpg'

// Import your components
import HomeComponent from '../HomeComponent/HomeComponent.jsx';
import SymptomsComponent from '../ChoixSymp/ChoixSymp.jsx'
import ConsultationsComponent from '../ChatBoot/ChatBoot.jsx'
/*import PredictionComponent from './PredictionComponent';
import SymptomsComponent from './SymptomsComponent';
import ConsultationsComponent from './ConsultationsComponent';
import ProfileComponent from './ProfileComponent';*/

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('home');

    const renderContent = () => {
        switch (activeComponent) {
            case 'home':
                return <HomeComponent />;
            case 'Disease Prediction':
                return <SymptomsComponent />;
            case 'symptoms':
                return <ConsultationsComponent />;
            case 'consultations':
                return <ConsultationsComponent />;
            case 'profile':
                return <ProfileComponent />;
            default:
                return <HomeComponent />;
        }
    };

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            {/* Sidebar */}
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark side"
                 style={{ width: '280px', height: '100vh' }}>
                <a href="/"
                   className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Dr Vito Dashboard</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#"
                           className={`nav-link ${activeComponent === 'home' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('home')}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className={`nav-link ${activeComponent === 'Disease Prediction' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('Disease Prediction')}>
                            Disease Prediction
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className={`nav-link ${activeComponent === 'consultations' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('consultations')}>
                            Consultations
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className={`nav-link ${activeComponent === 'symptoms' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('symptoms')}>
                            Symptoms
                        </a>
                    </li>
                    <li>
                        <a href="#"
                           className={`nav-link ${activeComponent === 'profile' ? 'active' : ''}`}
                           onClick={() => setActiveComponent('profile')}>
                            Profile
                        </a>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user} alt="" width="32" height="32"
                             className="rounded-circle me-2" />
                        <strong>user</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>

            <main className="main-content flex-grow-1 p-3">
                <Container fluid>
                    {renderContent()}
                </Container>
            </main>
        </div>
    );
};

export default Dashboard;
