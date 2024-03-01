import React from 'react';
import Navbar from "../component/Navbar.jsx";

const CartPage = () => {
    const orderSummary = [
        { id: "/public/s1.jpg", name: "Shirt", price: 20 },
        { id: "/public/s1.jpg", name: "Pants", price: 30 },
    ];

    const generateOrderSummary = () => {
        let summary = '';
        let total = 0;

        if (orderSummary.length === 0) {
            summary = "<strong> Cart is empty! </strong>";
        } else {
            summary+= `<strong> Order Summary  </strong> <br>` ;
            summary+= `<br>`;
            orderSummary.forEach(item => {
                summary += `<p>Item: ${item.name} <br>`;
                summary += `Price: ${item.price}  <br>`;
                total += item.price;
            });
            summary += `<strong> Total: ${total} </strong>`;
        }
        return <div dangerouslySetInnerHTML={{ __html: summary }} />;
        //return summary;
    };
    const counth = () => {
        let c=80;
        if (orderSummary.length === 0) {
            c = 60;
        } else {
            c+=(orderSummary.length*63)        
        }
        return c;
    };
    const generateOrderdet = () => {
        let det = '';
        let total = 0;

        if (orderSummary.length === 0) {
            det = '<strong> Empty! </strong>';
        } else {
            det += `<strong> Order Details </strong>  <br>`;
            
            orderSummary.forEach(item => {
                det +=`<br>`;
                det += `<div style="display: flex; align-items: center;">`;
                det += ` <img src="${item.id}" alt="${item.name}" style="width: 150px; height: 150px; margin-right: 10px;">`;
                det += `<div>`;
                det += `Item: ${item.name} <br>`;
                det += `Price: ${item.price} `;
                det += `</div>`;
                det += `<button style="margin-left: 30px; background-color: red; color: black;" onclick="removeItem('${item.name}')">Remove</button> <br>`;
                det += `</div>`;
                
                total += item.price;
            });
            det += `<strong> Total: ${total} </strong>`;
        }

        //return det;
        return <div dangerouslySetInnerHTML={{ __html: det }} />;
    };

    return (
        <div className="bg-purple-200 w-screen h-screen">
            <Navbar />
            <div style={{ position: 'absolute', top: '85px', left: '300px',width: '50%', height:`${counth()*2.3}px` , backgroundColor: '#f0f0f0', padding: '10px' }}>
                {generateOrderdet()}    
            </div>         
            <div style={{ position: 'absolute', top: '85px', right: '100px',width: '18%', height:`${counth()}px` , backgroundColor: '#f0f0f0', padding: '10px' }}>
                {generateOrderSummary()}
            </div>

        </div>
    );
}

export default CartPage;
