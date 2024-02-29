import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from "../component/Navbar.jsx"

const UpdateProfile = () => {
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
  
    }}
    
    const registerSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
            'fname': fname,
            'lname': lname,
            'email': email, 
            'address': address
        })
      }
      );

      const data = await res.json();

      if (res.status == 200){
        console.log("Successfully Updated");
        navigate("/profile");

      }else{
        navigate("/login");
      }
    };

  return (
    <div>
      <Navbar />
      <Container className='my-3'>
        <Row className='justify-content-center'>
            <Col xs={10} md={5} className='card p-5'>
                <h1>UPDATE PROFILE</h1>
                <h2></h2>
                <Form onSubmit={registerSubmit}>
                
                    <Form.Group className='my-3' controlId='fname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                        type='fname'
                        placeholder='Enter your first name'
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-3' controlId='lname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                        type='lname'
                        placeholder='Enter your last name'
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-3' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                        type='name'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
    
                    <Form.Group className='my-3' controlId='address'>
                        <Form.Label>Present Address</Form.Label>
                        <Form.Control
                        type='name'
                        placeholder='Enter your present address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <div className="d-flex justify-content-center align-items-center">
                        <Button type='submit' className='mt-3' style={{width: '100px'}}>UPDATE</Button>
                    </div>
                
                </Form>

                    <div className="d-flex justify-content-center align-items-center mt-3">
                    <Link style={{textDecoration: 'none'}}to='/profile'>
                        Visit Profile
                    </Link>
                    </div>
      
            </Col>
        </Row>

    </Container>
    </div>
    
    
  );
}

export default UpdateProfile;