import React, { useEffect, useState } from 'react'
import "../App.css"



function Home() {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
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
            setShow(true);

            setUserName(data.name);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);

        }
    };
    useEffect(() => {
        userContact();
    }, []);
    let msg;
    if (show) { msg = "HAPPY TO SEE YOU BACK" } else { msg = "Please Register Yourself" }
    return (
        <>
            <div className=" homebody">
                <div className="bg-info homecenter">
                    <h1 className="text-center">WELCOME</h1>
                    <h2 className="text-center text-secondary">{userName}</h2>
                    <h1 className="text-center bolderblack">{msg}</h1>
                </div>
            </div>
        </>
    )
}

export default Home
