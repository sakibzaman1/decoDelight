import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({totalPrice, onPaymentSuccess}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
  
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        const { id } = paymentMethod;
  
        try {
          const response = await fetch('https://deco-delight-server.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: totalPrice }), // Use the passed total price
          });
  
          const data = await response.json();
          const confirmCardPayment = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: id,
          });
  
          if (confirmCardPayment.error) {
            setError(confirmCardPayment.error.message);
          } else {
            setSuccess(true);
            setError(null);
            onPaymentSuccess(); // Call the callback function
          }
        } catch (error) {
          setError(error.message);
        }
        setLoading(false);
      }
    };
  
    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CardElement className="p-2 border rounded-md" style={{ width: '100%' }} />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : `Pay $${(totalPrice).toFixed(2)}`}
          </button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {success && <div className="text-green-500 mt-4">Payment Successful!</div>}
        </form>
      </div>
    );
};

export default CheckoutForm;
