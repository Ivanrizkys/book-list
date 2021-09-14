import React, {useState} from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { unAuthPage } from '../../middlewares/user/authPage';


export async function getServerSideProps (context) {
    await unAuthPage(context);
    
    return {
        props: {}
    }
}

export default function Login () {
    const [fields, setFields] = useState({
        username: "",
        email: "",
        password: ""
    });

    async function loginHandler(e) {
        e.preventDefault();

        const loginReq = await fetch('/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        })

        const loginRes = await loginReq.json();
        const { token } = loginRes;
        
        Cookies.set('userCookie', token);

        Router.push('/');
    }

    async function fieldHandler(e) {
        const getName = e.target.getAttribute('name');
        
        setFields({
            ...fields,
            [getName]: e.target.value
        })

    }

    return(
        <div className="bg-black min-h-screen text-white">
            <h1 className="mb-6 text-lg">Login</h1>
            <form onSubmit={loginHandler}>
                <label>Username</label>
                <input onChange={fieldHandler} type="text" name="username" className="block text-black"/>
                <label>email</label>
                <input onChange={fieldHandler} type="email" name="email" className="block text-black"/>
                <label>Password</label>
                <input onChange={fieldHandler} type="password" name="password" className="block text-black"/>
                <button className="bg-yellow-900 rounded mt-2">Login</button>
            </form>
        </div>
    )
}