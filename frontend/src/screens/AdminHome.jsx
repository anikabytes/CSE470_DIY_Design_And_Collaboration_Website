import Navbar from "../component/AdminNav.jsx"
import { useState, useEffect } from 'react';

const AdminHome = () => {
  

  return (
    <div className="bg-yellow-100 w-screen h-screen">
      <Navbar />
      <div className=" text-center text-3xl text-black py-10 ">
        Admin Panel
      </div>
     
    </div>
  )
}

export default AdminHome
