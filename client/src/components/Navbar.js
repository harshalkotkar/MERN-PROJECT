import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo.png"
import { userContext } from '../App';
import "../App.css"


const RenderMenu = () => {
    const {state,dispatch} = useContext(userContext);
    if (state) {
        return (
            <>
                <li className="nav-item active">
                    <NavLink className="text-white nav-link" to="/">Home </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="text-white nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="text-white nav-link" to="/contact">Contact</NavLink>
                </li>
           
                <li className="nav-item">
                    <NavLink className="text-white nav-link" to="/logout">Logout</NavLink>
                </li>
            </>
        )
    } else {
        return (
            <>
                <li className="nav-item active">
                    <NavLink className="text-white nav-link" to="/">Home </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="text-white nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="text-white nav-link" to="/contact">Contact</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="text-white nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="text-white nav-link" to="/signup">Registration</NavLink>
                </li>
            </>
        )
    }
}


function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light ">
                <NavLink className="navbar-brand" to="#"><img className="aboutlogo" src={logo} alt="logo" /></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                    <RenderMenu/>
                    </ul>
                </div>
        </nav>
        </>
    )
}

export default Navbar
