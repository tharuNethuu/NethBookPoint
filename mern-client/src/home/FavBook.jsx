import React from 'react'
import { Link } from 'react-router-dom'; 
import FavBookcard from './FavBookcard';


const FavBook = () => {
  return (
    <div className='bg-black px-4 lg:px-24  text-white flex flex-col md:flex-row justify-between items-center gap-12 md:py-5' style={{ fontFamily: 'Bona Nova'}}>
        <div className='md:w-1/2  '>

        <div className=' space-y-7 mt-20 h-full hidden md:block'><FavBookcard/></div>
           
        </div>

<div className='md:w-1/2 space-y-6 '>
    <h2 className='text-5xl text-white font-bold  wd:3/4 leading-snug ' style={{ fontFamily: 'Bona Nova'}}>Your favourite
    <span className='subtext' style={{color: '#CA891D'}}> Reads Are Here!</span></h2>
    <p className='  md:w-5/6'>Buy your favorite books online with ease! Enjoy exclusive offers and discounts on selected titles. Dive into our collection and find special deals that make reading more affordable. Shop now and unlock more savings with every purchase!</p>

{/*stats*/}
<div className=' flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 '  style={{color: '#CA891D'}}>
    <div >
        <h3 className='text-3xl font-bold '>800+</h3>
        <p className='text-base '>Book Listing</p>

    </div>
    <div >
        <h3 className='text-3xl font-bold '>1K+</h3>
        <p className='text-base'>Registered Members</p>

    </div>
    <div >
        <h3 className='text-3xl font-bold '>50+</h3>
        <p className='text-base'>Branch Count</p>

    </div>
    </div>

    <Link to="/shop" className='mt-8 block'><button className=' text-white  px-5 py-2 rounded hover:bg-yellow-500 hover:font-semibold transition-all duration-300 md:mb-5' style={{borderRadius: 10, border: '1px #CC9600 solid'}}>
        Explore More</button></Link>

</div>
    </div>
  )
}

export default FavBook
