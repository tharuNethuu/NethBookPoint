import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import CheckoutBtn from './CheckoutBtn';

const WishlistDetails = () => {
  const location = useLocation();
  const { wishListBooks, email } = location.state; // Assume email is passed in location.state
  const [copies, setCopies] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  
  const { user } = useContext(AuthContext);

  

  useEffect(() => {
    window.scrollTo(0, 20);
  }, []);

  useEffect(() => {
    // Initialize copies state with 1 copy for each book
    const initialCopies = {};
    wishListBooks.forEach(book => {
      initialCopies[book._id] = 1;
    });
    setCopies(initialCopies);
  }, [wishListBooks]);

  useEffect(() => {
    // Calculate the total price whenever copies change
    const newTotalPrice = wishListBooks.reduce((sum, book) => {
      const price = parseFloat(book.PriceValue); // Assuming PriceValue is the correct property for price
      const numCopies = copies[book._id] || 0;
      console.log('Price:', price, 'Number of Copies:', numCopies);
      return sum + (isNaN(price) ? 0 : price * numCopies);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [copies, wishListBooks]);

  const handleCopiesChange = (bookId, value) => {
    setCopies({
      ...copies,
      [bookId]: value
    });
  };

 

      

  return (
    <div className='w-full h-full  bg-white '>
<div className="absolute left-0  bg-white" >
        <img src="https://i.imgur.com/dU9CFVA.jpeg" alt="Advertisement" className="w-40 hidden md:block mt-10 fixed" />
      </div>
      <div className=' mt-20 py-5 px-4 lg:px-24 w-full  bg-white '  >

        <h2 className='text-4xl text-yellow-800 text-center font-bold mt-20 ' style={{ fontFamily: 'Bona Nova'}}>Your Cart Details</h2>

        <div className='grid py-10 px-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ' style={{ fontFamily: 'Bona Nova'}}>

          {wishListBooks.map((book, index) => (
            <div key={index} className='items-center text-center border p-4 rounded-2xl shadow-lg shadow-gray-400'>
              <img src={book.imageUrl} alt={book.bookTitle} className='h-40 w-40 mb-4 items-center mx-auto' />
              <h3 className='text-center text-lg font-semibold'>{book.bookTitle}</h3>
             
              <p>{book.Price}</p>
              <div className="text-center  items-center mt-2 font-semibold">
                <label className="mr-2 items-center font-semibold">Copies:</label>
                <input
                  type="number"
                  min="1"
                  value={copies[book._id]}
                  onChange={(e) => handleCopiesChange(book._id, parseInt(e.target.value))}
                  className="border rounded p-1 w-16 items-center"
                />
              </div>
            </div>
          ))}
          <div className="absolute right-10 top-80 bg-neutral-200 border p-4 rounded-l shadow-md shadow-gray-400 " >
      <div className='py-2 text-xl font-bold text-center' style={{ fontFamily: 'Bona Nova'}}>
          Total Price: Rs. {totalPrice.toFixed(2)}
        </div>
        <div className='text-center py-2' style={{ fontFamily: 'Bona Nova'}}><CheckoutBtn wishListBooks={wishListBooks} copies={copies} totalPrice={totalPrice} /></div>
      </div>
        </div>
        
      </div>
      <img src="https://i.imgur.com/NUCgDOp.jpeg" alt="Advertisement" className="w-full block md:hidden" />

      
      </div>
      
      
   
  );
};

export default WishlistDetails;
