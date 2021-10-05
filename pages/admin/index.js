import Router from 'next/router';
import { useState, useEffect } from "react";
import { authPage } from "../../middlewares/admin/authPage";

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

export default function AdminHome (props) {
    const {token, data} = props;
    const [book, setBook] = useState(data);
    const [searchValue, setSearchValue] = useState("");

    function editHandler (id, e) {
        e.preventDefault();
        Router.push('/admin/update/' + id);
    }

    async function deleteHandler (id, e) {
        e.preventDefault();
        const ask = confirm(`Apakah anda yakin akan menghapus buku dengan id ${id}`);
        if (!ask) return;

        const deleteReq = await fetch('/api/book/delete/' + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        if (!deleteReq.ok) return alert(`Tidak bisa menghapus buku dengan id ${id}`);
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
            
            <div className="container mx-auto flex-col">
                {book.length > 0 ? 
                book.map(books => 
                    <div key={books.id} className="border border-yellow-700 flex">
                        <div className="w-4/12 border-r border-yellow-700">{books.tittle}</div>
                        <div className="w-4/12 border-r border-yellow-700">{books.author}</div>
                        <div className="w-4/12 border-r border-yellow-700">
                            <button onClick={deleteHandler.bind(this, books.id)} className="w-2/12">Hapus</button>
                            <button onClick={editHandler.bind(this, books.id)} className="w-2/12">Edit</button>
                        </div>
                    </div>
                ) :
                <p className="text-center">Not Found .... 😥</p>}
            </div>
        </div>
    )
}