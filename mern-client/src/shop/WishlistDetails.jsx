import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import CheckoutBtn from './CheckoutBtn';
import PaypalButtons from './Payment/PaypalButtons';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const WishlistDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishListBooks, email } = location.state; // Assume email is passed in location.state
  
  const [copies, setCopies] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  
  const { user } = useContext(AuthContext);
 
  

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <PayPalScriptProvider
      options={{
        clientId: 'ARLdvQEIhb_bCkZiFT4UIlXWQoaZoSx2d77civTrz8XoWir465dZo1QZeK6bJIIMFPWVF3Cq-humitKN',
        currency: 'USD'
      }}
    >
    <div className='w-full h-full  bg-white grid grid-cols-3 gap-0 '>
      <div className="absolute left-0 mt-20 bg-white" >
        <img src="https://i.imgur.com/dU9CFVA.jpeg" alt="Advertisement" className="w-40 hidden md:block mt-10 fixed" />
      </div>
      <div className=' mt-20 col-span-2 py-5 px-0 lg:px-18 bg-white '  >

        <h2 className='text-4xl  text-yellow-800 text-center font-bold mt-20 ' style={{ fontFamily: 'Bona Nova'}}>Your Cart Details</h2>

        <div className=' py-10 px-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-20' style={{ fontFamily: 'Bona Nova'}}>

          {wishListBooks.map((book, index) => (
            <div key={index} className='flex items-center justify-between text-center py-2 px-10'>
            {/* Image */}
            <div className="flex-shrink-0">
              <img src={book.imageUrl} alt={book.bookTitle} className='h-10 w-10 items-center mx-auto' />
            </div>
          
            {/* Book Title and Price */}
            <div className="flex-grow text-left ml-4">
              <h3 className='text-lg font-semibold'>{book.bookTitle}</h3>
              <p>{book.Price}</p>
            </div>
          
            {/* Copies Input */}
            <div className="flex-shrink-0 text-left ml-4">
              <label className="mr-2 font-semibold">Copies:</label>
              <input
                type="number"
                min="1"
                value={copies[book._id]}
                onChange={(e) => handleCopiesChange(book._id, parseInt(e.target.value))}
                className="border rounded p-1 w-12"
              />
            </div>
          </div>
          
          ))}

        
         
        </div>
       <div className='flex justify-center'> 
        <div className=" text-black font-medium rounded hover:bg-yellow-500 hover:font-semibold hover:text-white transition-all duration-300 px-2 py-2 w-60 flex items-center justify-center" style={{borderRadius: 10, border: '2px #CC9600 solid'}}   >
      <div className='text-lg font-bold text-center' style={{ fontFamily: 'Bona Nova'}}>
          Total Price: Rs. {totalPrice.toFixed(2)}
        </div>
        <div className='text-center py-2' style={{ fontFamily: 'Bona Nova'}}>
          
{/*           <button wishListBooks={wishListBooks} copies={copies} totalPrice={totalPrice} onClick={handleClick}>Proceed to Checkout</button>
 */}          
          {/* <CheckoutBtn wishListBooks={wishListBooks} copies={copies} totalPrice={totalPrice} /> */}</div>
     
        </div>
        </div>
      </div>


      <div className=' mt-20 col-span-1 py-5 px-0 lg:px-18 bg-white border p-4 rounded-2xl shadow-lg shadow-gray-700'  >
            <CheckoutBtn wishListBooks={wishListBooks} copies={copies} totalPrice={totalPrice}/>
            
      </div>
      <img src="https://i.imgur.com/NUCgDOp.jpeg" alt="Advertisement" className="w-full block md:hidden" />

      
      </div>
      
      
      </PayPalScriptProvider>
  );

};

export default WishlistDetails;
