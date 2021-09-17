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

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-xl text-center mb-10">Admin Page</h1>
            </div>

            
            <div className="container mx-auto flex-col">
                {data.map(books => 
                    <div key={books.id} className="border border-yellow-700 flex">
                        <div className="w-4/12 border-r border-yellow-700">{books.tittle}</div>
                        <div className="w-4/12 border-r border-yellow-700">{books.author}</div>
                        <div className="w-4/12 border-r border-yellow-700">
                            <button className="w-2/12">Hapus</button>
                            <button className="w-2/12">Edit</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}