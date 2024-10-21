import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

export default function PaypalButtons({ totalPrice }) {
  const [{ options, isPending, isResolved, isRejected }, dispatch] = usePayPalScriptReducer();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading PayPal buttons...");

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: 'USD', // You can change this to the desired currency
      },
    });
  }, [totalPrice]);

  // Handle loading state changes based on PayPal script readiness
  useEffect(() => {
    if (isPending) {
      setLoadingMessage("PayPal buttons are loading. Please wait...");
    } else if (isRejected) {
      setLoadingMessage("Failed to load PayPal buttons. Please try again.");
    } else if (isResolved) {
      setLoadingMessage(""); // Clear loading message once buttons are ready
    }
  }, [isPending, isRejected, isResolved]);

  return (
    <PayPalScriptProvider
      options={{
        clientId: 'ARLdvQEIhb_bCkZiFT4UIlXWQoaZoSx2d77civTrz8XoWir465dZo1QZeK6bJIIMFPWVF3Cq-humitKN',
        currency: 'USD',
      }}
    >
      <div className="paypal-container">
        {/* Display loading message if the buttons are still pending */}
        {loadingMessage && <div className="loading-message">{loadingMessage}</div>}
        
        {/* Display the PayPal buttons if not successfully paid */}
        {!paymentSuccess && isResolved && !isPending && (
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice, // Pass the total price of the order here
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`Transaction completed by ${details.payer.name.given_name}.`);
                // Set payment success to true to show the success message
                setPaymentSuccess(true);
              });
            }}
            onError={(err) => {
              console.error("Error processing the transaction", err);
              alert("An error occurred during the payment process. Please try again.");
            }}
          />
        )}

        {/* Show "Payment Successful" button if payment is completed */}
        {paymentSuccess && (
          <button className="text-green-600 font-semibold py-2 px-4 bg-green-100 rounded-lg">
            Payment Successful
          </button>
        )}

        {/* Retry option if buttons fail to load */}
        {isRejected && (
          <div className="error-message">
            <p>Failed to load PayPal buttons. Please try again.</p>
            <button onClick={() => dispatch({ type: 'setLoadingStatus', value: 'pending' })}>
              Retry
            </button>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
}
