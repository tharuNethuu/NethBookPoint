/* import React, { useEffect, useRef } from 'react'
import { Card, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";

const Sidebarr  = ({ wishList, books, removeItemFromWishList, isSidebarOpen, toggleSidebar }) => {
    const sidebarRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          toggleSidebar();
        }
      };
  
      if (isSidebarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      const goToWishlistDetails = () => {
        const wishListBooks = wishList.map(bookId => books.find(book => book._id === bookId));
        navigate('/wishlist-details', { state: { wishListBooks } });
      };
    
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isSidebarOpen, toggleSidebar]);
  
    return (
      <div ref={sidebarRef} className={`fixed top-40 right-0 w-80 bg-black h-full shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center bg-yellow-700">
          <h2 className="text-white  font-semibold">Your Wishlist</h2>
          <button onClick={toggleSidebar} className="text-white">
            <HiX className="h-6 w-6" />
          </button>

        </div>
        <div className='p-4'>
          {
            wishList.length === 0 ? (
              <p className=" py-5 text-white">Your wishlist is empty.</p>
            ) : (
              wishList.map(bookId => {
                const book = books.find(book => book._id === bookId);
                return (
                  <Card key={book._id} className="max-w-sm bg-white px-5 py-2 rounded-2xl mb-4">
                    <img src={book.imageUrl} alt="" className='h-10 w-10' />
                    <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white ">
                      <p>{book.bookTitle} - {book.Price}</p>
                      <p>{book.authorName}</p>
                    </h5>
                    
                    
                    
                    <Button onClick={() => removeItemFromWishList(book._id)} className="  text-red-700 font-semibold bg-red-white rounded-full  hover:bg-red-500 transition-all duration-300">
                      <HiX className="mr-2 h-5 w-5 " /> 
                    </Button>
                   
                  </Card>
                );
              })

            )
            
          }
          <Button onClick={goToWishlistDetails} className="mt-4 w-full bg-yellow-700 text-white font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300">
          View Wishlist Details
        </Button>
        </div>
      </div>
    );
  }
  

export default Sidebarr
 */


// Sidebarr.js
import React, { useEffect, useRef } from 'react';
import { Card, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const Sidebarr = ({ wishList, books, removeItemFromWishList, isSidebarOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  const goToWishlistDetails = () => {
    const wishListBooks = wishList.map(bookId => books.find(book => book._id === bookId));
    navigate('/wishlist-details', { state: { wishListBooks } });
  };

  return (
    <div ref={sidebarRef} className={`fixed top-40 right-0 w-80 bg-black h-full shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center bg-yellow-700">
        <h2 className="text-white font-semibold">Your Cart</h2>
        <button onClick={toggleSidebar} className="text-white">
          <HiX className="h-6 w-6" />
        </button>
      </div>
      <div className='p-4'>
        {wishList.length === 0 ? (
          <p className="py-5 text-white">Your Cart is empty.</p>
        ) : (
          wishList.map(bookId => {
            const book = books.find(book => book._id === bookId);
            return (
              <Card key={book._id} className="max-w-sm bg-white px-5 py-2 rounded-2xl mb-4">
                <img src={book.imageUrl} alt="" className='h-10 w-10' />
                <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white ">
                  <p>{book.bookTitle} - {book.Price}</p>
                  <p>{book.authorName}</p>
                </h5>
                <Button onClick={() => removeItemFromWishList(book._id)} className="text-red-700 font-semibold bg-white rounded-full hover:bg-red-500 transition-all duration-300">
                  <HiX className="mr-2 h-5 w-5" />
                </Button>
              </Card>
            );
          })
        )}
        <Button onClick={goToWishlistDetails} className="mt-4 w-full bg-yellow-700 text-white font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300">
          View Wishlist Details
        </Button>
      </div>
    </div>
  );
}

export default Sidebarr;
