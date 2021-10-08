import React, {useState, useEffect} from 'react';
import { authPage } from "../middlewares/user/authPage";
import Book from '../components/Book';

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

export default function Home({data}) {
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
      <Book books={books}/>
    </div>
  )
}
