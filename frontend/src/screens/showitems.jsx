import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';

const ShowItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:2489/dress')
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Items</h1>
        <Link to='/dress/:id'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className = 'w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border borde-slate-600 rounded-md'>No</th>
              <th className='border border-r-0 border-slate-600'>Name</th>
              <th className='border border-r-0 border-slate-600'>Price</th>
              <th className='border border-r-0 border-slate-600'>Details</th>
              <th className='border border-r-0 border-slate-600'>Image</th>
              <th className='border border-r-0 border-slate-600'>Designer</th>
              <th className='border border-r-0 border-slate-600'>View</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index)=>(
              <tr key={item._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index+1}
                </td>\<td className='border border-slate-700 rounded-md text-center'>
                  {item.name}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {item.price}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {item.description}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {item.productImages}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {item.designedby}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center'>
                    <Link to={`/dress/details/${item._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800'/>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </div>
      )}
  


export default ShowItems;
