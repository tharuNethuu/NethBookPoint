import React from 'react'
import { Link } from 'react-router-dom';


const PromoBanner = () => {
  return (
    <div className=' py-12  px-4 lg:px-24' style={{ fontFamily: 'Bona Nova'}}>
      <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2  '>
        <h2 className='text-4xl font-bold mb-6 leading-snug'>Award-Winning Books at 

<span className='text-yellow-700'> The State Literary Awards Ceremony 2022,</span>  Sri Lanka </h2>
<p className='text-black font-medium'>Explore the celebrated books and authors from The State Literary Awards Ceremony 2022, Sri Lanka. Grab your copy from any of our branches with exclusive discounts. Dive into valuable reads with us! </p>
<p className=' text-yellow-500 text-xs'>*Discount conditions apply.</p>

        <Link to="/AwardBooks" className='mt-8 block'><button className=' text-black font-medium px-5 py-2 rounded hover:bg-yellow-500 hover:font-semibold hover:text-white transition-all duration-300 md:mb-5' style={{borderRadius: 10, border: '2px #CC9600 solid'}}>
        Explore More</button></Link>
      </div>
      <div>
       <img className='h-96' src="https://srilankamirror.com/wp-content/uploads/2022/10/State_Literary_Awards_1200px_22_10_28-1000x600.jpg"></img>
      </div>
      </div>
    </div>
  )
}

export default PromoBanner

