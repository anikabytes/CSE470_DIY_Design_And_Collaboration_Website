import { Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navbar from "../component/Navbar.jsx";

const Message = () => {

    useEffect(() => getMessage, [])

    const [message, setMessage] = useState([])
    const [name, setName] = useState([])

    const sendMessage = async (e) => {
        const message = e.target.previousSibling.value

        if (message !== ''){
            const res = await fetch("http://localhost:3000/api/message", {
            method: "POST",
            credentials: "include",
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                msg: message
            })
      }
      );
        }
        
        e.target.previousSibling.value = ''
        window.location.reload();

    }

    const getMessage = async (e) => {

        try{
            const res = await fetch("http://localhost:3000/api/message", {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json()

            const msg = data.msgs;

            let msgItem = []

            for (let i = 0; i < msg.length; i++){
                msgItem.push(
                    <div key={i} className='flex flex-row mb-2'>
                        <p className='mr-2 font-bold text-xl text-amber-500 content-center'>{msg[i].name}: </p>
                        <p className='mr-2 font-bold text-xl bg-gray-100 p-2 w-screen rounded-lg'>{msg[i].message}</p>
                    </div>
                )
            }

            setMessage(msgItem)
            setName(data.name)
        }


        catch(e){
            console.log("No Messages Found")
        }
    }

    return (
        <div>
            <Navbar />
            <div>
                <h1 className='text-4xl font-bold mb-1 mt-5 text-amber-500 ml-7'>Message Box - {name}</h1>
                <div className="border-solid border-2 border-amber-500 mx-12 mt-10 p-4 px-5 overflow-y-auto h-96">
                    {message}
                </div>
                <div className='mx-10 flex flex-row'>
                    <label className='text-lg text-amber-900 font-bold content-center'>Your Message: </label>
                    <input className="border-solid border-2 border-amber-500 mx-2 my-10 px-2 py-2 w-screen" label="Type your message here..." type="textarea" />
                    <Button className="my-2 d-block bg-orange-300 mr-2 text-xl font-bold self-start my-auto" style={{width:'100px'}} onClick={sendMessage}>SEND</Button>
                </div>
            </div>
            
        </div>
    )
}

export default Message;