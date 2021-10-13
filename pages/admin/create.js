import { useState } from "react";
import { authPage } from "../../middlewares/admin/authPage";
import Router from 'next/router';

export async function getServerSideProps (context) {
    const { token } = await authPage (context);

    return {
        props: {
            token
        }
    }
}

export default function Create (props) {
    const { token } = props;
    
    const [field, setField] = useState({
        tittle: "",
        author: "",
        publisher: "",
        description: "",
        image: ""
    });

    const [status, setStatus] = useState('normal')

    async function createHandler (e) {
        e.preventDefault();

        const formData = new FormData()
        Object.entries(field).forEach(([ key, values ]) => {
            formData.append(key, values)
        });

        const createReq = await fetch('/api/book/create', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: formData
        });

        if (!createReq.ok) return setStatus(`Error`)
        const createRes = await createReq.json();
        Router.push('/admin');
    }

    function fieldHandler (e) {
        const getName = e.target.getAttribute('name')

        setField({
            ...field,
            [getName]: e.target.value
        })
    }
    
    function imageHandler (e) {
        const getName = e.target.getAttribute('name')

        setField({
            ...field,
            [getName]: e.target.files[0]
        })

    }

    return (
        <div className="container mx-auto bg-black min-h-screen text-white">
            <h1 className="text-2xl mb-10">Create Book</h1>

            <form encType="multipart/from-data" onSubmit={createHandler}>
                <label>Tittle</label>
                <input name="tittle" type="text" className="block text-black" onChange={fieldHandler}/>
                <label>Author</label>
                <input name="author" type="text" className="block text-black" onChange={fieldHandler}/>
                <label>Publisher</label>
                <input name="publisher" type="text" className="block text-black" onChange={fieldHandler}/>
                <label>Description</label>
                <textarea name="description" id="" cols="30" rows="10" className="block text-black" onChange={fieldHandler}></textarea>
                <label>Image</label>
                <input name="image" type="file" className="block" onChange={imageHandler}/>
                <button className="bg-yellow-900 rounded mt-3 py-1 px-8">Create</button>
                <p>Status {status}</p>
            </form>
        </div>
    )
}