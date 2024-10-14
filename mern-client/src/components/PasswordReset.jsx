import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';

const PasswordReset = () => {
  const { sendPasswordResetEmail } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = (event) => {
    event.preventDefault();

    sendPasswordResetEmail(email).then(() => {
      alert('Password reset email sent successfully!');
      navigate('/login', { replace: true });
    })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-black">
      <div className="relative h-70 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="https://i.imgur.com/SIMCp2U.jpeg"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transition: 'none',
            transform: 'none'
          }}
        />
      </div>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-black">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl text-yellow-300 font-bold sm:text-4xl" style={{ fontFamily: 'Bona Nova' }}>Reset Password</h1>

          <p className="mt-4 text-yellow-600" style={{ fontFamily: 'Bona Nova' }}>
            Enter your email address to reset your password.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only" style={{ fontFamily: 'Bona Nova' }}>Email</label>

            <div className="relative" style={{ fontFamily: 'Bona Nova' }}>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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

          {error ? <p className='text-red-600' style={{ fontFamily: 'Bona Nova' }}>{error}</p> : ""}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500" style={{ fontFamily: 'Bona Nova' }}>
              <Link to='/login' className='text-yellow-700 hover:text-yellow-200'>Back to Login</Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-white" style={{ fontFamily: 'Bona Nova' }}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>

    </section>
  )
}

export default PasswordReset