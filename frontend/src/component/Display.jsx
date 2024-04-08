import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import {  MdOutlineDelete } from 'react-icons/md';
const Display = ({items}) => {
  return (
        items.map((item) => (
          <Link key={item._id} to={`/clothes/details/${item._id}`}>
            <div className='border border-slate-600 rounded-md mb-4 bg-white' style={{ flexBasis: '33%' }}>
              <div className='p-2'>
                <p className='text-center'><strong>Image:</strong><img src={item.productImages} alt={item.name} className="w-full" /></p>
                <p className='text-center mb-1'><strong>Name:</strong> {item.name}</p>
                <p className='text-center mb-1'><strong>Description:</strong> {item.description}</p>
                <p className='text-center mb-1'><strong>Price:</strong> {item.price}</p>
                <div className='flex justify-center mt-2'>
                  <Link to={`/clothes/details/${item._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 mr-2' />
                  </Link>
                  <Link to={`/clothes/colaborate/${item._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 mr-2' />
                  </Link>
                  <Link to={`/clothes/delete/${item._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))
  );
};

export default Display;
