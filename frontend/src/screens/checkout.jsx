import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import CartPage from './CartPage';
import axios from 'axios';
let order
const Checkout = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [items, setItems] = useState([]);
  const [itemNames, setItemNames] = useState([]); // State to store item names

  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const names = parsedItems.map(item => item.name);
      const price = parsedItems.map(item => item.price);
      setItemNames([names,price]); 
      setItems(parsedItems);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name: name,
      email: email,
      number: number, 
      address: address, 
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv
    };
 
    if (paymentMethod === 'cash') {

   
      if (!user.name || !user.email || !user.number || !user.address) {
        let errorMessage = "Error: Required fields for online payment are empty: ";
        if (!user.name) errorMessage += "name, ";
        if (!user.email) errorMessage += "email, ";
        if (!user.number) errorMessage += "number, ";
        if (!user.address) errorMessage += "address, ";

        errorMessage = errorMessage.slice(0, -2); 
        console.log(errorMessage);
        return; 
    }
    } else if (paymentMethod === 'online') {


      if (!user.name || !user.email || !user.number || !user.address || !user.cardNumber || !user.expiryDate || !user.cvv) {
          let errorMessage = "Error: Required fields for online payment are empty: ";
          if (!user.name) errorMessage += "name, ";
          if (!user.email) errorMessage += "email, ";
          if (!user.number) errorMessage += "number, ";
          if (!user.address) errorMessage += "address, ";
          if (!user.cardno) errorMessage += "card number, ";
          if (!user.expiryDate) errorMessage += "expiry date, ";
          if (!user.cvv) errorMessage += "CVV, ";
          errorMessage = errorMessage.slice(0, -2); // Remove trailing comma and space
          console.log(errorMessage);
          return; // Exit or handle the error accordingly
      }
  }
  
    const payment = paymentMethod === 'online' ? 'online' : 'cash';
    const itemDetails = items.map(item => [item.name, item.price]); 
  
    const order = [user.name, user.email, payment, itemDetails];
    
    console.log('Order:', order); 
    sendOrderToBackend(order);
};

  const sendOrderToBackend = async (order) => {
    try {
      const response = await axios.post('http://localhost:3000/api/saveOrder', { order });
      console.log('Order sent to backend successfully:', response.data);
   
    } catch (error) {
      console.error('Failed to send order to backend:', error);
    
    }
  };
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
      <div style={{ backgroundColor: 'grey', padding: '10px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>Checkout</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <h2>Items</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
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
            <h2>
              <strong>Total:</strong> {calculateTotal(items)}
            </h2>
          </div>
        </div>
        <div>
          <h2>Details</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <strong>Payment Method</strong>
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                <option value="cash">Cash on delivery</option>
                <option value="online">Online payment</option>
              </select>
            </label>
            <br />
            <label>
              Name:
              <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
              Number:
              <input type="text" value={number} onChange={handleNumberChange} />
            </label>
            <br />
            <label>
              Email:
              <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <br />
            <label>
              Address:
              <textarea value={address} onChange={handleAddressChange} />
            </label>
            <br />
            {paymentMethod === 'online' && (
              <>
                <label>
                  Card number:
                  <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
                </label>
                <br />
                <label>
                  Expiry date:
                  <input type="text" value={expiryDate} onChange={handleExpiryDateChange} />
                </label>
                <br />
                <label>
                  CVV:
                  <input type="text" value={cvv} onChange={handleCvvChange} />
                </label>
                <br />
              </>
            )}
            <br />
            <button style={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }} type="submit">
              Submit
            </button>
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

export default Checkout;
export {order};
