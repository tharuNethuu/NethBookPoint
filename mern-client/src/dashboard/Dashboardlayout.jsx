import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className={`fixed md:relative z-10 md:z-auto w-full md:w-auto ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
        <SideBar />
      </div>
      <div className='md:hidden flex justify-between items-center bg-yellow-950 text-white p-4'>
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <h1 className='text-lg font-bold'>Seller's Dashboard</h1>
      </div>
      <div className={`flex-1 overflow-y-auto mt-16 md:mt-0 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
