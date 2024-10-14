import { useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import MyFooter from './components/MyFooter'
import LoadingComponent from './LoadingComponent'



function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate 3 seconds loading time
  }, []);

  return (
    
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div> <Navbar/>
        <Outlet/>
        <MyFooter/></div>
      )}
    </div>
   
   
  )
}

export default App
