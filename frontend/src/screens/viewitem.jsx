import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../component/Spinner';

const ViewItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/clothes/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4">
              <img src={item.productImages} alt={item.name} className="w-full" />
            </div>
            <div className="md:w-1/2 md:ml-4">
              <p className="text-lg font-semibold mb-2">Description:</p>
              <p className="mb-4">{item.description}</p>
              <p className="text-lg font-semibold mb-2">Price:</p>
              <p className="mb-4">{item.price}</p>
              <p className="text-lg font-semibold mb-2">Designed By:</p>
              <p>{item.designedby}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewItem;
