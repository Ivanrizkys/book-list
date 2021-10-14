import { useState, useEffect } from "react";
import Router from 'next/router';
import TittleAdmin from "../../../components/TittleAdmin";
import { authPage } from "../../../middlewares/admin/authPage";

export async function getServerSideProps (context) {
    const {token} = await authPage(context);
    const users = await fetch ('http://localhost:3000/api/user', {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    const {data} = await users.json();
    return {
        props: {
            token,
            data
        }
    }
}

export default function Users ({token, data}) {
    const [users, setUsers] = useState(data);
    const [search, setSearch] = useState("");

    async function deleteHandler (id, username, e) {
        e.preventDefault();
        const ask = confirm(`Apakah anda akan menghapus user ${username}`);
        if (!ask) return;

        const deleteReq = await fetch('/api/user/delete/' + id,{
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            }
        });
        if (!deleteReq.ok) return alert(`Tidak bisa menghapus user ${username}`);
        const {data} = await deleteReq.json();
        setUsers(data);
    }

    function editHandler (id, e) {
        e.preventDefault();
        Router.push('/admin/users/update/' + id);
    }

    useEffect(() => {
        const filter = data.filter(({username}) => {
            return (
                username.toLowerCase().includes(search.toLowerCase())
            )
        });
        setUsers(filter);
    }, [search])

    return (
        <>
            <TittleAdmin/>
            <div className="bg-black min-h-screen text-white">
                <h1 className="text-center text-xl mb-5">Users</h1>
                <input className="text-black block mx-auto mb-5" type="text" onChange={(e) => setSearch(e.target.value)}/>

                <div className="container mx-auto flex-col">
                    {users.length > 0 ? 
                    users.map(user => 
                        <div key={user.id} className="border border-yellow-700 flex">
                            <div className="w-4/12 border-r border-yellow-700">{user.username}</div>
                            <div className="w-4/12 border-r border-yellow-700">{user.email}</div>
                            <div className="w-4/12 border-r border-yellow-700">
                                <button onClick={deleteHandler.bind(this, user.id, user.username)} className="w-2/12">Hapus</button>
                                <button onClick={editHandler.bind(this, user.id)} className="w-2/12">Edit</button>
                            </div>
                        </div>
                    ) :
                    <p className="text-center">Users Not Found .... 😥</p>}
                </div>
            </div>
        </>
    )
}