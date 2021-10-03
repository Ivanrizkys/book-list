import { authPage } from "../../middlewares/admin/authPage";
import Router from 'next/router';
import { useState } from "react";

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

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-xl text-center mb-10">Admin Page</h1>
            </div>
            
            <div className="container mx-auto flex-col">
                {book.map(books => 
                    <div key={books.id} className="border border-yellow-700 flex">
                        <div className="w-4/12 border-r border-yellow-700">{books.tittle}</div>
                        <div className="w-4/12 border-r border-yellow-700">{books.author}</div>
                        <div className="w-4/12 border-r border-yellow-700">
                            <button onClick={deleteHandler.bind(this, books.id)} className="w-2/12">Hapus</button>
                            <button onClick={editHandler.bind(this, books.id)} className="w-2/12">Edit</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}