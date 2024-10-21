import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ totalAmount, customerEmail }) => {
  const [formData, setFormData] = useState({
    totalAmount: totalAmount || '0', // Default to '0' if no amount is passed
   // customerName: 'Ravindu Fernando', // You can pass the customer name dynamically as well
    customerEmail: customerEmail || 'myemail@mail.com',
  });

  useEffect(() => {
    // Update formData when props change
    setFormData({
      ...formData,
      totalAmount,
      customerEmail
    });
  }, [totalAmount, customerEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form to the iPay endpoint
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.ipay.lk/ipg/checkout';

    const inputs = [
      { name: 'merchantWebToken', value: 'eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDcxOCJ9.mNO7VUB_clIjs3n25oYlTkrJPttmVousZMqV0_n5AbF5qK0ygnye-yAdUn6LavHfW8WDBtoJCCi9a04fTrluiw' }, // Replace with your actual token
      { name: 'orderId', value: 'OID123456' },
      { name: 'orderDescription', value: ' Order' },
      { name: 'returnUrl', value: '/payemtSuccess' },
      { name: 'cancelUrl', value: 'http://mywebsite.com/cancel?orderId=OID123456' },
      { name: 'totalAmount', value: formData.totalAmount },
      { name: 'customerEmail', value: formData.customerEmail },
    ];

    inputs.forEach(({ name, value }) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Pay Now" />
    </form>
  );
};

export default CheckoutForm;
