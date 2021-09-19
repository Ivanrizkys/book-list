import { authPage } from "../middlewares/user/authPage";
import React, {useState} from 'react';

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
      data    
    }
  }
}

export default function Home(props) {
  const { data } = props;

  const [books, setBooks] = useState(data)

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-xl mb-7">Index</h1>

      {books.map((book) => 
        <div key={book.id} className="text-white">
          <p>{book.tittle}</p>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>{book.description}</p>
          <hr className="bg-white text-white mb-3"/>
        </div>
      )}


    </div>
  )
}
