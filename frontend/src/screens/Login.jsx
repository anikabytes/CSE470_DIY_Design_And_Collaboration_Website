import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const loginSubmit = async (e) => {
      e.preventDefault();

  
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
          'email': email, 'password': password
        })
      }
      );

      const data = await res.json();

      if (res.status == 200){
        console.log("Successfully Logged In");
        localStorage.setItem("email", email);
        navigate("/profile");

      }else{
        alert(data.message);
      }
  };

  return (
    <div>
      <Navbar />
      <Container className='my-5'>
        <Row className='justify-content-center'>
            <Col xs={10} md={5} className='card p-5'>
                <h1 className='font-bold text-lg'>LOG IN</h1>

                <Form onSubmit={loginSubmit}>

                  <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <div className="d-flex justify-content-center align-items-center">
                  <Button type='submit' className='mt-3 bg-orange-300' style={{width: '100px'}}>LOG IN</Button>
                  </div>
                
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Link style={{textDecoration: 'none'}}to='/register'>
                    Create New Account
                  </Link>
                </div>
      
            </Col>
        </Row>

    </Container>
    </div>
    
  );
}

export default Login;