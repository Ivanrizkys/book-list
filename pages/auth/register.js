import React, {useState} from 'react';
import Router from 'next/router';

export default function Register () {
    const [fields, setFields] = useState({
        username: "",
        email: "",
        password: ""
    })

    async function registerHandler (e) {
        e.preventDefault();

        const registerReq = await fetch('/api/user/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        })

        const registerRes = await registerReq.json();

        Router.push('/auth/login');
    }

    function fieldHandler (e) {
        const getName = e.target.getAttribute('name');
        
        setFields({
            ...fields,
            [getName]: e.target.value
        });
        
    } 

    return(
        <div className="bg-black text-white min-h-screen">
            <h1 className="mb-9">Register</h1>

            <form className="block" onSubmit={registerHandler}>
                <label>Username</label>
                <input name="username" type="text" className="block text-black" onChange={fieldHandler}/>
                <label>Email</label>
                <input name="email" type="email" className="block text-black" onChange={fieldHandler}/>
                <label>Password</label>
                <input name="password" type="password" className="block text-black" onChange={fieldHandler}/>
                <button className="bg-yellow-900 rounded mt-2">Create User</button>
            </form>
        </div>
    )
}