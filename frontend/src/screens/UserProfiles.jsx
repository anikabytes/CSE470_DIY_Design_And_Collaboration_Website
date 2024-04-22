import { useState, useEffect } from 'react';
import Navbar from "../component/Navbar.jsx";
import { Button } from 'react-bootstrap';

const UserProfiles = () => {

    const [userProfile, setUserProfile] = useState([]);
    useEffect(() => getUsers, []);


    const getUsers = async () => {
        const res = await fetch('http://localhost:3000/api/getusers', {
            method: "GET",
            credentials: "include"
        })

        const data = await res.json();

        let userProfiles = []
        for (let i = 0; i < data.data.length; i++){
          userProfiles.push(
            <div key = {i} className='border-solid border-2 border-amber-500 mx-12 my-10 p-4 px-5'>
              <p> Name: <span>{data.data[i].fname}</span> <span>{data.data[i].lname}</span></p>
              <p> Email: <span>{data.data[i].email}</span> </p>
              <Button fname={data.data[i].fname} lname={data.data[i].lname} email={data.data[i].email} className="my-2 d-block bg-orange-300 mr-2" style={{width:'100px'}} onClick={follow}>Follow</Button>
            </div>
            
          );
      }
      setUserProfile(userProfiles);

    }

    const follow = async (e) => {
        const fname = e.currentTarget.getAttribute("fname");
        const lname = e.currentTarget.getAttribute("lname");
        const email = e.currentTarget.getAttribute("email");

        const res = await fetch('http://localhost:3000/api/follow', {
            method: "POST",
            credentials: "include",
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
              fname: fname,
              lname: lname,
              email: email
            })
        })
    }

    return (
        <div>
            <Navbar />
            <h1 className='text-4xl font-bold mb-3 text-amber-500 ml-6 my-2'>Our Current Designers</h1>
            <div className='overflow-y-auto flex flex-row'>
              {userProfile}
            </div>
        </div>
    )
}

export default UserProfiles