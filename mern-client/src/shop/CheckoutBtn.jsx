import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AuthContext } from '../contects/AuthProvider';
import Alert from '../components/Alert';
import { FaUser, FaAddressBook, FaMapMarkerAlt, FaPhone, FaCreditCard } from 'react-icons/fa';


export default function CheckoutBtn({ wishListBooks, copies, totalPrice }) {
  const [receiverName, setReceiverName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [sendingAddress, setSendingAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [province, setProvince] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);

  const { user } = useContext(AuthContext);


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

 
  
 

  const handlePayNow = async () => {
    if (!receiverName || !billingAddress || !sendingAddress || !contactNumber || !cardNumber) {
      alert("Please fill out all the fields.");
      return;
    }

    if (window.confirm("Are you sure you want to order?")) {
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
      setCardNumber('');
      setProvince('');

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
      <Popup trigger={<button className=' text-gray-900 h-8 px-7 rounded-lg hover:bg-yellow-500 hover:font-semibold hover:text-black transition-all duration-300 md:mb-1' style={{ fontFamily: 'Bona Nova', fontSize:'16px', fontWeight:'bold',borderColor:'#CC9600', border:'1px solid #CC9600'}}> Proceed to Checkout </button>} modal nested>
        {close => (
          <div className='modal rounded-2xl '>
            <div className='mt-20 rounded-2xl bg-white  overflow-y-auto max-h-[80vh]'>
              <div className=' bg-white w-full px-5 rounded-2xl'>
                <h3 className=' font-semibold text-2xl text-yellow-400 text-center py-5' style={{ fontFamily: 'Bona Nova'}}>Checkout Details</h3>
                {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4' style={{ fontFamily: 'Bona Nova'}}>
                  <div className=' p-2 rounded-4xl shadow shadow-yellow-800 hover:shadow-yellow-500'>
                  <div className='flex items-center p-2 rounded-4xl shadow shadow-yellow-800 hover:shadow-yellow-500'>
                  <FaUser className='text-black mr-2' />
                    <label className='block text-black mb-1'>  Receiver Name</label>
                    </div>
                    <input
                      type="text"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="p-1 border rounded w-full mb-1"
                      placeholder="Receiver Name"
                    />
                  </div>
                  <div className='shadow p-2 rounded  shadow-yellow-800 hover:shadow-yellow-500'>
                  <div className='flex items-center p-2 rounded-4xl shadow shadow-yellow-800 hover:shadow-yellow-500'>
                  <FaAddressBook className='text-black mr-2' />
                    <label className='block text-black mb-1'>Billing Address</label>
                    </div>
                    <input
                      type="text"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      className="p-1 border rounded w-full mb-1"
                      placeholder="Billing Address"
                    />
                  </div>
                  <div className='shadow p-2 rounded  shadow-yellow-800 hover:shadow-yellow-500'>
                  <div className='flex items-center p-2 rounded-4xl shadow shadow-yellow-800 hover:shadow-yellow-500'>
                  <FaMapMarkerAlt className='text-black mr-2' />
                    <label className='block text-black mb-1'>Sending Address</label>
                    </div>                    <input
                      type="text"
                      value={sendingAddress}
                      onChange={(e) => setSendingAddress(e.target.value)}
                      className="p-1 border rounded w-full mb-1"
                      placeholder="Sending Address"
                    />
                  </div>
                  <div className='shadow p-2 rounded  shadow-yellow-800 hover:shadow-yellow-500'>
                  <div className='flex items-center p-2 rounded-4xl shadow shadow-yellow-800 hover:shadow-yellow-500'>
                  <FaMapMarkerAlt className='text-black mr-2' />
                    <label className='block text-black mb-1'>Province</label>
                    </div>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="p-1 border rounded w-full mb-1"
                    >
                      <option value="">Select Province</option>
                      {provinces.map((prov, index) => (
                        <option key={index} value={prov}>{prov}</option>
                      ))}
                    </select>
                  </div>
                  <div className='shadow p-2 rounded shadow-yellow-800 hover:shadow-yellow-500'>
                  <div className='flex items-center p-2 rounded-4xl shadow shadow-yellow-800 hover:shadow-yellow-500'>
                  <FaPhone  className='text-black mr-2' />
                    <label className='block text-black mb-1'>Contact Number</label>
                    </div>                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="p-1 border rounded w-full mb-1"
                      placeholder="Contact Number"
                    />
                  </div>
                  <div className='shadow p-2 rounded  shadow-yellow-800 hover:shadow-yellow-500'>
                  <div className='flex items-center p-2 rounded-4xl shadow shadow-yellow-800 hover:shadow-yellow-500'>
                  <FaCreditCard  className='text-black mr-2' />
                    <label className='block text-black mb-1'>Card Number</label>
                    </div>                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="p-1 border rounded w-full mb-1"
                      placeholder="Card Number"
                    />
                  </div>
                  <button
                    onClick={handlePayNow}
                    className="text-black font-semibold  bg-yellow-500 rounded-full hover:bg-red-500 transition-all duration-300 py-2"
                  >
                    PAY NOW
                  </button>
                  <button
                    onClick={() => close()}
                    className="text-black font-semibold bg-yellow-500 rounded-full hover:bg-red-500 transition-all duration-300 py-2"
                  >
                    Close Checkout Page
                  </button>
                </div>
                <p className='text-red-700 font-semibold py-2'>*Contact us to cancel your order</p>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
