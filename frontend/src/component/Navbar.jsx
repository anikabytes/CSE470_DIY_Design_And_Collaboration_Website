
import {useState} from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
<<<<<<< Updated upstream
=======
import { Link } from 'react-router-dom';
>>>>>>> Stashed changes


const Navbar = () => {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

<<<<<<< Updated upstream

    // const ClothesDropdown = () => {

    //     const [showDropdown, setShowDropdown] = useState(false);

    //     const handleDropdownToggle = () => {
    //         setShowDropdown(!showDropdown);
    //     };
    // }

    const content = <>
        <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-orange-300 transition">
            <ul className="text-center text-xl p-20">
                <CustomLink spy={true} smooth={true}  href = '/home'>
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-yellow-200 hover:rounded">
                        About
                    </li>
                </CustomLink>
                
                <CustomLink spy={true} smooth={true} href="/clothes">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-yellow-200 hover:rounded">
                        Clothes 
                    </li>
                </CustomLink>

                <CustomLink spy={true} smooth={true}  href="/purchase">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-yellow-200 hover:rounded">
                        Purchase
                    </li>
                </CustomLink>

                <CustomLink spy={true} smooth={true}  href="/profile">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-yellow-200 hover:rounded">
                        Profile
                    </li>
                </CustomLink>
            </ul>

        </div>
    </>

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                                <CustomLink spy={true} smooth={true} href = "\home">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Home 
                                    </li>
                                </CustomLink>
                                
                                <CustomLink spy={true} smooth={true} href ="\clothes">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer ">
                                        Clothes
                                    </li>
                                </CustomLink>

                                <CustomLink spy={true} smooth={true} href='\purchase'>
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Purchase 
                                    </li>
                                </CustomLink>

                                <CustomLink spy={true} smooth={true} href='profile'>
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Profile
                                    </li>
                                </CustomLink>
=======
                                <Link to = "/">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Home 
                                    </li>
                                </Link>
                                
                                <Link to ="/clothes">
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer ">
                                        Clothes
                                    </li>
                                </Link>

                                <Link to='/purchase'>
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Purchase 
                                    </li>
                                </Link>

                                <Link to='/profile'>
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                        Profile
                                    </li>
                                </Link>
>>>>>>> Stashed changes
                            </ul>
                        </div>
                    </div>
                    
                        <div>
                            {click && content}
                        </div>

                        <button className="block sm:hidden transition" onClick={handleClick}>
                            {click ? <FaTimes/> : <CiMenuFries/>}
                        </button>
                </div> 
            </nav>
    )
}

<<<<<<< Updated upstream
function CustomLink ({href, children, ...props}) {
    const path = window.location.pathname 
    return (
        <li className = {path === href ? active : ""}>
            <a href={href} {...props}>
                {children}
            </a>
        </li>
    )
}
=======
>>>>>>> Stashed changes

export default Navbar


