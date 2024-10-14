import React, { useRef, useState } from 'react'
import "./Contacts.scss"
import {motion, useInView} from "framer-motion"
import emailjs from '@emailjs/browser';




const variants={
    initial:{
        opacity:0,
        y:500,
    },
    animate:{
        opacity:1,
        y:0,
        transition:{duration:1, staggerChildren:0.1},
    },
    
}

const Contacts = () =>{
  
    const ref = useRef()
    const formRef = useRef()
    const[error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const isInView = useInView(ref, {margin:"-100px"});
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_0ac59ob', 'template_wbnv42a', formRef.current, {
            publicKey: 'otv80y8MbdrqMSefS',
          })
          .then(
            (result) => {
              setSuccess(true)
            },
            (error) => {
setError(true)            },
          );
      };
  
  
    return (
    <div ref={ref} className='contact' >
<div className='textContainer'>
    <h1  className='mt-10' style={{ fontFamily: 'Bona Nova', fontSize:'30px', lineHeight:'40px', fontWeight:'bold', color:'#CC9600'}}>We'd Love to Hear from You!</h1>
    <div className='item' variants={variants}>
        <h2 className='text-yellow-700' style={{ fontFamily: 'Bona Nova', fontSize:'20px',fontWeight:'bold'}}>Mail</h2>
        <span className='text-black' style={{ fontFamily: 'Bona Nova', fontSize:'16px',fontWeight:'bold'}}>tharu0nethu@gmail.com</span>
    </div>
    <div className='item' variants={variants}>
        <h2 className='text-yellow-700' style={{ fontFamily: 'Bona Nova', fontSize:'20px',fontWeight:'bold'}}>Address</h2>
        <span className='text-black' style={{ fontFamily: 'Bona Nova', fontSize:'16px',fontWeight:'bold'}}>No68, Delgolla Watta B, Mawathagama</span>
    </div>
    <div className='item'variants={variants}>
        <h2 className='text-yellow-700' style={{ fontFamily: 'Bona Nova', fontSize:'20px',fontWeight:'bold'}}>Phone</h2>
        <span className='text-black' style={{ fontFamily: 'Bona Nova', fontSize:'16px',fontWeight:'bold'}}>+94766020225</span>
    </div>
</div>
<div className="formContainer">

    <form
    ref={formRef}
    onSubmit={sendEmail}
     >
    <input type="text" placeholder="Name" required name="name"  style={{ fontFamily: 'Bona Nova'}} />
    <input type="email" placeholder="Email" required name="email" style={{ fontFamily: 'Bona Nova'}}/>
    <textarea placeholder="Message" required rows={4} name="message" style={{ fontFamily: 'Bona Nova'}}></textarea>
    <button type='Submit' className=' text-black   font-medium px-3 rounded hover:bg-yellow-500 hover:font-semibold hover:text-white transition-all duration-300 md:mb-5 h-10' style={{borderRadius: 10, border: '2px #CC9600 solid', fontFamily: 'Bona Nova'}}> Send</button>
    {error && (
                        <div style={{ fontFamily: 'Bona Nova', backgroundColor: 'red', color: 'white', fontWeight: 'bold', padding: '10px', marginTop: '10px' }}>
                            Oops! Something went wrong with sending your email. Please try again.
                        </div>
                    )}
                    {success && (
                        <div style={{fontFamily: 'Bona Nova',  backgroundColor: '#93EE7C', color: 'black', fontWeight: 'bold', padding: '10px', marginTop: '10px' }}>
                            Your message has been sent successfully! Thank you for reaching out to us.
                        </div>
                    )}

    </form>
</div>

    </div>
  )
}

export default Contacts
