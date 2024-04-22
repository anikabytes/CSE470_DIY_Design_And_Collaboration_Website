
import {useState, useEffect} from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [value, setValue] = useState('');

    useEffect(() => getProfile, []);

  const getProfile = async () => {
    const res = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: "include"
      }
      );
    const data = await res.json();
    if (res.status != 200){
      setValue('Sign In')
    }
    else{
      setValue('Profile')
    }
  }
    return (
            <nav>
               <div className="h-10vh flex justify-between z-50  text-white lg:py-5 px-20 py-4 transition bg-orange-300">
                    <div className="flex items-center flex-1">
                        <span className="text-3xl font-bold">
                            ARTisTs
                        </span>
                    </div>
                    <div className="lg:flex md:flex lg:flex-1 times center justify-end font-normal hidden">
                        <div className="flex-10">
                            <ul className="flex gap-8 mr-16 text-[18px]">
                                <Link to = "/">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Home 
                                    </li>
                                </Link>
                                <Link to = "/clothes">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Clothes
                                    </li>
                                </Link>
                                <Link to = "/design">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Design
                                    </li>
                                </Link>

                                <Link to = "/getusers">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Users
                                    </li>
                                </Link>

                                <Link to = "/cart">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Cart
                                    </li>
                                </Link>

                                <Link to='/profile'>
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        {value}
                                    </li>
                                </Link>


                            </ul>
                        </div>
                    </div>
                </div> 
            </nav>
    )
}


export default Navbar


