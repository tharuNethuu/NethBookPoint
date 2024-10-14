import React, { useEffect, useState } from 'react';

const SortingPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [assignedPersons] = useState(['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5']);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = 'http://localhost:5000/ordersdelivery?status=Yes';
        if (selectedPerson) {
          url += `&assignedPerson=${selectedPerson}`;
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
  }, [selectedPerson]);

  const handlePersonChange = (e) => {
    setSelectedPerson(e.target.value);
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="orders-page">
      <h1 className="text-2xl font-bold py-10 text-yellow-800">Filtered Orders by Assigned Person</h1>
      <div className="mb-4">
        <label htmlFor="assignedPerson" className="mr-2 font-semibold text-lg">Select Assigned Person:</label>
        <select id="assignedPerson" value={selectedPerson} onChange={handlePersonChange} className="border p-2 px-2 rounded-full text-center bg-yellow-900 text-white font-semibold text">
          <option value="">All Assigned Persons</option>
          {assignedPersons.map(person => (
            <option key={person} value={person}>{person}</option>
          ))}
        </select>
      </div>
      {orders.length === 0 && <div className="no-orders">No orders found for the selected person.</div>}
      {orders.length > 0 && (
        <div className="order-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {orders.map(order => (
            <div key={order._id} className="order-card border p-4 rounded shadow-2xl bg-yellow-200 shadow-gray-600 hover:shadow-2xl hover:shadow-gray-800 hover:bg-white">
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p><strong>Receiver Name:</strong> {order.receiverName}</p>
              <p><strong>Province:</strong> {order.province}</p>
              <p><strong>Billing Address:</strong> {order.billingAddress}</p>
              <p><strong>Sending Address:</strong> {order.sendingAddress}</p>
              <p><strong>Contact Number:</strong> {order.contactNumber}</p>
              <p><strong>Total Price:</strong> Rs. {order.totalPrice.toFixed(2)}</p>
              <p><strong>Assigned Person:</strong> {order.assignedPerson}</p>

              <p className='text-normal text-yellow-700'><strong>Delivery Status:</strong> {order.delivered}</p>


              <h3 className="text-lg font-semibold">Books:</h3>
              <ul>
                {order.books.map((book, index) => (
                  <li key={index}>{book.bookTitle} - {book.copies} copies - Rs. {book.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortingPage;
