import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

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
        <h1 className='text-3xl my-8'>Items list</h1>
        <Link to='/dress/addproduct'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md'>Description</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Price</th>
              <th className='border border-slate-600 rounded-md'>Image</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Designer</th>
              <th className='border border-slate-600 rounded-md'>Operation</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
  <Link key={item._id} to={`/dress/details/${item._id}`}>
    <tr className='h-8'>
      <th className='border border-slate-700 rounded-md text-center'>
        {index + 1}
      </th>
      <td className='border border-slate-700 rounded-md text-center'>
        {item.name}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        {item.description}
      </td>
      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
        {item.price}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        {item.productImages}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        {item.designedby}
      </td>
      <td className='border border-slate-700 rounded-md text-center'>
        <div className='flex justify-center gap-x-4'>
          <BsInfoCircle className='text-2xl text-green-800' />
          <Link to={`/dress/colaborate/${item._id}`}>
            <AiOutlineEdit className='text-2xl text-yellow-600' />
          </Link>
          <Link to={`/dress/delete/${item._id}`}>
            <MdOutlineDelete className='text-2xl text-red-600' />
          </Link>
        </div>
      </td>
    </tr>
  </Link>
))}
          </tbody>
        </table>
      )}
    </div>
  )
};

export default ShowItems;
