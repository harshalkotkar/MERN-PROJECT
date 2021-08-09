import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import loginpic from "../images/login.png";
import "../App.css"
import { userContext } from '../App';

function Login() {
    const { state, dispatch } = useContext(userContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();
    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = res.json();
        if (res.status === 400 || !data) {
            window.alert("invalid credentials");
            console.log("invalid credentials");
        } else {
            dispatch({ type: "USER", payload: true })
            window.alert("login successfull");
            console.log("successfull login");
            history.push("/");
        }
    }


    return (
        <div>
            <section className="login">
                <div className="container mt-5">

                    <div className="row align-items-center ">
                        <div className="col-sm  login-image ">
                            <figure>
                                <img src={loginpic} alt="registration pic" />
                            </figure>
                            <NavLink to="/signup" className="text-white signup-image-link">Register here</NavLink>
                        </div>

                        <div className="col-sm login-form ">
                            <h2 className="text-white form-title">
                                LOGIN
                            </h2>
                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Your Password" />
                                </div>

                                <div className="form-group form-button">
                                    <input onClick={loginUser} type="submit" name="signup" className="form-submit" class="btn btn-primary" value="Login" />
                                </div>

                            </form>



                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login