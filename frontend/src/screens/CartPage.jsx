import React, { useEffect, useState } from 'react';
import Navbar from "../component/Navbar.jsx";
import { useLocation } from 'react-router-dom';

const sampleProducts = [
  {
    _id: 1,
    name: 'Sample Product 1',
    price: 100,
    productImages: 'https://via.placeholder.com/150'
  },
  {
    _id: 2,
    name: 'Sample Product 2',
    price: 200,
    productImages: 'https://via.placeholder.com/150'
  },
  {
    _id: 3,
    name: 'Sample Product 3',
    price: 300,
    productImages: 'https://via.placeholder.com/150'
  }
];

// const CartPage = () => {
//   let total = 0;

//   const cartData = JSON.parse(localStorage.getItem("cart")) || [];

//   const [cart, setCart] = useState(cartData);
//   const [selectedProduct, setSelectedProduct] = useState(cartData);


//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);
const CartPage = () => {
  let total = 0;

  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = useState([...cartData, ...sampleProducts.filter((item) => !cartData.some((c) => c._id === item._id))]);
  const [selectedProduct, setSelectedProduct] = useState([...cartData, ...sampleProducts.filter((item) => !cartData.some((c) => c._id === item._id))]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const deleteItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    setSelectedProduct(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = (products) => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price;
    });
    return totalPrice;
  };

  const generateOrderSummary = () => {
    if (!selectedProduct.length) {
      return <strong> Cart is empty! </strong>;
    }

    // Calculate the total price
    total = 0;
    total = calculateTotal(selectedProduct);

    return (
      <div>
        <strong> Order Summary </strong>
        <ul>
          {selectedProduct.map((item, index) => (
            <li key={item._id}>
              <img src={item.productImages} alt={item.name} style={{ width: 100, height: 100 }} />
              <div>
                name:{item.name}
                <br />
                price: {item.price}
              </div>
              <button
                style={{ backgroundColor: "red", color: "black" }}
                onClick={() => deleteItem(item._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div>
          <strong>Total:  {total}</strong>
        </div>
      </div>
    );
  };
  const handleShopping = () => {
    
    //console.log('Checkout process started');
    window.location.assign('/dress')
  };  
  const handleCheckout = () => {
    
    //console.log('Checkout process started');
    window.location.assign('/checkout')
  };

  return (
    <div className="bg-purple-200 w-screen h-screen">
      <Navbar />
      <div style={{ position: "absolute", top: "85px", left: "300px", width: "50%", height: "35px", backgroundColor: "#f0f0f0", padding: "10px" }}>
        {generateOrderSummary()}
      </div>
      <div style={{ position: "absolute", top: "85px", right: "100px", width: "18%", height: "35px", backgroundColor: "#f0f0f0", padding: "10px" }}>
        <strong> Order Details </strong>
        <ul>
          {selectedProduct.map((item, index) => (
            <li key={item._id}>
              <img src={item.productImages} alt={item.name} style={{ width: 100, height: 100 }} />
              <div>
                name:{item.name}
                <br />
                price: {item.price}
              </div>

            </li>
          ))}
        </ul>
        <div>          
          <strong>Total:  {total}</strong>
        </div>
        {selectedProduct.length === 0 ? (
          <div className="Cart empty">
            <h3>Cart is empty</h3>
            <button
              style={{ backgroundColor: "green", color: "white", marginTop: "10px" }}
              onClick={handleShopping}
            >
              Go Shopping
            </button>
          </div>
        ) : (
          <button
            style={{ backgroundColor: "green", color: "white", marginTop: "10px" }}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
