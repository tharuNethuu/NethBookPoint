import React, { useEffect } from 'react'
import BranchDetails from './BranchDetails'


const About =() => {

  useEffect(() => {
    window.scrollTo(0, 0);});

  return (
    <div className='px-4 lg:px-24 bg-black items-center '>
    <div className='flex w-full   justify-between items-center py-10' >

<div className=' space-y-5 h-full' style={{ fontFamily: 'Bona Nova'}}>
<img src= 'https://i.imgur.com/9YgNNAl.jpeg'         style={{ opacity: 0.7 }} className='hidden md:block'
/>

<h3 className='text-4xl font-bold text-yellow-500 py-5 flex flex-col lg:flex-row w-full'>About Us</h3>
<p className='md:w-5/ text-white'>Welcome to Neth BookPoint, your trusted source for a diverse range of books catering to every reader's taste. Established with the mission to foster a love for reading in our community, we pride ourselves on providing excellent service and a wide selection of books. Our journey began in 2021, and since then, we have grown to become a beloved destination for book lovers. Below, you'll find information about our four branches, their locations, and contact numbers.</p>
<h3 className='text-3xl font-bold text-yellow-500 py-5'>Our Branches</h3>

<BranchDetails/>
</div>
</div>
<div className='commitment' style={{ fontFamily: 'Bona Nova'}}>
<h3 className='text-3xl font-bold text-yellow-500 py-10 text-center'>Our Commitment
</h3>
<p className='md:w-5/ text-white font-light '>At Neth BookPoint, we are committed to providing a welcoming and inspiring environment for all book enthusiasts. Each of our branches is staffed with knowledgeable and friendly team members ready to assist you in finding the perfect book. Whether you're looking for the latest bestseller, a rare find, or a cozy place to read, Neth BookPoint is your destination.

We believe in the power of reading to transform lives and build community. Join us at one of our branches or explore our offerings online. We're here to support your reading journey and make your book shopping experience enjoyable and fulfilling.</p>


</div>

</div>


  )
}



export default About
