import React, { useEffect } from 'react'
import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { HiCreditCard, HiShoppingCart } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';






const AwardBooks = () => {   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/shop');}

  useEffect(() => {
    window.scrollTo(0, 30);
}, []);

  return (
    <div  className=' mt-20 px-20 bg-white flex flex-col items-center' style={{ fontFamily: 'Bona Nova'}}>
         <div className='bg-white py-2'>
      <h2 className='text-3xl text-center font-bold mt-20' style={{ fontFamily: 'Bona Nova',  color: '#CA891D'}}>Award-Winning Books at The State Literary Awards Ceremony 2022
      </h2>
      </div>
      <p className="text-gray-900 font-medium ">
      Explore our online store, add these remarkable titles to your collection, and enjoy the convenience of doorstep delivery. Immerse yourself in stories that captivated the nation's critics.
  </p>
  <div className='justify-between text-center  items-center'>
  <Button onClick={handleClick} className=' justify-between text-black font-semibold mt-5 rounded hover:bg-yellow-500 hover:font-semibold hover:text-white transition-all duration-300 md:mb-' style={{borderRadius: 10, border: '1px #CC9600 solid'}}>
        <HiShoppingCart className="mr-2 h-5 w-5   hover:bg-yellow-500 transition-all duration-300" />
        Secure your copy online now.    </Button>  

        </div>

   
<div className=' py-10 gap-10 px-20 flex w-full flex-col md:flex-row justify-between items-center '>
  

  
<Card
    className="  space-y-2 rounded-2xl py-5 px-10 max-w-sm hover:shadow-lg hover:shadow-gray-600"
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc="https://i.pinimg.com/564x/8b/6e/9b/8b6e9babc827111655a6da835ad22876.jpg"
  >
    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-black">
    Best Independent Sinhala Novel: Nakula Muni    </h5>
    <p className=" dark:text-gray-700">
    Author: Eric Ilayapparachchi
    </p>
    <p className=" dark:text-gray-700 font-medium">
Price: Rs. 1500/=    </p>
  
  </Card>
  <Card
    className="  rounded-2xl py-5 px-10 max-w-sm hover:shadow-lg hover:shadow-gray-600"
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc="https://i.pinimg.com/564x/20/13/c8/2013c8b8d49fdadb3ea18e21c40b9d28.jpg"
  >
    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-black">
    Best Independent English Novel: Footprints    </h5>
    <p className=" dark:text-gray-700">
    Author: Dr. Premani Amarasinghe
    </p>
    <p className=" dark:text-gray-700 font-medium">
Price: Rs. 2450/=    </p>
    
   
  </Card>


  <Card
    className="  rounded-2xl py-5 px-10 max-w-sm hover:shadow-lg hover:shadow-gray-600"
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc="https://i.pinimg.com/564x/5e/32/66/5e3266a96f64f837b1347425837a247c.jpg"
  >
    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-black">
    Best Independent Tamil Novel: Adurasalei    </h5>
    <p className=" dark:text-gray-700">
    Author: Sivalingam Aruran
    </p>
    <p className=" dark:text-gray-700 font-medium">
Price: Rs. 1800/=    </p>
    
   
  </Card>
</div>


<div className=' gap-10 px-20 flex w-full flex-col md:flex-row justify-between items-center'>
<Card
    className="  rounded-2xl py-5 px-10 max-w-sm hover:shadow-lg hover:shadow-gray-600 "
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc="https://i.pinimg.com/564x/b8/4d/a2/b84da2c7278aa43576eb721207a0f7b2.jpg"
  >
    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-black">
    Sahitya Ratna Lifetime Award for Sinhala: Vindithayo    </h5>
    <p className=" dark:text-gray-700">
    Author: Prof. Chandrasiri Palliyaguru
    </p>
    <p className=" dark:text-gray-700 font-medium">
Price: Rs. 1200/=    </p>
    
   
  </Card>
  <Card
    className="  rounded-2xl py-5 px-10  max-w-sm hover:shadow-lg hover:shadow-gray-600"
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc="https://i.pinimg.com/564x/d4/89/d7/d489d77f66ff7fe2601ead563eef411f.jpg"
  >
    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-black">
    Sahitya Ratna Lifetime Award for English: Petals in the Wind    </h5>
    <p className=" dark:text-gray-700">
    Author: Prof. Kamani Jayasekara
    </p>
    <p className=" dark:text-gray-700 font-medium">
Price: Rs. 1900/=    </p>
    
   
  </Card>


  <Card
    className="  rounded-2xl py-5 px-10 max-w-sm hover:shadow-lg hover:shadow-gray-600"
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc="https://i.pinimg.com/564x/d4/dd/47/d4dd47750f829c39dbbf27071a222044.jpg"
  >
    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-black">
    Sahitya Ratna Lifetime Award for Tamil: Pallu Llakkiya Thirattu    </h5>
    <p className=" dark:text-gray-700">
    Author: T. Gnanasekaran
    </p>
    <p className=" dark:text-gray-700 font-medium">
Price: Rs. 1500/=    </p>
    
  </Card>
</div>
<div className='justify-between text-center  items-center'>
  <Button onClick={handleClick} className=' justify-between text-black font-semibold mt-10 mb-20 rounded hover:bg-yellow-500 hover:font-semibold hover:text-white transition-all duration-300 md:mb-' style={{borderRadius: 10, border: '1px #CC9600 solid'}}>
        <HiShoppingCart className="mr-2 h-5 w-5   hover:bg-yellow-500 transition-all duration-300" />
        Secure your copy online now.    </Button>  

        </div>
</div>




    
  )
}

export default AwardBooks
