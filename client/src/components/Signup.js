import { useState } from 'react';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/signup.png";
import "../App.css"





function Signup() {
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    })
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
        // console.log([name]);
        // console.log(value);
        // console.log(user);
    }
    let history = useHistory();
    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("invalid registration");
            console.log("invalid registration");
        } else {
            window.alert("successfull registration");
            console.log("successfull registration");
            history.push("./login");
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">

                    <div className="row align-items-center ">

                        <div className="col-sm signup-image ">
                            <figure>
                                <img src={signpic} alt="registration pic" />
                            </figure>
                            <NavLink to="/login" className="text-white signup-image-link">If registered then Login</NavLink>
                        </div>
                        <div className=" col-sm signup-form">
                            <h2 className="text-white form-title">
                                SIGN UP
                            </h2>
                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i class="zmdi zmdi-assignment-account materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off" placeholder="Your Name" value={user.name} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i class="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off" placeholder="Your email" value={user.email} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i class="zmdi zmdi-code-smartphone"></i>  </label>
                                    <input type="number" name="phone" id="phone" autoComplete="off" placeholder="Your Phone" value={user.phone} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="work">
                                        <i class="zmdi zmdi-slideshow"></i>  </label>
                                    <input type="text" name="work" id="work" autoComplete="off" placeholder="Your work" value={user.work} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" placeholder="Your Password" value={user.password} onChange={handleInput} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="Confirm Your Password" value={user.cpassword} onChange={handleInput} />
                                </div>
                                <div className="form-group form-button">
                                    <input onClick={PostData} type="submit" name="signup" id="signup" class="btn btn-primary" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
