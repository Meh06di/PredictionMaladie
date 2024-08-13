import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import SignUp from "./Components/SignUp/signUp.jsx";
import Login from './Components/Login/Login.jsx'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,document.getElementById("root")
)
