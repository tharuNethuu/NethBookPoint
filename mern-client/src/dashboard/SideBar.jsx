import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiCloudUpload, HiDesktopComputer, HiShoppingBag, HiUser, HiArrowSmLeft, HiArrowSmRight, HiPhone, HiHome, HiTruck } from 'react-icons/hi';
import { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';

export const SideBar = () => {
  const {user} = useContext(AuthContext)
  return (
    <Sidebar className='bg-black fixed h-full'>
      <div className = ' flex flex-col items-center text-yellow-500 px-5 py-5'><p>Profile of :</p>
{user? user.email  : ""}
</div>
      <Sidebar.Logo className='flex justify-center mb-4'>
        <img src="https://i.pinimg.com/564x/23/5d/b0/235db0edbdfc5536cd27598149a41af4.jpg" alt="Flowbite logo" />
      </Sidebar.Logo>
      <Sidebar.Items className='bg-black px-5'>
        <Sidebar.ItemGroup className='space-y-1'>
          <Sidebar.Item href="/admin/dashboard/" icon={HiChartPie} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/upload" icon={HiCloudUpload} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
            Upload Book
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={HiDesktopComputer} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
            Manage Book
          </Sidebar.Item>
          <Sidebar.Item href="https://console.firebase.google.com/project/neth-bookpoint/authentication/users?pli=1" icon={HiUser} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/orders" icon={HiShoppingBag} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
            Orders
          </Sidebar.Item>
          
          <Sidebar.Item href="/logout" icon={HiArrowSmLeft} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
            Log Out
          </Sidebar.Item>
          <Sidebar.Item href="/ordersdelivery" icon={HiTruck} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
          Delivery Status          </Sidebar.Item>
          <Sidebar.Item href="/" icon={HiHome} className='text-yellow-200 hover:text-yellow-400 text-left flex justify-start items-center gap-2'>
            Back to Home
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
