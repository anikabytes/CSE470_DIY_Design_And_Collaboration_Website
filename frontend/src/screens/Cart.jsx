import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Navbar from "../component/Navbar.jsx";

const Cart = () => {

    useEffect(() => orders, []);

    const [totalPrice, setTotalPrice] = useState(0);
    const [order, setOrder] = useState([]);


    const orders = async () => {
        const res = await fetch('http://localhost:3000/api/order', {
            method: "GET",
            credentials: "include"
        })
        
        const data = await res.json();
        let items = []
        
        let price = 0;
        for (let i = 0; i < data.data.length; i++){
            
            price += parseInt(data.data[i].price);

            items.push(
            <div id={i} key = {i} className='border-solid border-2 border-amber-500 mx-12 my-10 p-4 px-5'>
                <img src={data.data[i].image} alt="" style={{width:'100px'}}/>
                <p>Name: {data.data[i].name}</p>
                <p>Price: {data.data[i].price}</p>
                <div className='flex flex-col'>
                    <Button dressid={data.data[i].id} name={data.data[i].name} image={data.data[i].productImages} price={data.data[i].price} className="my-2 d-block bg-red-300" style={{width:'100px'}} onClick={removeOrder}>Remove</Button>
                    <Button dressid={data.data[i].id} name={data.data[i].name} price={data.data[i].price} className="my-2 d-block bg-green-300" style={{width:'100px'}} onClick={checkout}>Checkout</Button>
                </div>
                
            </div>
            
            );
        }
        setOrder(items);
        setTotalPrice(price);
      }

      const removeOrder = async (e) => {
        const currId = e.currentTarget.getAttribute("dressid")

        const res = await fetch("http://localhost:3000/api/removeorder", {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
            order: currId
        })
      })

      window.location.reload();

    }

      const checkout = async (e) => {
        const currId = e.currentTarget.getAttribute("dressid")
        const name = e.currentTarget.getAttribute("name");
        const price = e.currentTarget.getAttribute("price");

        console.log(currId, name, price);
        const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
            dressId: currId,
            dressName: name,
            price: price,
        })
      })

      alert("Thank you for your purchase. It will be confirmed shortly!")
      }

    return(
        <div>
            <Navbar />
            <h1 className='text-4xl font-bold mb-1 text-amber-500 ml-7'>Order Summary</h1>
            <div className='overflow-y-auto flex flex-row'>
                {order}
            </div>
            <p className='text-amber-500 ml-7'>Total price: {totalPrice}</p>
            <div className='flex flex-row'>
               
            </div>
        </div>
    )

}

export default Cart