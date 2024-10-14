import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { HiBell, HiOutlineBell, HiOutlinePhone } from 'react-icons/hi';
import { AuthContext } from '../contects/AuthProvider';
import { useContext } from 'react';
import MyFooter from './MyFooter';
import Contacts from './Contacts/Contacts';

const NotificationPage = () => {
  const { email } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:5000/notifications/${email}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, [email]);
  const { user } = useContext(AuthContext);
  console.log(user);
  return (

    <div>
      <Navbar />
      <div className='mt-20 px-4 py-20 lg:px-24 bg-white'style={{ fontFamily: 'Bona Nova'}}>
        <h1 className='text-3xl font-semibold text-yellow-800 text-center py-5'>
          Notifications for {user.email}
        </h1>
        <ul className='py-10'>
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <li
                key={message._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  fontSize: '20px',
                  background: '#f9f9f9',
                  borderRadius: '10px',
                  marginBottom: '10px', // Add some margin between messages
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: add a slight shadow
                }}
              >
                <HiBell className='text-yellow-800 font-semibold' />
                <span style={{ flexGrow: 1, textAlign: 'left', marginLeft: '10px' }}>
                  {message.message}
                </span>
                <span style={{ flexShrink: 0, marginLeft: '20px', textAlign: 'right', color: '#999' }}>
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </li>
            ))
          ) : (
            <div className='text-center text-lg'>
  <li>No messages found.</li>
  <img
    src="https://i.imgur.com/eT4ED5A.png"
    className='h-70 mx-auto mt-5'
    alt="No messages"
  />
</div>

          )}
        </ul>
      </div>
      <div className='bg-black py-5 ' style={{ fontFamily: 'Bona Nova'}}>
        <p className='text-red-700 font-semibold text-center text-lg'>
          *Contact us to cancel your order
        </p>
        <p className='text-red-700 font-semibold text-center text-lg'>
          Hotline: +94 123456789
        </p>
      </div>
      <div className='bg-white py-20'><Contacts/></div>
      <div className='mt-20'><MyFooter/></div>
    </div>
    
    
  );
};

export default NotificationPage;