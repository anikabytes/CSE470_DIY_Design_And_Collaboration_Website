import React from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import axios from 'axios';


const remove = async (e) => {
    axios
        .delete(`http://localhost:3000/admin/designs/${e.currentTarget.getAttribute("id")}`)
        .then((response) => {
            if (response.status === 200) {
                alert("Removed Design Successfully");
                window.location.reload();
            } else {
                alert("Error");
            }
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
};

const Display = ({ items }) => {
    return (
        items.map((item) => (
            <div key={item._id} className='border rounded-md mb-1 bg-white'>
                <div className='px-1'>
                    <p className='text-center'><img src={item.productImages} alt={item.name} className="mx-auto" /></p>
                    <p className='text-center mb-1'><strong>Name:</strong> {item.name}</p>
                    <p className='text-center mb-1'><strong>Price:</strong> {item.price}</p>
                    <div className='flex justify-center mt-2'>
                        <div className='flex justify items-center'>
                            <Button id={item._id} className="my-2 d-flex align-items-center bg-orange-300" onClick={remove}>
                                <span className="mr-1 text-black">Remove Item</span>
                                <MdOutlineDelete className='text-2xl text-red-500' />
                            </Button>       
                        </div>
                    </div>
                </div>
            </div>
        ))
    );
};

export default Display;
