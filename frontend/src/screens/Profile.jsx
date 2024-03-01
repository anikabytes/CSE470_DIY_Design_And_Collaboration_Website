import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from "../component/Navbar.jsx";

const Profile = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [dress, setDress] = useState([]);
    
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
        console.log(data.dress[i]);
        dressItems.push(<img key = {i} src = {data.dress[i]}/>);
      }
      setDress(dressItems);
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
    
    

    return (
      <div>
        <Navbar />
        <Container className='mt-5 justify-content-center'>
        <Row className='justify-content-center'>
          <Col md={3} className='justify-content-center'>
              <h1 className='font-bold text-lg'>Profile</h1>
              <img src='/public/blank-profile.jpg' alt="no photo" width="150"/>
              <h5 className='my-3'>Name: {fname} {lname}</h5>
              <h5 className='my-3'>Email: {email}</h5>
              <h5 className='my-3'>Address: {address}</h5>
              <Button className="my-2 d-block bg-orange-300" style={{width:'100px'}} onClick={updateSubmit}>UPDATE PROFILE</Button>
              <Button className="my-2 d-block bg-orange-300" style={{width:'100px'}} onClick={logoutSubmit}>LOGOUT</Button>
              <h5 className='font-bold text-lg'>Saved Designs:</h5>
              <ul className='flex flex-row'>{dress}</ul>
          </Col>
          
        </Row>
      

  </Container>
      </div>
      
    );
}

export default Profile;