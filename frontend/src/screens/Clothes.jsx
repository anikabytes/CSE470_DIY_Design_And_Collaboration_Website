import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { Button } from 'react-bootstrap';

const Clothes = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/clothes`)
      .then((response) => {

        let dressItems = []
        const data = response.data.data

        for (let i = 0; i < data.length; i++){

        dressItems.push(
          <div key = {i} className='mt-2 ml-7 border-solid border-2 border-amber-500 mx-12 my-10 p-4 px-5'>
            <h2 className="text-3xl font-bold mb-4 text-amber-800">{data[i].name}</h2>
            <div className="flex justify-content-center ">
              <div className="md:w-1/2 mb-4">
                <img src={data[i].productImages} alt={data[i].name} className="w-48 justify-content-center" />
              </div>
              <div className="md:w-1/2 md:ml-4">
                <p className="text-lg font-semibold mb-2 text-amber-700">Description:</p>
                <p className="mb-4 text-amber-900">{data[i].description}</p>
                <p className="text-lg font-semibold mb-2 text-amber-700">Price:</p>
                <p className="mb-4 text-amber-900">{data[i].price}</p>
                <p className="text-lg font-semibold mb-2 text-amber-700">Designed By:</p>
                <p className="mb-4 text-amber-900">{data[i].designedby}</p>
                <Button dress_id={data[i]._id} name={data[i].name} image={data[i].productImages} price={data[i].price} className="my-2 d-block bg-orange-300" style={{width:'120px'}} onClick={order}>Order Now</Button>
              </div>
            </div>
            </div>
          
        );
      }
        setItems(dressItems);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const order = async (e) => {
      const name = e.currentTarget.getAttribute("name");
      const img = e.currentTarget.getAttribute("image");
      const price = e.currentTarget.getAttribute("price");
      const id = e.currentTarget.getAttribute("dress_id");
      
      console.log(id)

      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
          id: id,
          name: name,
          img: img,
          price: price
        })
      }
      );

      if (res.status != 200){
        alert("You are not signed in")
      }
      else{
        alert("Thank you for Ordering");
      }

     
  }

  return (
    <div>
        <Navbar />
        
        <h1 className='text-4xl font-bold mb-3 text-amber-500 ml-6 my-2'>Designs of the creative minds like you!</h1>
        {items}


    </div>
  );
};

export default Clothes
