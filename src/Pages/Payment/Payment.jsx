// App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';


const stripePromise = loadStripe('pk_test_51OzlEk2KY05Wo21g7otoHcoPOCPbZukoVlA0XiZooLWS01SsvIgsblPxth6ojBQj2a2TJ04d73Bvc4CF45aYqR9Y00jmC42QUz');
const Payment = ({totalPrice}) => {
    return (
      <div className='pt-28 bg-cover bg-center h-screen flex justify-center items-center' style={{ backgroundImage: 'url("https://i.ibb.co/SfY0ZZt/bg.jpg")' }}>
        <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice}  />
      </Elements>
      </div>
    );
  };

export default Payment;