import urlReplace from '../utils/urlReplace';

export default function Book ({books}) {
    return (
        <>
            {books.length > 0 ?
            books.map((book) =>   
              <div key={book.id} className="text-white">
                <img src={urlReplace(book.image)} alt=""/>
                <p>{book.tittle}</p>
                <p>{book.author}</p>
                <p>{book.publisher}</p>
                <p>{book.description}</p>
                <hr className="bg-white text-white mb-3"/>
              </div>
            ) :
            <p className="text-center">Not Found .... 😥</p>}
        </>
    )
}