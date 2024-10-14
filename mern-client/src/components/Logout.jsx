import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contects/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import Contacts from './Contacts/Contacts';


const Logout = () => {
    const {logOut} = useContext(AuthContext);
    const location = useLocation();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);})
   const from = location.state?.from?.pathname || '/'
    const handleLogout = () => {
        logOut().then(() => {
         

            // Sign-out successful.
            setAlertMessage("You have been Logged Out Successfully!");
      setAlertVariant("warning");
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigate(from, { replace: true });
      }, 3000);
    }).catch((error) => {
            // An error happened.
          });
    }
  return (

    <section className="relative flex flex-wrap lg:h-full lg:items-center bg-white">
      <div className="w-full px-4  sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-4">

<div>

  <img src='https://i.imgur.com/qlSzsMc.png'
  className='fixed my-20 top-1 left-1/6 transform -translate-x-[calc(-30%+68px)] -translate-y-[calc(-75%+500px)] '
  style={{
    transition: 'none',
    transform: 'none',
  width: '45%', height: 'auto', zIndex: 10 }}
  />
     
      
    </div>

    
    </div>
    
    <div className="h-full px-4 py-40 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-40 ">
    {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
    <p className='text-xl text-left font-bold py-10' style={{ fontFamily: 'Bona Nova'}}>Are you sure you want to log out? <br></br>📚 Without your books, your world will be a bit blind. Ready to close this chapter and leave your stories behind?</p>
    
    
    <div className='  text-center '>
      <button className=' text-black  px-10 py-1 rounded hover:bg-yellow-500 hover:font-semibold transition-all duration-300 md:mb-5 font-semibold hover:text-white' onClick={handleLogout}  style={{borderRadius: 8, border: '1px #CC9600 solid', fontFamily: 'Bona Nova'}}>LOG OUT</button>   

      </div>
    
      <Contacts/>
    </div>
    
    </section>
    
  )
}

export default Logout
