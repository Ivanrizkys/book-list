import React, {useState} from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { unAuthPage } from '../../../middlewares/admin/authPage';
import DangerAlert from '../../../components/dangerAlert';
import TittleAdmin from '../../../components/TittleAdmin';

export async function getServerSideProps (context) {
    await unAuthPage(context);
    return {
        props: {

        }
    }
}

export default function AdminLogin () {
    const [status, setStatus] = useState({
        error: false,
        message: ""
    });

    const [field, setField] = useState({
        username: "",
        email: "",
        password: ""
    });

    async function loginAdminHandler (e) {
        e.preventDefault();
        const loginAdminReq = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(field)
        });
        const { token, message } = await loginAdminReq.json()
        if (!loginAdminReq.ok) return setStatus({
            error: true,
            message
        })
        Cookies.set("adminCookie", token);
        Router.push('/admin');
    }

    function fieldHandler (e) {
        const getName = e.target.getAttribute('name');
        setField({
            ...field,
            [getName]: e.target.value
        });
    }

    return (
        <div>
            <TittleAdmin/>
            <main className="bg-black text-white min-h-screen">
                <DangerAlert error={status.error} message={status.message} setStatus={setStatus}/>
                <h1 className="mb-10">Admin Login</h1>

                <form onSubmit={loginAdminHandler}>
                    <label>Username</label>
                    <input name="username" type="text" className="text-black block" onChange={fieldHandler}/>
                    <label>Email</label>
                    <input name="email" type="email" className="text-black block" onChange={fieldHandler}/>
                    <label>Password</label>
                    <input name="password" type="password" className="text-black block" onChange={fieldHandler}/>
                    <button className="bg-yellow-900 rounded mt-2">Login</button>
                </form>
            </main>
        </div>
    )
}