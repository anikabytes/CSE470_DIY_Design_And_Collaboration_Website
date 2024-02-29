import { useState, useContext, createContext,useEffect} from "react";

const CartContext= createContext();
const CartProvider= ({children})=> {
    const[cart,setCart] =useState([]);
    useEffect(()=>{
        let exist=localStorage.getItem('cart');
        if (exist) setCart(JSON.parse(exist));
    },[])

    return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
    </ CartContext.Provider>
    );
};

//cust hook
const useCart= ()=>useContext(CartContext);

export {useCart,CartProvider};