import Navbar from "../component/Navbar.jsx";
import homepageImage from "../assets/welcome.jpg";
import { useState, useEffect } from 'react';

const Home = () => {
 return (
   <div className="bg-yellow-100 min-h-screen flex flex-col">
     <Navbar />
     <div className="flex-grow flex flex-col items-center justify-center text-center text-3xl text-amber-500 font-bold py-10">
      Welcome To ARTisTs
       <img src={homepageImage}  className="mx-auto my-4 max-w-full h-auto w-50" />
     </div>
   </div>
 )
}

export default Home
