import React from 'react'

const viewitem = ({ match }) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:2489/items/${match.params.id}`)
      .then(res => setItem(res.data))
      .catch(err => console.log(err));
  }, [match.params.id]);

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default viewitem
