import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import logo from './logo-removebg14.png'; // Ensure the path is correct
import './Navbar.css';

// React icons
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { HiOutlineBell } from 'react-icons/hi';
import { AuthContext } from '../contects/AuthProvider'; // Corrected the path to AuthProvider


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation(); // Use useLocation to get the current path

    const { user } = useContext(AuthContext);
    console.log(user);

    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const Dropdown = () => {
    return (
      <div className="absolute right-70 mt-20 w-30">
        <ul className='text-sm text-gray-700 rounded hover:bg-yellow-500 hover:font-semibold transition-all duration-300 ' style={{borderRadius: 10, border: '1px #CC9600 solid'}} >
          
          <li>
            <a
              href="/logout"
              className="block py-1  px-3 hover:bg-gray-100 text-white hover:text-black" style={{ fontFamily: 'Bona Nova'}}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  };


    // navItems
    const navItems = [
        { link: "Home", path: "/" }, 
        { link: "About", path: "/about" },
        { link: "Shop Now", path: "/shop" },
        
        { link: "Delivery Team", path: "/deliverylogin" },
        { link: "Sellers", path: "/adminIn" },
/*         { link: "Logout", path: "/logout" },
 */        {
            icon: HiOutlineBell,
            path: user && user.email ? `/notifications/${user.email}` : '/login',
        },
        
    ];

    return (
        <header className='w-full bg-image fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
            <nav className={`py-4 lg:px-2 px-2 ${isSticky ? "sticky top-0 left-0 right-0 bg-image" : ""}`}>
                <div className='flex justify-center items-center text-base gap-20'>
                    {/* logo */}
                    <Link to="/" className='flex items-center  w-40'>
                        <img src={logo} alt="Brand Logo" className='navbar-brand-img w-40 md:w-3/4' style={{marginLeft:-120 }}/>
                        <span className='Shopname'>NETH BOOKPOINT</span>
                    </Link>
                    <div className='flex justify-between items-center text-base gap-8'>
    {/* Nav items for large devices */}
    <ul className='md:flex space-x-10 hidden text-xs items-center'>
        {navItems.map(({ link, path, icon: Icon }, index) => (
            <li key={index} className={`block ${location.pathname === path ? 'text-custom-yellow' : 'text-custom-white'}`}>
                <Link to={path} className='flex items-center gap-10 cursor-pointer hover:text-yellow-100' style={{ fontFamily: 'Bona Nova', fontSize: 16, letterSpacing: 0.4}}>
                    {Icon && <Icon className="text-xl" />}
                    {link}
                </Link>
            </li>
        ))}
    </ul>

    <div className='flex items-center justify-center flex-col'>
  {user && (
    <>
      <img
        src="https://i.imgur.com/f8cktzx.png" // avatar image URL
        alt="User Avatar"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      <span className='text-xs text-yellow-400' style={{ fontFamily: 'Bona Nova', letterSpacing: 0.4}}>{user ? user.email : ""}</span>
      {isDropdownOpen && <Dropdown />}
    </>
  )}
</div>
    {/* Centered avatar */}
    {/* <div className='flex items-center justify-center flex-col'>
        {user && (
            <>
                <img 
                    src="https://i.imgur.com/f8cktzx.png" // avatar image URL
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                />
                <span className='text-xs text-yellow-400' style={{ fontFamily: 'Bona Nova', letterSpacing: 0.4}}>{user ? user.email : ""}</span>
            </>
        )}
    </div> */}

    {/* Button for large devices */}
    <div className='hidden lg:flex items-center'>
        <button>
            <FaBarsStaggered className='text-yellow-600 font-extrabold w-5 hover:text-yellow-300' />
        </button>
    </div>

    {/* Menu button for mobile devices */}
    <div className='md:hidden'>
        <button onClick={toggleMenu} className='text-yellow-300 focus:outline-none'>
            {isMenuOpen ? <FaXmark className='h-5 w-5 text white' /> : <FaBarsStaggered className='h-5 w-5 text white' />}
        </button>
    </div>
</div>

                    
                </div>

                {/* nav items for sm devices */}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-yellow-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {navItems.map(({ link, path, icon: Icon }, index) => (
                        <Link key={index} to={path} className={`block text-base uppercase cursor-pointer ${location.pathname === path ? 'text-white' : 'text-white'}`}>
                            {Icon && <Icon className="text-2xl mr-2" />}
                            {link}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
