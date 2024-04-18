import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from './../component/Navbar';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getUsers');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userEmail) => {
    try {
      const response = await fetch('http://localhost:3000/api/addFollowers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail }),
      });
      if (response.ok) {
        console.log(`Successfully followed user with email: ${userEmail}`);
        
      } else {
        console.error('Failed to follow user:', response.statusText);
        
      }
    } catch (error) {
      console.error('Error following user:', error.message);
      
    }
  };
  return (
    <div className="w-screen h-screen bg-yellow-100">
      <Navbar/>
      <Container>
        <h5 className="text-center font-bold text-3xl">All Users</h5>
        <Row>
          {users.map((user) => (
            <Col key={user._email} md={4} className="mb-4">
              <div className="border p-3">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <Button onClick={() => handleFollow(user._email)}>Follow</Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ViewUsers;

