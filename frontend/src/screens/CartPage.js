import React from 'react';
//import Layout form './../components/Layout/Layout';
import { useCart } from '../context/Cart';
//import { useAuth } from '../context/auth' //verify login
const CartPage = () => {
    //const [auth,setAuth]=useAuth()
    const [cart,setCart]=useCart()

    //toal price
    const totalPrice=()=>{
        try{
            let total=0;
            cart?.map((item)=>{
                total=total+item,price;
            });
            return total
        } catch(error) {
            console.log(error);
        } 
    
    };


    //del item
    const removeCartItem=(..pid..)=>{
        try{
            let myCart= [...cart];
            let index=myCart.findIndex((item)=> item._id===pid);
            myCart.splice(index,1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringufy(myCart));

        }   catch(error) {
            console.log(error);
        }
    }
  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div classNAme='col-md-12'>
                    <h1 className='text=center bg-light p-1 mb-1'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length
                            ?   `You have ${cart.lenght} items in your cart ${
                                  auth?.token ? ** : 'please checkout'
                                }`
                            : 'Your cart is empty'}
                    </h4>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {cart?.map((.....) => (
                            <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4'>
                                    <img
                                        //src
                                        //className
                                        //width
                                        //height
                                        />
                                </div>
                                <div className='col-md-8'>
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0,30)}</p>
                                    <p>Price: {p.price}</p>
                                    <button className='btn btn-danger' onClick={()=> removeCartItem(p.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-4 text-center'>
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr/>
                        <h4>Total: {totalPrice()}</h4>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default CartPage