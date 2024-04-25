import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../component/Spinner';
import { TiTick } from "react-icons/ti";
import AdminNav from '../component/AdminNav';
import { Button } from 'react-bootstrap';


const confirmed = async (e) => {
    axios
        .delete(`http://localhost:3000/admin/checkout/${e.currentTarget.getAttribute("id")}`)
        .then((response) => {
            if (response.status === 200) {
                alert("Removed Design Successfully");
                window.location.reload();
            } else {
                alert("Error");
            }
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });




};


const Checkout = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/admin/checkout')
      .then((response) => {
        setCheckouts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (
    <div className='p-4'>
        <AdminNav />
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Ordered By</th>
              <th className='border border-slate-600 rounded-md'>Item</th>
              <th className='border border-slate-600 rounded-md max-md'>Price</th>
              <th className='border border-slate-600 rounded-md max-md'>Confirmation Pending</th>
            </tr>
          </thead>
          <tbody>
          {checkouts.map((item, index) => (


    <tr className='h-8'>
      <th className='border border-slate-700 rounded-md text-center'>
        {index + 1}
      </th>
      <td className='border border-slate-700 rounded-md text-center'>
        {item.username}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        {item.order.name}
      </td>
      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
        {item.order.price}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        <div className='flex justify items-center'>
            <Button id={item._id} user_mail={item.email} className="my-2 d-flex align-items-center bg-orange-300" onClick={confirmed}>
                <span className="mr-1 text-black">Checkout Comfirmed</span>
                <TiTick className='text-2xl text-red-500' />
            </Button>      
        </div>
      </td>
    </tr>


))}
          </tbody>
        </table>
      )}
    </div>
  )
};


export default Checkout;

