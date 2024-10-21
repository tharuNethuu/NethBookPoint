import React, { useContext, useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { AuthContext } from '../contects/AuthProvider';
import Alert from '../components/Alert';
import { FaUser, FaAddressBook, FaMapMarkerAlt, FaPhone, FaCreditCard } from 'react-icons/fa';
import CheckoutForm from './Payment/CheckoutForm';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PaypalButtons from './Payment/PaypalButtons'; 


export default function ({ wishListBooks, copies, totalPrice }) {
  const [receiverName, setReceiverName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [sendingAddress, setSendingAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [province, setProvince] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);
  const [usdPrice, setUsdPrice] = useState(0); // Add state for USD price


  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const provinces = [
    'North-Western',
    'Central',
    'Southern',
    'Western',
    'Northern',
    'Uva',
    'Eastern',
    'Sabaragamuwa',
    'North-Central'
  ];
 useEffect(() => {
    const fetchExchangeRate = async () => {
        try {
            const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=59b08ed4398b457094a176e97f3ca04c');
            const data = await response.json();
            
            // Check if rates exist in the data
            const exchangeRate = data.rates.LKR; // Access the correct rate here
            if (!isNaN(exchangeRate)) {
                const convertedPrice = totalPrice / exchangeRate; // Convert totalPrice to USD
                setUsdPrice(convertedPrice.toFixed(2)); // Set USD price with 2 decimal places
            } else {
                console.error("Invalid exchange rate received:", exchangeRate);
            }
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    };

    fetchExchangeRate();
}, [totalPrice]); // Run the effect when totalPrice changes
 
  
 
  const handlePayNow = async () => {
    if (!receiverName || !billingAddress || !sendingAddress || !contactNumber ) {
      alert("Please fill out all the fields.");
      return;
    }

    

    if (window.confirm("Please confirm that the following order details are correct before continuing.")) {
      const orderDetails = wishListBooks.map(book => ({
        bookTitle: book.bookTitle,
        copies: copies[book._id],
        price: parseFloat(book.PriceValue)
      }));

      const order = {
        email: user.email,
        totalPrice,
        books: orderDetails,
        receiverName,
        billingAddress,
        sendingAddress,
        contactNumber,
        province
      };

      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });

      if (response.ok) {
      setAlertMessage("Your order has been successfully updated. We will notify you shortly");
      setAlertVariant("success");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);
      setReceiverName('');
      setBillingAddress('');
      setSendingAddress('');
      setContactNumber('');
      setProvince('');
      //window.location.href = "https://sandbox.ipay.lk/ipg/checkout";

      } else {
      setAlertMessage("Failed to place order. Please try again.");
      setAlertVariant("warning");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);
      }
    }
  };

  return (
    
    <div>
      {/* <Popup trigger={<button className=' text-gray-900 h-8 px-7 rounded-lg hover:bg-yellow-500 hover:font-semibold hover:text-black transition-all duration-300 md:' style={{ fontFamily: 'Bona Nova', fontSize:'16px', fontWeight:'bold',borderColor:'#CC9600', border:'1px solid #CC9600'}}> Proceed to Checkout </button>} modal nested>
        {close => ( */}
          <div className='modal rounded-2xl '>
            <div className='mt-19 py-5 rounded-2xl bg-white  '>
              <div className=' bg-white w-full px-5 rounded-2xl'>
                {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
                <div className='grid' style={{ fontFamily: 'Bona Nova'}}>
                  <div className=' p-2 rounded-4xl   hover:-yellow-500'>
                  <div className='flex items-center p-1 rounded-4xl   hover:-yellow-500'>
                  <FaUser className='text-black mr-2' />
                    <label className='block text-black '>  Receiver Name</label>
                    </div>
                    <input
                      type="text"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="p-1 border rounded w-full "
                      placeholder="Receiver Name"
                    />
                  </div>
                  <div className=' p-2 rounded   hover:-yellow-500'>
                  <div className='flex items-center p-1 rounded-4xl   hover:-yellow-500'>
                  <FaAddressBook className='text-black mr-2' />
                    <label className='block text-black '>Billing Address</label>
                    </div>
                    <input
                      type="text"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      className="p-1 border rounded w-full "
                      placeholder="Billing Address"
                    />
                  </div>
                  <div className=' p-2 rounded   hover:-yellow-500'>
                  <div className='flex items-center p-1 rounded-4xl   hover:-yellow-500'>
                  <FaMapMarkerAlt className='text-black mr-2' />
                    <label className='block text-black '>Sending Address</label>
                    </div>                    <input
                      type="text"
                      value={sendingAddress}
                      onChange={(e) => setSendingAddress(e.target.value)}
                      className="p-1 border rounded w-full "
                      placeholder="Sending Address"
                    />
                  </div>
                  <div className=' p-2 rounded   hover:-yellow-500'>
                  <div className='flex items-center p-1 rounded-4xl   hover:-yellow-500'>
                  <FaMapMarkerAlt className='text-black mr-2' />
                    <label className='block text-black '>Province</label>
                    </div>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="p-1 border rounded w-full "
                    >
                      <option value="">Select Province</option>
                      {provinces.map((prov, index) => (
                        <option key={index} value={prov}>{prov}</option>
                      ))}
                    </select>
                  </div>
                  <div className=' p-2 rounded  hover:-yellow-500'>
                  <div className='flex items-center p-1 rounded-4xl   hover:-yellow-500'>
                  <FaPhone  className='text-black mr-2' />
                    <label className='block text-black '>Contact Number</label>
                    </div>                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="p-1 border rounded w-full "
                      placeholder="Contact Number"
                    />
                  </div>


{/*                  <CheckoutForm totalAmount={totalPrice} customerEmail={user.email} />
 */}               <PaypalButtons totalPrice={usdPrice} /> 
 
                  <button
                  wishListBooks={wishListBooks} copies={copies} totalPrice={totalPrice}
                    onClick={handlePayNow}
                    className="text-black font-semibold  bg-yellow-500 rounded-full  hover:bg-red-500 transition-all duration-300 py-2"
                  >
                    COMPLETE ORDER
                  </button>
                  
                
                  
                  
                </div>
                <div>
                    
                  </div>
                <p className='text-red-700 font-semibold py-2'>*Contact us to cancel your order</p>
              </div>
            </div>
          </div>
        {/* )}
      </Popup> */}
    </div>
  );
}
