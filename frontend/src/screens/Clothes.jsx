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
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
           // Call navigateToDesign function on button click
        >
          Go to Design
        </Link>
        </div>
    </div>

  )
}

export default Clothes 

