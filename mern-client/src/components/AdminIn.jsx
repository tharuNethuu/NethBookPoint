import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';


const AdminIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email === 'admin@bookpoint.com' && password === 'NethBookPoint2024AdminPw') {
        navigate('/admin/dashboard');
      } else {
        setAlertMessage("Invalid email or password");
        setAlertVariant("danger");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000);
      }
    };
  
    return (
      <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-black">
     
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-black">
         
       <div className="mx-auto max-w-lg text-center">
         <h1 className="text-2xl text-yellow-300 font-bold sm:text-4xl" style={{ fontFamily: 'Bona Nova'}}>Welcome, Seller Community of Neth BookPoint!</h1>
      
         <p className="mt-4 text-yellow-600" style={{ fontFamily: 'Bona Nova'}}>
         We're thrilled to have you as a part of our seller network. Your contributions are valued and essential to our success. Together, let's grow and thrive in this dynamic marketplace.

Login here to manage your listings, connect with buyers, and explore new opportunities.      
         </p>
         <p className='text-yellow-500 font-semibold text-xl' style={{ fontFamily: 'Bona Nova'}}>Login to Your Account!</p>
       </div>
      
       <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
         <div>
           <label htmlFor="email" className="sr-only" >Email</label>
      
           <div className="relative" style={{ fontFamily: 'Bona Nova'}}>
           <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-yellow-100 hover:bg-yellow-200 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  required
                  placeholder="Enter email"
      
                />
      
             <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="size-4 text-gray-400"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                 />
               </svg>
             </span>
           </div>
         </div>
      
         <div>
           <label htmlFor="password" className="sr-only">Password</label>
      
           <div className="relative" style={{ fontFamily: 'Bona Nova'}}>
           <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-yellow-100 hover:bg-yellow-200 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                     required
                     placeholder="Enter Password"
      
                />
      
             <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="size-4 text-gray-400"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                 />
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                 />
               </svg>
             </span>
           </div>
         </div>
      
      
         <div className="flex items-center justify-between">
         
          
           
      
           <button
             type="submit"
             className="inline-block rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-white"
             style={{ fontFamily: 'Bona Nova'}}
           >
      Login         </button>
      {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
         </div>
       </form>
      </div>

      <div className="relative h-70 w-full sm:h-96 lg:h-full lg:w-1/2" >
       <img
         alt=""
         src="https://i.imgur.com/XwzUtED.jpeg"
         className="absolute inset-0 h-full w-full object-cover"
         style={{
          transition: 'none',
          transform: 'none'
        }}
       />
      </div>
      
      
      </section>
      )
      }

export default AdminIn
