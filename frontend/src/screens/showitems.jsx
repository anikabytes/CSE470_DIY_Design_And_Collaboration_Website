import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../component/Spinner';
import { Link } from 'react-router-dom';
import { MdScreenSearchDesktop } from 'react-icons/md';
import Navbar from '../component/Navbar';
import Display from '../component/Display';

const ShowItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/clothes')
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
    <div className='bg-blue-200'>
      <Navbar />
      <div className='flex justify-between items-center p-4'>
        <h1 className='text-3xl my-8'>Products list</h1>
        <div className='flex items-center'>
          <div className='flex items-center mr-2'>
            <input
              type='text'
              placeholder='Search products'
              value={searchString}
              onChange={(searchstring) => setSearchString(searchstring.target.value)}
              className='border-2 border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:border-sky-500'
            />
            <Link to={`/clothes/search/${searchString}`}>
              <MdScreenSearchDesktop className='text-sky-800 text-4xl' />
            </Link>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4'>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
      <Display
        items={items}
      />)}
      </div>
      <div className='flex justify-between items-center justify-center mt-4 py-4'>
        <Link to = "/design">
            <button className='bg-orange-300 px-4 py-2 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-green-300'>
              Customise Your Dress 
            </button>
        </Link>
        </div>
    </div>
  );
};

export default ShowItems;
