import React, { useState, useEffect } from 'react';
import Navbar from './../component/Navbar';
import CartPage from './CartPage';
import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { CardElement } from '@stripe/react-stripe-js';

// const stripe = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');
const checkout = () => {
  // Set up state for the checkout form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [items, setItems] = useState([]);
  //const stripe = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');
  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an order object
    const order = {
      name: name,
      email: email,
      number: number,
      address: address,
      items: items,
      total: calculateTotal(items),
      paymentMethod: paymentMethod,
    }

    // Send the order object to your backend server
    const { data: paymentIntent } = await axios.post('/api/orders', order);

    // Mount the Stripe Elements
    const stripeElement = stripe.elements();
    const cardElement = stripeElement.create('card');
    cardElement.mount('#card-element');

    // Handle the payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      return;
    }

    // Confirm the payment intent
    const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      console.error(confirmError);
      return;
    }

    // Payment was successful
    console.log('Payment was successful');
    // Clear the cart
    setItems([]);
    // Redirect to the order confirmation page
    // history.push('/orders/confirmation');
  }
  
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: "grey", padding: "10px", marginBottom: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "white" }}>Checkout</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h2>Items</h2>
          <ul>
            {items.map((item, index) => (
              <li key={item._id}>
                <img src={item.productImages} alt={item.name} style={{ width: 100, height: 100 }} />
                <div>
                  name:{item.name}
                  <br />
                  price: {item.price}
                  <br />
                  <br />
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h2><strong>Total:</strong> {calculateTotal(items)}</h2>
          </div>
        </div>
        <div>
          <h2>Details</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <strong>PAyment Method</strong>
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                <option value="cash">Cash on delivery</option>
                <option value="online">Online payment</option>
              </select>
            </label>
            <br />
            <label>
              Name:
              <input type="text" value={name} onChange={(handleNameChange)} />
            </label>
            <br />
            <label>
              Number:
              <input type="text" value={number} onChange={(handleNumberChange)} />
            </label>
            <br />
            <label>
              Email:
              <input type="email" value={email} onChange={(handleEmailChange)} />
            </label>
            <br />
            <label>
              Address:
              <textarea value={address} onChange={(handleAddressChange)} />
            </label>
            <br />
            {paymentMethod === 'online' && (
              <label>
                Card number:
                <input type="text" value={cardNumber} onChange={(handleCardNumberChange)} />
              </label>
            )}
            <br />
            {paymentMethod === 'online' && (
              <label>
                Expiry date:
                <input type="text" value={expiryDate} onChange={(handleExpiryDateChange) } />
              </label>
            )}
            <br />
            {paymentMethod === 'online' && (
              <label>
                CVV:
                <input type="text" value={cvv} onChange={(handleCvvChange) } />
              </label>
            )}
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const calculateTotal = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price;
  });
  return total;
};

export default checkout;