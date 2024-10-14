import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { FaMessage, FaX, FaXbox, FaXmark } from 'react-icons/fa6';
import { HiOutlineChat, HiTrash } from 'react-icons/hi';
import Alert from '../components/Alert';



const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/orders')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched orders:', data); // Debugging statement
        setOrders(data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleDelete = async (orderId) => {
    const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setOrders(orders.filter(order => order._id !== orderId));
      setAlertMessage("Deleted successfully!");
      setAlertVariant("success");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 5 seconds
    } else {
      setAlertMessage("Failed to delete order. Please try again.");
      setAlertVariant("warning");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 5 seconds
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (response.ok) {
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      )); setAlertMessage("Order is uploaded successfully!");
      setAlertVariant("success");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000); 
     
    } else {
      setAlertMessage("Failed to update order status. Please try again.");
      setAlertVariant("danger");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);     }
  };

  const handleChatClick = (email, totalPrice, books) => {
    const defaultMessage = `Your order details: Total Price: Rs. ${totalPrice}, Books: ${books.map(book => `${book.bookTitle} (Quantity: ${book.copies})`).join(', ')}  has been proceeded.`;
    navigate(`/admin/dashboard/notifications/${email}`, { state: { defaultMessage } });
  };

  const people = ["Person 1", "Person 2", "Person 3", "Person 4", "Person 5"];

const handleAssignPersonChange = async (orderId, assignedPerson) => {
  const response = await fetch(`http://localhost:5000/orders/${orderId}/assign`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ assignedPerson })
  });

  if (response.ok) {
    setOrders(orders.map(order => 
      order._id === orderId ? { ...order, assignedPerson } : order
    ));
    setAlertMessage("Assigned person updated successfully!");
      setAlertVariant("success");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000); 
  } else {
    setAlertMessage("Failed to update assigned person. Please try again.");
    setAlertVariant("danger");
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);   }
};



  return (
    <div className=' px-4 lg:px-19 '>
      <h2 className='text-4xl text-yellow-800 text-center font-bold font-sans'>Orders List</h2>
      {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
      <table className='min-w-full divide-y divide-gray-200 font-medium '>
        <thead>
          <tr>
            <th className="px-4 py-5 text-left font-bold text-gray-800 uppercase tracking-wider">Email</th>
            <th className="px-4 py-5 text-left font-bold text-gray-800 uppercase tracking-wider">Total Price</th>
            <th className="px-4 py-5 text-left font-bold text-gray-800 uppercase tracking-wider">Book Title</th>
            <th className="px-4 py-5 text-left font-bold text-gray-800 uppercase tracking-wider">Copies</th>
            <th className="px-4 py-5 text-left font-bold text-gray-800 uppercase tracking-wider">Price</th>
            <th className="px-4 py-5 text-left font-bold text-gray-800 uppercase tracking-wider">Completed or Not</th>
            <th className="px-4 py-5 text-left font-bold text-gray-800 uppercase tracking-wider">Assigned Person</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">No orders available</td>
            </tr>
          ) : (
            orders.map((order) => (
              order.books.map((book, index) => (
                <tr key={`${order._id}-${index}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={order.books.length} className="px-4 py-4 whitespace-nowrap">{order.email}</td>
                      <td rowSpan={order.books.length} className="px-4 py-4 whitespace-nowrap">Rs. {order.totalPrice.toFixed(2)}</td>
                    </>
                  )}
                  <td className="px-4 py-4 whitespace-nowrap">{book.bookTitle}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{book.copies}</td>
                  <td className="px-4 py-4 whitespace-nowrap">Rs. {book.price.toFixed(2)}</td>
                  {index === 0 && (
                    <td rowSpan={order.books.length} className="px-4 py-4 whitespace-nowrap">
                      <select 
                        value={order.status || 'Default'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className='p-2 border rounded'>
                        <option value="Default"></option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                  )} {index === 0 && (
                    <td rowSpan={order.books.length} className="px-4 py-4 whitespace-nowrap">
                      <select 
                        value={order.assignedPerson || ''}
                        onChange={(e) => handleAssignPersonChange(order._id, e.target.value)}
                        className='p-2 border rounded'>
                        <option value="">Select Person</option>
                        {people.map(person => (
                          <option key={person} value={person}>{person}</option>
                        ))}
                      </select>
                    </td>
                  )}
                  {index === 0 && (
                    <td rowSpan={order.books.length} className=" py-4 px-5 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className='text-lg text-red-950 hover:text-red-600'

                      ><HiTrash/>
                  </button>
                      <button
                        onClick={() => handleChatClick(order.email, order.totalPrice, order.books)}
                        className='text-yellow-900 px-2 text-lg font-semibold  hover:text-red-600'
                      >
                        <HiOutlineChat/>
                   </button>
                   
                    </td>
                  )}
                </tr>
              ))
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
