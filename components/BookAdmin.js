export default function BookAdmin ({book, editHandler, deleteHandler}) {
    return (
    <div className="container mx-auto flex-col">
        {book.length > 0 ? 
        book.map(books => 
            <div key={books.id} className="border border-yellow-700 flex">
                <div className="w-4/12 border-r border-yellow-700">{books.tittle}</div>
                <div className="w-4/12 border-r border-yellow-700">{books.author}</div>
                <div className="w-4/12 border-r border-yellow-700">
                    <button onClick={deleteHandler.bind(this, books.id, books.tittle)} className="w-2/12">Hapus</button>
                    <button onClick={editHandler.bind(this, books.id)} className="w-2/12">Edit</button>
                </div>
            </div>
        ) :
        <p className="text-center">Book Not Found .... 😥</p>}
    </div>
    )
}