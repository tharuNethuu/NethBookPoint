import React from 'react'
import Bannercard from '../home/Bannercard'
import '../components/Banner.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';



function Banner() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
const [alertVariant, setAlertVariant] = useState('success');
const [alertVisible, setAlertVisible] = useState(false);


  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nethbookpoint.onrender.com/searchBook?name=${searchTerm}`);
      const data = await response.json();

      if (data.book) {
        // If book is found, navigate to the book details page
        navigate(`/book/${data.book._id}`);
      } else {
        // If book is not found, show an alert
      setAlertMessage("Sorry, we couldn't find the book you're looking for.");
      setAlertVariant("warning");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };
  return (
    <div className='px-4 lg:px-24 bg-black flex items-center text-center'>
      <video className='absolute inset-0 w-full h-full object-cover' autoPlay muted loop>
        <source src="home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40 relative z-10'>
   {/*Leftside*/}
   <div className='w-full space-y-7 h-full'>
    <h3 className='bannerheading'>The Book Lover's Dreamland Awaits!</h3>
    <p className=' bannerp' style={{textAlign: 'center', color: 'white', fontSize: 17, fontFamily: 'Bona Nova', fontWeight: '200', letterSpacing: 0.40, maxWidth: '80%', margin: '0 auto'}}>Welcome to the ultimate book lover's paradise! Join our community and contribute to the ever-evolving library of stories, where every book has a chance to inspire someone new.</p>
    <div>
    <input
    type="search"
    name="search"
    placeholder='Search a Book'
    className='inputfield hover:bg-white'
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>  <button className=' text-white  hover:bg-yellow-500
        transition-all ease-in duration-200' style={{width: 139, height: 40, background: '#4B330B', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5,fontFamily: 'Bona Nova',letterSpacing: 0.50}}
        onClick={handleSearch} >Search</button>
        
    </div>
    <div className='flex justify-center items-center'>
    {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
    </div>
    
   </div>
   </div>
   </div> 
  )
}

export default Banner
