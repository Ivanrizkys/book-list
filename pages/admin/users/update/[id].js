import { useState } from "react";
import Router from 'next/router';
import {authPage} from '../../../../middlewares/admin/authPage';

export async function getServerSideProps (context) {
    const {token} = await authPage(context);
    const {id} = context.query;
    const getDetail = await fetch('http://localhost:3000/api/user/detail/' + id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    const {data} = await getDetail.json();

    return {
        props: {
            token,
            data,
            id
        }
    }
}

export default function UpdateUser ({token, id, data:{username, email}}) {
    const [field, setField] = useState({
        username,
        email
    });

    async function updateHandler (e) {
        e.preventDefault();
        const updateUserReq = await fetch('/api/user/update/' + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(field)
        });
        if (!updateUserReq.ok) return console.log(`Erorr ${updateUserReq.status}`);
        const updateUserRes = await updateUserReq.json();
        Router.push('/admin/users');
    }
    function fieldHandler (e) {
        const getName = e.target.getAttribute('name');
        setField({
            ...field,
            [getName]: e.target.value 
        });
    }
    return (
        <div className="container mx-auto bg-black min-h-screen text-white">
            <h1 className="text-2xl mb-10">Update Users</h1>

            <form encType="multipart/from-data" onSubmit={updateHandler}>
                <label>Username</label>
                <input defaultValue={username} name="username" type="text" className="block text-black" onChange={fieldHandler}/>
                <label>Email</label>
                <input defaultValue={email} name="email" type="Email" className="block text-black" onChange={fieldHandler}/>
                <button className="bg-yellow-900 rounded mt-3 py-1 px-8">Edit</button>
            </form>
        </div>
    )
}