import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';
import  '../home/BestSellerBooks.css'


const BestSellerBooks =() =>{
    const [books, setBooks] = useState([]);

    useEffect(() =>{
fetch ("https://nethbookpoint.onrender.com/all-books"). then(res => res.json()).
then(data => setBooks (data.slice(0,6)))

    }, [])
  return (
    <div className='content  bg-white'> <div className='bestTitle'><h1>Our Best Picks</h1> </div>
     <div className='bookcards'><BookCards books ={books} /> </div>  
   
    </div>
  )
}

export default BestSellerBooks
