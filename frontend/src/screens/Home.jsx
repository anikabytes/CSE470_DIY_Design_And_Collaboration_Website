import Navbar from "../component/Navbar.jsx"
import { useState, useEffect } from 'react';

const Home = () => {
  

  return (
    <div className="bg-yellow-100 w-screen h-screen">
      <Navbar />
      <div className=" text-center text-3xl text-black py-10 ">
        Home page
      </div>
     
    </div>
  )
}

export default Home
