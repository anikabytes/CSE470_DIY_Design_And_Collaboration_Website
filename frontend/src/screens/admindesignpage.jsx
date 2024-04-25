import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../component/Spinner';
import { Link } from 'react-router-dom';
import { MdScreenSearchDesktop } from 'react-icons/md';
import AdminNav from '../component/AdminNav';
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
    <div >
      <AdminNav />
      
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
    </div>
  );
};

export default ShowItems;
