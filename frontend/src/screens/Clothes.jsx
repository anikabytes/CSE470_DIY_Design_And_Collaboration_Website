import Navbar from "../component/Navbar.jsx"
import { Link } from 'react-router-dom';

const Clothes = () => {

  return (
    <div>
      <Navbar/>
      <div className="w-screen h-screen bg-blue-200 flex flex-col justify-center items-center">

        <div className="text-center text-3xl text-red-500 py-10">
          View Designs 
        </div>
        <Link to = "/design"
          className="bg-orange-300 fixed-bottom-100 right-100 m-100 text-white px-4 py-2 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-green-300"
  
        >
          Customise Your Dress 
        </Link>
        </div>
    </div>

  )
}

export default Clothes 

