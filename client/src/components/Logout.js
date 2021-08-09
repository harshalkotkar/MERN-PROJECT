import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { userContext } from '../App';
function Logout() {

    const history = useHistory();
    const { state, dispatch } = useContext(userContext)

    useEffect(() => {
        fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then((res) => {

            dispatch({ type: "USER", payload: false })
            history.push("/login");
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        })
            .catch((err) => {
                console.log(err);
            })
    });

    return (
        <>
            <h1>logout</h1>
        </>
    )
}

export default Logout




