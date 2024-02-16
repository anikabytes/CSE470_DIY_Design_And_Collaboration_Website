import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    
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
      <Container className='mt-5 justify-content-center'>
        <Row className='justify-content-center'>
          <Col md={3} className='justify-content-center'>
              <h1>Profile</h1>
              <img src='/public/blank-profile.jpg' alt="no photo" width="150"/>
              <h5 className='my-3'>Name: {fname} {lname}</h5>
              <h5 className='my-3'>Email: {email}</h5>
              <h5 className='my-3'>Address: {address}</h5>
              <Button className="my-2 d-block" style={{width:'100px'}} onClick={updateSubmit}>UPDATE PROFILE</Button>
              <Button style={{width:'100px'}} onClick={logoutSubmit}>LOGOUT</Button>
          </Col>
          
        </Row>
      

  </Container>
    );
}

export default Profile;