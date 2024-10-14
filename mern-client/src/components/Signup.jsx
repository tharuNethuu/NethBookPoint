import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AuthContext} from '../contects/AuthProvider'
import Alert from '../components/Alert';





const Signup = () => {
  const{createUser, loginwithGoogle} = useContext(AuthContext)
  const [error, serError] = useState("error");
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
   const from = location.state?.from?.pathname || '/'
  
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser( email, password).then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    setAlertMessage("Sign up Successfully!");
    setAlertVariant("success");
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      navigate(from, { replace: true });
    }, 3000);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    serError (errorMessage)
    // ..
  });


    
  }

   //sign up using google
   const handleRegister=() =>{
    loginwithGoogle().then((result) =>{
      const user = result.user;
      setAlertMessage("Sign up Successfully!");
      setAlertVariant("success");
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigate(from, { replace: true });
      }, 3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      serError (errorMessage)
      // ..
    });
   }

  return (
    
  
  <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-black">
     <div className="relative h-70 w-full sm:h-96 lg:h-full lg:w-1/2 bg-white">
      <img
        alt=""
        src="https://i.imgur.com/lSWKtCI.jpeg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transition: 'none',
          transform: 'none'
        }}
      />
    </div>
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-black">
        
      <div className="mx-auto max-w-lg text-center" style={{ fontFamily: 'Bona Nova'}}>
        {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
        <h1 className="text-2xl text-yellow-300 font-bold sm:text-4xl" style={{ fontFamily: 'Bona Nova'}}>Welcome to Neth BookPoint!</h1>
  
        <p className="mt-4 text-yellow-500">
        Discover a seamless way to sell your books and unlock exclusive benefits. Enjoy a hassle-free experience, save valuable time, and take advantage of our amazing offers.
        </p>
        <p className='text-yellow-500 font-semibold text-xl'>Sign Up Now & Join Our Community!</p>
      </div>
  
      <form onSubmit={handleSignUp} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
  
          <div className="relative" style={{ fontFamily: 'Bona Nova'}}>
            <input
            id="email"
            name="email"
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm bg-yellow-100 hover:bg-yellow-200"
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
            id="password"
            name="password"
              type="password"
              className="w-full rounded-lg bg-yellow-100 hover:bg-yellow-200 border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4" style={{ fontFamily: 'Bona Nova'}}>
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
  
        <div className="flex items-center justify-between" style={{ fontFamily: 'Bona Nova'}}>
          <p className="text-sm text-gray-50" >
Already have an account?<Link to='/login' className='text-yellow-400 hover:text-yellow-200'> Login here</Link>
<hr/>
  <div>
    <button onClick={handleRegister} className='block py-2 text-white font-light hover:text-yellow-400'><img src="https://static.vecteezy.com/system/resources/previews/021/496/096/original/google-symbol-logo-design-illustration-with-black-background-free-vector.jpg" className='w-10 inline-block px-1'/>Login with Google</button>
  </div> 
         
          </p>
  
          <button
            type="submit"
            className="inline-block rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  
   
  </section>
  )
}

export default Signup
