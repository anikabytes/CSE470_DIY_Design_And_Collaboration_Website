import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../component/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdScreenSearchDesktop,MdOutlineDelete} from 'react-icons/md';

const ShowItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/dress')
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Products list</h1>
        <div className='flex items-center'>
          <div className='flex items-center mr-2'>
            <input
              type='text'
              placeholder='Search products'
              className='border-2 border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:border-sky-500'
            />
            <MdScreenSearchDesktop className='text-sky-800 text-4xl' />
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {items.map((item) => (
            <div key={item._id} className='border border-slate-600 rounded-md mb-4' style={{flexBasis: '33%'}}>
              <div className='p-2'>
              <p className='text-center'><strong>Image:</strong> <img src={item.productImages} /></p>
                <p className='text-center mb-1'><strong>Name:</strong> {item.name}</p>
                <p className='text-center mb-1'><strong>Description:</strong> {item.description}</p>
                <p className='text-center mb-1'><strong>Price:</strong> {item.price}</p>
                <div className='flex justify-center mt-2'>
                  <Link to={`/dress/details/${item._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 mr-2' />
                  </Link>
                  <Link to={`/dress/colaborate/${item._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 mr-2' />
                  </Link>
                  <Link to={`/dress/delete/${item._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default ShowItems;
