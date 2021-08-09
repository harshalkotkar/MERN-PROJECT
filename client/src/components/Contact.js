import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom';


function Contact() {
    // const history = useHistory(); 
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
    const userContact = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);

            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            // history.push("/login");

        }
    };

    useEffect(() => {
        userContact();
    }, []);

    //   we are storing data in states

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value })
    }

    // send the data to backend
    const contactForm = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });
        const data = await res.json();
        if (!data) {
            alert("message not send");
            console.log(" message not sent");
        } else {
            alert("message send");
            setUserData({ ...userData, message: "" })
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm  mx-3">
                        <div className="phone d-flex align-items-center justify-content-center">
                            <img className="mx-3" src="https://img.icons8.com/ios-filled/50/4a90e2/apple-phone.png" alt="phone" />
                            <div className="details mt-2 ">
                                <p>Phone</p>
                                <p className="bolderwhite">{userData.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm  mx-3">
                        <div className="email d-flex align-items-center justify-content-center">
                            <img className="mx-3" src="https://img.icons8.com/pastel-glyph/64/4a90e2/email.png" alt="email" />
                            <div className="details mt-2">
                                <p>Email</p>
                                <p className="bolderwhite">{userData.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm  mx-3">
                        <div className="address d-flex align-items-center justify-content-center">
                            <img className="mx-3" src="https://img.icons8.com/ios-filled/50/4a90e2/address--v1.png" alt="address" />
                            <div className="details mt-2">
                                <p>Address</p>
                                <p className="bolderwhite">Mumbai, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* contact */}
            <div className="contact_form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    <h3 className="font-weight-bold text-center my-5"> GET IN TOUCH</h3>
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between ">
                                        <input type="text" id="contact_form_name" className="contact_form_name input_field"
                                            placeholder="Your name" name="name" value={userData.name} onChange={handleInputs} />
                                        <input type="text" id="contact_form_email" className="contact_form_email input_field"
                                            placeholder="Your email" name="email" value={userData.email} onChange={handleInputs} />
                                        <input type="number" id="contact_form_phone" className="contact_form_phone input_field"
                                            placeholder="Your phone" name="phone" value={userData.phone} onChange={handleInputs} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1"></label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="message" value={userData.message} onChange={handleInputs} placeholder="Message"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" onClick={contactForm} className="btn btn-primary mt-4" >Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
