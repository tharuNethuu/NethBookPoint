import React from 'react'
import { Footer } from "flowbite-react";
const Blogo = 'https://i.pinimg.com/564x/23/5d/b0/235db0edbdfc5536cd27598149a41af4.jpg'; 

import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const MyFooter = () => {
  return (
    <Footer container>
      <div className="w-full  py-5 px-20 bg-black">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
        <img src={Blogo}  className='  w-40 ' />
        
      

          
        </div>
        <Footer.Divider />
        <div className=" text-yellow-600 w-full sm:flex sm:items-center sm:justify-between" style={{ fontFamily: 'Bona Nova'}}>
          <Footer.Copyright href="#" by=" | Neth BookPoint" year={2024} />
          <p className='text-yellow-300 text-center'>Visit our branches in Galle, Kurunegala, Kandy, and Colombo, and register for our online platform to enjoy maximum benefits!</p>

          <div className=" py-5  mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://web.facebook.com" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/" icon={BsInstagram} />
            <Footer.Icon href="https://x.com" icon={BsTwitter} />
            <Footer.Icon href="https://github.com" icon={BsGithub} />
            <Footer.Icon href="https://dribbble.com/tags/login" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default MyFooter

