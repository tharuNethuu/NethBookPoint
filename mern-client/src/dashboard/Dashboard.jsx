import React, { useEffect, useState } from 'react';
import BarGraph from './BarGraph';


const Dashboard = () => {
  const [booksCount, setBooksCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [nonCompletedOrders, setNonCompletedOrders] = useState([]);
  
  const fetchData = async () => {
    try {
      // Fetch books data
      const booksResponse = await fetch('http://localhost:5000/all-books');
      if (!booksResponse.ok) {
        throw new Error('Books network response was not ok');
      }
      const booksData = await booksResponse.json();
      console.log('Books data:', booksData);

      // Fetch orders data
      const ordersResponse = await fetch('http://localhost:5000/orders');
      if (!ordersResponse.ok) {
        throw new Error('Orders network response was not ok');
      }
      const ordersData = await ordersResponse.json();
      console.log('Orders data:', ordersData);

      // Setting state with fetched data
      setBooksCount(booksData.length);
      setOrdersCount(ordersData.length);
      setCompletedOrders(ordersData.filter(order => order.status === 'Yes'));
      setNonCompletedOrders(ordersData.filter(order => order.status === 'No'));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTotalPrice = (orders) => {
    return orders.reduce((sum, order) => sum + order.totalPrice, 0);
  };

  return (
<div className='mx-4 sm:mx-10 md:mx-20 lg:mx-80 my-12'>
        <h1 className='text-3xl text-yellow-800 font-bold  py-8'>Dashboard</h1>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8'>
        <div className='bg-white shadow-sm shadow-yellow-600 rounded p-4 hover:shadow-lg hover:shadow-yellow-600'>
          <h2 className='text-xl font-bold text-yellow-600'>Date:</h2>
          <p className='my-2 text-xl'>{new Date().toLocaleDateString()}</p>
        </div>
        <div className='bg-white shadow-sm shadow-yellow-600 rounded p-4 hover:shadow-lg hover:shadow-yellow-600'>
          <h2 className='text-xl font-bold text-yellow-600'>Total Number of Books:</h2>
          <p className='my-2 text-xl'>{booksCount}</p>
        </div>
        <div className='bg-white shadow-sm shadow-yellow-600  rounded p-4 hover:shadow-lg hover:shadow-yellow-600' >
          <h2 className='text-xl font-bold text-yellow-600'>Total Number of Orders:</h2>
          <p className='my-2 text-xl'>{ordersCount}</p>
        </div>
        <div className='bg-white shadow-sm shadow-yellow-600 rounded p-4 hover:shadow-lg hover:shadow-yellow-600'>
          <h2 className='text-xl font-bold text-yellow-600'>Completed Orders:</h2>
          <p className='my-2 text-xl'>{completedOrders.length}</p>
          <p className='text-xl'>Total Price: Rs. {getTotalPrice(completedOrders).toFixed(2)}</p>
        </div>
        <div className='bg-white shadow-sm shadow-yellow-600  rounded p-4 hover:shadow-lg hover:shadow-yellow-600'>
          <h2 className='my-2 text-xl font-bold text-yellow-600'>Non-Completed Orders:</h2>
          <p className='text-xl'>{nonCompletedOrders.length}</p>
          <p className='my-2 text-xl'>Total Price: Rs. {getTotalPrice(nonCompletedOrders).toFixed(2)}</p>
        </div>
        <BarGraph
      completedOrdersCount={completedOrders.length}
      nonCompletedOrdersCount={nonCompletedOrders.length}
      totalOrders={ordersCount}
      />
      </div>
     
    </div>
  );
};

export default Dashboard
