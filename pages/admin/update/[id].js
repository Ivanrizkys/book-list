import { authPage } from "../../../middlewares/admin/authPage";
import { useState } from "react";
import Router from 'next/router';

export async function getServerSideProps (context) {
    const { token } = await authPage(context) 
    const { id } = context.query;

    const getDetailBook = await fetch('http://localhost:3000/api/book/detail/' + id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    const { data } = await getDetailBook.json()

    return {
        props: {
            token,
            data,
            id
        }
    }
}

export default function Update (props) {
    const { token, data, id} = props;
    const {tittle, author, publisher, description, image} = data;

    const [field, setField] = useState({
        tittle,
        author,
        publisher,
        description,
        image,
    });
    
    async function updateHandler (e) {
        e.preventDefault();

        const formData = new FormData()
        Object.entries(field).forEach(([key, values]) => {
            formData.append(key, values)
        })

        const updateReq = await fetch('/api/book/update/' + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                // "Content-Type": "application/json"
            },
            body: formData
        });

        const updateRes = await updateReq.json();

        Router.push('/admin');
        
    }

    function imageHandler (e) {
        const getName = e.target.getAttribute('name');

        setField({
            ...field,
            [getName]: e.target.files[0]
        })
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
            <h1 className="text-2xl mb-10">Update Book</h1>

            <form encType="multipart/from-data" onSubmit={updateHandler}>
                <label>Tittle</label>
                <input name="tittle" type="text" defaultValue={tittle} className="block text-black" onChange={fieldHandler}/>
                <label>Author</label>
                <input name="author" type="text" defaultValue={author} className="block text-black" onChange={fieldHandler}/>
                <label>Publisher</label>
                <input name="publisher" type="text" defaultValue={publisher} className="block text-black" onChange={fieldHandler}/>
                <label>Description</label>
                <textarea name="description" defaultValue={description} id="" cols="30" rows="10" className="block text-black" onChange={fieldHandler}></textarea>
                <label>Image</label>
                <input name="image" type="file" className="block" onChange={imageHandler}/>
                <button className="bg-yellow-900 rounded mt-3 py-1 px-8">Edit</button>
            </form>
        </div>
    )
}