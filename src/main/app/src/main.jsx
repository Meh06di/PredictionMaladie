
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import SignUp from './Components/SignUp/signUp.jsx';
import Login from './Components/Login/Login.jsx';
import ChatBoot from './Components/ChatBoot/ChatBoot.jsx';
import SymptomForm from './Components/ChoixSymp/ChoixSymp.jsx';
import DiseasePrediction from './Components/DiseasePrediction/DiseasePrediction.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/users/signUp" element={<SignUp />} />
                <Route path="/users/login" element={<Login />} />
                <Route path="/chatbot" element={<ChatBoot />} />
                <Route path="/symptoms" element={<SymptomForm />} />
                <Route path="/results" element={<DiseasePrediction />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
