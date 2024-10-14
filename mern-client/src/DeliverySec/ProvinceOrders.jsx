import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../components/logo-removebg14.png'; // Ensure the path is correct
import ConfirmOrder from './ConfirmOrder';
import SortingPage from './SortingPage';
import MyFooter from '../components/MyFooter';
import Alert from '../components/Alert';




const ProvinceOrders = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);
    const { province } = useParams();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [selectedProvince, setSelectedProvince] = useState(province || '');
    const [provinces] = useState([
        'Central',
        'Eastern',
        'Northern',
        'North-Western',
        'North-Central',
        'Southern',
        'Western',
        'Sabaragamuwa',
        'Uva'
    ]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let url = 'http://localhost:5000/ordersdelivery?status=Yes';
                if (selectedProvince) {
                    url += `&province=${selectedProvince.replace(/ /g, '-')}`;
                }
                const response = await fetch(url);
                console.log('Fetching URL:', url);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setOrders(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [selectedProvince]);

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
    };

    const handleUpdateDeliveryStatus = async (orderId, delivered) => {
        try {
            const response = await fetch(`http://localhost:5000/ordersdelivery/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ delivered }),
            });

            if (response.ok) {
                console.log('Order delivery status updated successfully');
                // Optionally, you can fetch orders again to refresh the list after update
                // fetchOrders();
                setAlertMessage("Delivery status updated");
      setAlertVariant("success");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000); 
            } else {
                console.error('Failed to update order delivery status');
            }
        } catch (error) {
            console.error('Error updating delivery status:', error);
        }
    };

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (orders.length === 0) {
        return <div className="orders-page py-20" >

          
          <header className='w-full bg-image fixed top-0 left-0 right-0 transition-all ease-in duration-300 py-3'>
                <div className='flex justify-between items-center text-base gap-8'>
                    <Link to="/" className='flex items-center gap-0 w-40'>
                        <img src={logo} alt="Brand Logo" className='space-x-50 navbar-brand-img w-40 md:w-3/4' />
                        <span className='text-2xl font-bold text-yellow-500 flex items-center gap-10'>NETH BOOKPOINT</span>
                    </Link>
                    <ul className='md:flex px-10 hidden text-yellow-400 font-semibold text-3xl '>
                    Delivery Crew Dashboard
                    </ul>
                    

                </div>
        </header>

        <div>
        <div className='bg-black py-20'>
                    <h1 className='text-yellow-500 py-5 px-20 font-medium text-2xl'>Welcome to the Delivery Team!</h1>
                    <p className='text-white py-5 px-20'>We are thrilled to have you as part of our delivery network! Here are some important instructions to ensure a smooth and efficient delivery process:
                    <br /> <br />
                    <ol class="bp4-list">
                    <li>
                   <h2 className='text-lg'> 1. Check Your Assigned Orders:</h2>
                    <ul class="bp4-list text-yellow-100 font-thin"> 
                        <li>Review the list of orders assigned to you.</li> 
                        <li>Ensure you have all the necessary details for each delivery, including the receiver's name, address, and contact number.</li>     
                    </ul> 
                    </li>
                    <li><br/>
                    <h2  className='text-lg'>2. Update Delivery Status:</h2>
                    
                    <ul class="bp4-list text-yellow-100 font-thin"> 
                        <li>Mark orders as "Delivered" once you have successfully completed the delivery.</li> 
                        <li>If there are any issues or delays, update the status accordingly and notify your supervisor immediately.</li>     
                    </ul> 
                    </li>
                    <li><br/><h2 className='text-lg'> 3. Stay Organized:</h2>
                   
                    <ul class=" text-yellow-100 font-thin"> 
                        <li>Keep your delivery schedule and routes organized to optimize your delivery time and efficiency.</li> 
                        <li>Use the tools and resources available on the dashboard to assist you in managing your deliveries.</li>     
                    </ul> 
                    </li>
                    </ol>
                    
</p>
                  </div>

        <h1 className="text-4xl  px-20 font-bold py-10 ">Ready for Dispatch: <span className='text-yellow-800'>Orders Pending Delivery</span></h1>
    <div className="mb-4 py-5  px-20">
   
      <label htmlFor="province" className="mr-2 font-semibold text-lg">Select Province:</label>
      <select id="province" value={selectedProvince} onChange={handleProvinceChange} className="border p-2 px-2 rounded-full bg-yellow-900 text-white font-semibold text-center">
        <option value="">All Provinces</option>
        {provinces.map((province) => (
          <option key={province} value={province}>{province}</option>
        ))}
      </select>
    </div>
          
        </div>
        
        
        <div className=' px-20'>
        No completed orders found for this province.
      <SortingPage/>

        </div>
        
        </div>;
    }

    return (
        <div>
            <header className='w-full bg-image fixed top-0 left-0 right-0 transition-all ease-in duration-300 py-3'>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/*logo*/}
                    <Link to="/" className='flex items-center gap-0 w-40'>
                        <img src={logo} alt="Brand Logo" className='space-x-50 navbar-brand-img w-40 md:w-3/4' />
                        <span className='text-2xl font-bold text-yellow-500 flex items-center gap-10'>NETH BOOKPOINT</span>
                    </Link>
                    {/*nav item for large device*/}
                    <ul className='md:flex px-10 hidden text-yellow-400 font-semibold text-3xl '>
                        Delivery Crew Dashboard
                    </ul>
                </div>
            </header>
          
            <div className="orders-page py-20 ">
                <div className='py-5'>
                  <div className='bg-black py-20'>
                    <h1 className='text-yellow-400 py-5 px-20 font-medium text-2xl'>Welcome to the Delivery Team!</h1>
                    <p className='text-white py-5 px-20'>We are thrilled to have you as part of our delivery network! Here are some important instructions to ensure a smooth and efficient delivery process:
                    <br /> <br />
                    <ol class="bp4-list">
                    <li>
                   <h2 className='text-lg'> 1. Check Your Assigned Orders:</h2>
                    <ul class="bp4-list text-yellow-100 font-thin"> 
                        <li>Review the list of orders assigned to you.</li> 
                        <li>Ensure you have all the necessary details for each delivery, including the receiver's name, address, and contact number.</li>     
                    </ul> 
                    </li>
                    <li><br/>
                    <h2  className='text-lg'>2. Update Delivery Status:</h2>
                    
                    <ul class="bp4-list text-yellow-100 font-thin"> 
                        <li>Mark orders as "Delivered" once you have successfully completed the delivery.</li> 
                        <li>If there are any issues or delays, update the status accordingly and notify your supervisor immediately.</li>     
                    </ul> 
                    </li>
                    <li><br/><h2 className='text-lg'> 3. Stay Organized</h2>
                   
                    <ul class=" text-yellow-100 font-thin"> 
                        <li>Keep your delivery schedule and routes organized to optimize your delivery time and efficiency.</li> 
                        <li>Use the tools and resources available on the dashboard to assist you in managing your deliveries.</li>     
                    </ul> 
                    </li>
                    </ol>
                    
</p>
                  </div>
                
                    <h1 className="text-4xl font-bold px-20 py-10" >Ready for Dispatch: <span className='text-yellow-800'>Orders Pending Delivery</span></h1>
                    <div className="mb-4 py-5 px-20">
                        <label htmlFor="province" className="mr-2 font-semibold text-lg">Select Province:</label>
                        <select id="province" value={selectedProvince} onChange={handleProvinceChange} className="border p-2 px-2 rounded-full bg-yellow-900 text-white font-semibold text-center">
                            <option value="">All Provinces</option>
                            {provinces.map((province) => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>
                    <div className="order-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-20 ">
                        {orders.map(order => (
                            <div key={order._id} className="order-card border p-4 rounded shadow-2xl bg-yellow-200 shadow-gray-600 hover:shadow-2xl hover:shadow-gray-800 hover:bg-white">
                                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                                <p><strong>Receiver Name:</strong> {order.receiverName}</p>
                                <p><strong>Billing Address:</strong> {order.billingAddress}</p>
                                <p><strong>Sending Address:</strong> {order.sendingAddress}</p>
                                <p><strong>Province:</strong> {order.province}</p>
                                <p><strong>Contact Number:</strong> {order.contactNumber}</p>
                                <p><strong>Total Price:</strong> Rs. {order.totalPrice.toFixed(2)}</p>
                                <p><strong>Assigned Person:</strong>{order.assignedPerson}</p>

                                <h3 className="text-lg font-semibold">Books:</h3>
                                <ul>
                                    {order.books.map((book, index) => (
                                        <li key={index}>{book.bookTitle} - {book.copies} copies - Rs. {book.price.toFixed(2)}</li>
                                    ))}
                                </ul>
                                <ConfirmOrder orderId={order._id} delivered={order.delivered === 'Yes'} onUpdateDeliveryStatus={handleUpdateDeliveryStatus} />
                                {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='py-20 px-20'>
                  <SortingPage/>
  
    
  </div>
            </div>

            <MyFooter />
        </div>
    );
};

export default ProvinceOrders;
