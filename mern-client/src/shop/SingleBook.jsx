import {useLoaderData, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FaBook, FaBookAtlas, FaBookBookmark, FaBookJournalWhills, FaBookOpen, FaBookOpenReader, FaCartShopping, FaCashRegister, FaCreditCard, FaDollarSign, FaMoneyBill, FaMoneyBill1, FaMoneyCheckDollar, FaStar, FaTag, FaTags } from 'react-icons/fa6'
import { Button } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";




const SingleBook =() => {  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/shop');}
    const {_id, bookTitle, offerImage,authorName,bookDescription,category,EnglishDes,SinhalaDes } = useLoaderData();

    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  const [isSinhala, setIsSinhala] = useState(false);

  return (
    <div className=' flex items-start h-full bg-white ' style={{ fontFamily: 'Bona Nova'}}>
  <img
        
        src={offerImage}
        alt="Book Image"
        className='fixed my-20 top-1/2 left-1/6 transform -translate-x-[calc(-30%+68px)] -translate-y-[calc(-5%+175px)] '
        style={{ width: '45%', height: 'auto', zIndex: 10 }}
      />

        <div className='flex w-full flex-col  md:flex-row justify-between items-start'>
          
   {/*Leftside*/}
   <div className='md:w-1/3 py-40 px-2 lg:px-0 bg-black flex items-start h-50 md:h-80 lg:h-[1000px]  '>
   <div className=' px-20 lg:px-30 fixed'>
            
            <h2 className='text-white text-2xl font-semibold ' >{bookTitle}</h2>
            <h1 className='text-yellow-100 text-xl font-medium mb-20 '>{authorName}</h1>
          </div>
    </div>
    {/*Rightside*/}
    
   <div className='  px-2 lg:px-20 md:w-1/2 h-full space-y-6  bg-white  '>
   
   <div className='flex items-center  mt-60 '>
      <FaBookOpen className='w-4 h-4 text-yellow-300 mr-2' />
      <p className='text-black font-semibold text-lg  '>Category: {category}</p>
    </div>
   <p className='text-black  py-2 '>{bookDescription}</p> 
   

   <div className='flex flex-col items-start'>
      <div className='flex items-center mb-1'>
        <FaMoneyCheckDollar className='h-10 w-5 text-yellow-400 mr-2' />
        <p className='text-yellow-400 font-serif text-xl'>Rs.700 /=</p>
      </div>
      <p className='text-yellow-600 text-xs italic leading-tight'>
        *Offer Ends December 31, 2024
      </p>
    </div>


     <div className='flex items justify-between'>
     <div className='flex items-center'>
    
                        <div className='py-5  ' >
                        <Button
                        onClick={handleClick}
                        className=' text-black font-semibold px-3 rounded hover:bg-yellow-500 hover:font-semibold hover:text-white transition-all duration-300 md:mb-' style={{borderRadius: 10, border: '1px #CC9600 solid'}}>
        <HiShoppingCart className="mr-2 h-5 w-5   hover:bg-yellow-500 transition-all duration-300" />
        Secure your copy online now.    </Button>  
      
    </div>

    


       </div>  
       
      
      
     </div>
       
       
          
     <div className='flex flex-col items-start mt-6'>
  <div className='flex items-center mb-4'>
    <h3 className='text-xl font-semibold text-black'>About This Book</h3>
    <Button
      onClick={() => setIsSinhala(!isSinhala)}
      className='ml-40 text-black font-semibold px-3 text-center  rounded hover:bg-yellow-500 hover:text-white transition-all duration-300'
      style={{ borderRadius: 10, border: '1px #CC9600 solid' }}
    >
      {isSinhala ? 'Translate to English' : 'Translate to Sinhala'}
    </Button>
  </div>
  <p className='text-black py-2'>
    {isSinhala ? (SinhalaDes || 'පරිවර්තන සපයා නැත.') : (EnglishDes || 'Translations are not provided.')}
  </p>
</div>

      

    </div>
   </div>
 

   
   
   
   </div>

    
  )
}

export default SingleBook
