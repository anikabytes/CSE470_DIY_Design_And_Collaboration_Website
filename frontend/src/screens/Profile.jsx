import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from "../component/Navbar.jsx";
import { Link } from 'react-router-dom';

const Profile = () => {

    const [fname, setFname] = useState(''); 
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [dress, setDress] = useState([]);
    const [follow, setFollow] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => getProfile, []);


    const getProfile = async () => {
      const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include"
        }
        );

      const data = await res.json();

      if (res.status != 200){
        navigate("/login");

      }
      setFname(data.fname);
      setLname(data.lname);
      setEmail(data.email);
      setAddress(data.address);
      
      let dressItems = []
      for (let i = 0; i < data.dress.length; i++){
        dressItems.push(
          <div key = {i}>
            <img key = {i} src = {data.dress[i]} width="100px"/>
            <Button className="my-2 d-block bg-orange-300 mr-2" style={{width:'100px'}} onClick={shareDress}>SHARE</Button>
          </div>
          
        );
      }

      setDress(dressItems);
      let followItems = []
      for (let i = 0; i < data.followers.length; i++){
        followItems.push(
          <div key = {i} className='border-solid border-2 border-amber-500 mx-12 my-10 p-4 px-5'>
              <p> Name: <span>{data.followers[i].fname}</span> <span>{data.followers[i].lname}</span></p>
              <p> Email: <span>{data.followers[i].email}</span> </p>
            </div>
        );
      }

      setFollow(followItems)
    } 

    const logoutSubmit = async (e) => {
      const res = await fetch("http://localhost:3000/api/logout", {
          method: "POST",
          credentials: "include"
        }
        );
        navigate("/login");
    }

    const updateSubmit = async (e) => {
        navigate("/updateProfile");
    }

    const shareDress = async (e)  => {
      
      const name = prompt("Name your dress")
      const price = prompt("Set Price")
      const desc = prompt("Write a description")

      const res = await fetch("http://localhost:3000/api/sharedress", {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
          name: name,
          share: e.target.parentNode.firstChild.src,
          price: price,
          desc: desc
        })
      }
      );

      if (res.status != 200){
        alert("Dress is already shared");
      }
      else{
        alert("You shared your design! Proud of you :)");
      }
      
    }
    
    return (
      <div>
        <Navbar />
        
        <div className="flex">
          <div className="border-solid border-2 border-amber-500 mx-12 my-10 p-4 px-5 self-start">
            <h1 className='text-4xl font-bold mb-3 text-amber-500'>Profile</h1>
              <div className='justify-content-center'>
                <div md={3} className='justify-content-center'>
                    <img src='/public/blank-profile.jpg' alt="no photo" width="100"/>
                    <h5 className='my-3 text-xl'><span className='text-amber-600'>Name:</span> <span className='text-amber-900'>{fname} {lname}</span></h5>
                    <h5 className='my-3 text-xl'><span className='text-amber-600'>Email:</span> <span className='text-amber-900'>{email}</span></h5>
                    <h5 className='my-3 text-xl'><span className='text-amber-600'>Address:</span> <span className='text-amber-900'>{address}</span></h5>
                </div>

                  <div className='flex'>
                    <Button className="my-2 d-block bg-orange-300 mr-2" style={{width:'100px'}} onClick={updateSubmit}>UPDATE PROFILE</Button>
                      <Button className="my-2 d-block bg-orange-300" style={{width:'100px'}} onClick={logoutSubmit}>LOGOUT</Button>
                  </div>
              </div>
          </div>

            <div id="saved-designs" className="border-solid border-2 border-amber-500 mx-12 my-10 p-4 px-5" style={{width:'500px', height: '500px', overflowY: 'auto'}}>
              <h1 className='text-4xl font-bold mb-3 text-amber-500'>Your Designs</h1>
                {dress}
            </div>
            
            <div id="followers" className="border-solid border-2 border-amber-500 mx-12 my-10 p-4 px-3" style={{width:'500px', height: '500px', overflowY: 'auto'}}>
              <div className='flex'>
                <h1 className='text-4xl font-bold mb-3 text-amber-500 ml-7'>Following</h1>
                <Link className='ml-5 bg-amber-500 content-center text-lg px-3 text-white' to = "/message">Go to Message Box</Link>
              </div>
              
              {follow}
            </div>

          </div>

        </div>
      
    );
}

export default Profile;