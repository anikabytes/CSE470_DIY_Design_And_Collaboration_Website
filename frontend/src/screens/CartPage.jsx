import React from 'react';

const CartPage = () => {
    const orderSummary = [
        { id: "E:\\s1.jpg", name: "Shirt", price: 20 },
        { id: "E:\\s1.jpg", name: "Pants", price: 30 },
    ];

    const generateOrderSummary = () => {
        let summary = '';
        let total = 0;

        if (orderSummary.length === 0) {
            summary = '<h2> Cart is empty! </h2>';
        } else {
            summary+= `<h1> Order Summary  </h1>` ;
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
            det = '<h1> Empty! </h1>';
        } else {
            det += `<h1> Order Details </h1>`;
            
            orderSummary.forEach(item => {
                det += ` <img src="${item.id}" alt="${item.name} " style="width: 100px; height: 100px; margin-right: 10px;">  <br>`;
                det += `Item: ${item.name} <br>`;
                det += `Price:${item.price} `;
                det +=`<button style="margin-left: 30px;" onclick="removeItem('${item.name}')">Remove</button> <br>`

                total += item.price;
            });
            det += `<strong> Total: ${total} </strong>`;
        }

        //return det;
        return <div dangerouslySetInnerHTML={{ __html: det }} />;
    };

    return (
        <div>
            <div style={{ backgroundColor: '#FFA500', width: '100%', height: '80px', padding: '20px', position: 'fixed', top: 0, left: 0 }}>
                <h1 style={{ margin: 0, color: 'white' }}>ARTisTs</h1>
            </div>
            <div style={{ position: 'absolute', top: '80px', left: '15px',width: '75%', height:`${counth()*1.22}px` , backgroundColor: '#f0f0f0', padding: '10px' }}>
                {generateOrderdet()}    
            </div>         
            <div style={{ position: 'absolute', top: '80px', right: '10px',width: '18%', height:`${counth()}px` , backgroundColor: '#f0f0f0', padding: '10px' }}>
                {generateOrderSummary()}
            </div>

        </div>
    );
}

export default CartPage;
