import React, {useState, useEffect} from 'react';
import urlReplace from '../utils/urlReplace';
import { authPage } from "../middlewares/user/authPage";

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

  const [books, setBooks] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  function searchHandler (e) {
    setSearchValue(e.target.value);
  }
  useEffect(() => {
    const result = data.filter(({tittle, author, publisher, description}) => {
      return (
        tittle.toLowerCase().includes(searchValue.toLowerCase()) ||
        author.toLowerCase().includes(searchValue.toLowerCase()) ||
        publisher.toLowerCase().includes(searchValue.toLowerCase()) ||
        description.toLowerCase().includes(searchValue.toLowerCase())
      )
    });
    setBooks(result);
  }, [searchValue]);  
  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-xl mb-1 text-center">Index</h1>
      <input onChange={searchHandler} type="text" placeholder="Search" className="block mx-auto text-black mb-10"/>
      
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
    </div>
  )
}
