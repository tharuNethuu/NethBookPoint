import React from 'react';
import { Card, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";

const Sidebar = ({ wishList, books, removeItemFromWishList, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center bg-yellow-700">
        <h2 className="text-white text-xl font-semibold">Your Wishlist</h2>
        <button onClick={toggleSidebar} className="text-white">
          <HiX className="h-6 w-6" />
        </button>
      </div>
      <div className='p-4'>
        {
          wishList.length === 0 ? (
            <p className="text-gray-700">Your wishlist is empty.</p>
          ) : (
            wishList.map(bookId => {
              const book = books.find(book => book._id === bookId);
              return (
                <Card key={book._id} className="max-w-sm bg-white px-5 py-5 rounded-2xl mb-4">
                  <img src={book.imageUrl} alt="" className='h-25' />
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white py-2">
                    <p>{book.bookTitle}</p>
                  </h5>
                  <p className="text-gray-700 text-xs dark:text-gray-400">
                    {book.bookDescription}
                  </p>
                  <p className="py-2 text-yellow-800 font-semibold">
                    {book.Price}
                  </p>
                  <p className="text-yellow-600 font-medium py-2">
                    {book.availability}
                  </p>
                  <Button onClick={() => removeItemFromWishList(book._id)} className="inline-block text-white font-semibold bg-red-700 rounded-full hover:bg-red-500 transition-all duration-300">
                    <HiX className="mr-2 h-5 w-5" /> Remove
                  </Button>
                </Card>
              );
            })
          )
        }
      </div>
    </div>
  );
}

export default Sidebar;
