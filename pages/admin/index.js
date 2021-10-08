import Router from 'next/router';
import { useState, useEffect } from "react";
import { authPage } from "../../middlewares/admin/authPage";
import BookAdmin from '../../components/BookAdmin';

export async function getServerSideProps (context) {
    const { token } = await authPage(context);
    const bookReq = await fetch('http://localhost:3000/api/book', {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    const { data } = await bookReq.json();
    return {
        props: {
            token,
            data
        }
    }
}

export default function AdminHome ({token, data}) {
    const [book, setBook] = useState(data);
    const [searchValue, setSearchValue] = useState("");

    function editHandler (id, e) {
        e.preventDefault();
        Router.push('/admin/update/' + id);
    }

    async function deleteHandler (id, tittle, e) {
        e.preventDefault();
        console.log(tittle)
        const ask = confirm(`Apakah anda yakin akan menghapus buku ${tittle}`);
        if (!ask) return;

        const deleteReq = await fetch('/api/book/delete/' + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        if (!deleteReq.ok) return alert(`Tidak bisa menghapus buku ${tittle}`);
        const { data } = await deleteReq.json();
        setBook(data);
    }

    function searchHandler (e) {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        const result = data.filter(({tittle, author}) => {
            return (
                tittle.toLowerCase().includes(searchValue.toLowerCase()) ||
                author.toLowerCase().includes(searchValue.toLowerCase())
            )
        });
        setBook(result);
    }, [searchValue]);

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-xl text-center mb-1">Admin Page</h1>
                <input onChange={searchHandler} type="text" placeholder="Search" className="block mx-auto mb-10 text-black"/>
            </div>
            <BookAdmin 
            book={book}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            />
        </div>
    )
}