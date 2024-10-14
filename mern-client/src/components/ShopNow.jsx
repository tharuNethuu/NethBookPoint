import React, { useEffect, useState } from 'react';
import { Card, Button } from "flowbite-react";
import { HiMenu, HiShoppingCart } from "react-icons/hi";
import Sidebarr from '../shop/Sidebarr';
import './ShopNow.css'
import { useNavigate } from 'react-router-dom';


const Shop = () => {
  const [books, setBooks] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
const [categories, setCategories] = useState(['All', 'Novel', 'Translations', "Kids' Stories"]);
const [selectedCategory, setSelectedCategory] = useState('All');
const navigate = useNavigate();



  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("https://nethbookpoint.onrender.com/all-books").then(res => res.json()).then(data => { if (selectedCategory === 'All') {
      setBooks(data);
    } else {
      setBooks(data.filter(book => book.category === selectedCategory));
    }
  });
}, [selectedCategory]);
  const addItemToWishList = (bookId) => {
    if (!wishList.includes(bookId)) {
      setWishList([...wishList, bookId]);
    }
  };

  const removeItemFromWishList = (bookId) => {
    setWishList(wishList.filter(id => id !== bookId));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarOpen]);

  return (
    <div className='bg-white py-20'>

    <div className='px-4 lg:px-24 bg-white' style={{ fontFamily: 'Bona Nova'}}>
      
      <h2 className='text-5xl text-center font-bold mt-20' style={{ fontFamily: 'Bona Nova',  color: '#CA891D'}}>Explore All Books Here</h2>
     
      <div className=" mt-8 text-center font-bold text-lg">
  {categories.map(category => (
    <label key={category} className="inline-flex items-center mr-6">
      <input
        type="checkbox"
        checked={selectedCategory === category}
        onChange={() => setSelectedCategory(category)}
        className="form-checkbox h-4 w-4 text-yellow-600 transition duration-150 ease-in-out"
      />
      <span className="ml-2 text-gray">{category}</span>
    </label>
  ))}
</div>

      <div className=' bookcard py-10 grid gap-10 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 '>
       
        {
          books.map(book => (
            <Card key={book._id} className="max-w-sm bg-white px-5 py-5 rounded-2xl hover:shadow-xl hover:shadow-gray-600">
          <div className="image-container">
             <img src={book.imageUrl}
             alt=""
             className="h-22"
             onClick={() => navigate(`/book/${book._id}`)}/>


          </div> 
          <div>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{book.bookTitle}</p>
              </h5>
              <p className="text-gray-700 text-md font-bold">
                {book.authorName}
              </p><br></br>
              <p className=" text-yellow-800 font-semibold">
                {book.Price}
              </p>
              <p className="text-yellow-600 font-medium">
                {book.availability}
              </p>
          </div>
             

              <Button onClick={() => addItemToWishList(book._id)}  className=' text-black   font-medium px-3 rounded hover:bg-yellow-500 hover:font-semibold hover:text-white transition-all duration-300 md:mb-' style={{borderRadius: 10, border: '2px #CC9600 solid'}}>
                <HiShoppingCart className="mr-1 h-5 w-4" /> Add to Cart
              </Button>
            </Card>
          ))
          }
       
      </div>

      <button onClick={toggleSidebar} className="fixed bottom-10 right-10 bg-yellow-700 text-white p-3 rounded-full shadow-lg">
        <HiShoppingCart className="h-6 w-6" />
      </button>

      <Sidebarr
        wishList={wishList}
        books={books}
        removeItemFromWishList={removeItemFromWishList}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </div>
    </div>
  );
}

export default Shop;
