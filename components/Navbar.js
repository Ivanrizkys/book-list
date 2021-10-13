import Router from 'next/router'
import Link from 'next/link';
import Cookies from 'js-cookie'

export default function Navbar () {
    function logoutHandler () {
        Cookies.remove("adminCookie");
        Router.replace("/admin/auth/login")
    }
    return (
        <>
            <nav className="flex justify-end">
                <Link href="/admin/create"><a>Create</a></Link>
                &nbsp; | &nbsp;
                <a className="cursor-pointer" onClick={logoutHandler}>Log Out</a>
            </nav>
        </>
    )
}