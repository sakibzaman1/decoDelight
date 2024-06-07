import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './navbar.css'
import defaultProfile from '../../assets/Images/defaultProfile.png'
import { AuthContext } from "../../Providers/AuthProvider";
import UseCart from "../../Hooks/UseCart";
import Search from "../../Components/Search/Search";

const Navbar = () => {

  const {user, logOutUser} = useContext(AuthContext);
  const [cart, refetch] = UseCart();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) { // Adjust the threshold as needed
        setVisible(false);
      } else {
        setVisible(true);
      }

    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToProducts = () => {
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navOptions = (
    <>
     <li ><Link className="navLinks" to="/">Home</Link></li>
     <li onClick={scrollToProducts} to=''><Link>Products</Link></li>
     <li ><Link className="navLinks "  to="/myCart">My Cart <sup className={`text-red-600 ${user? 'visible' : 'hidden'}`}>{cart?.length}</sup></Link></li>
     <li ><Link className="navLinks " to="/about">About</Link></li>
     <li ><Link className="navLinks " to="/contact">Contact</Link></li>
    </>
  );


   // Sign Out Button

   const handleSignOut = () => {
    logOutUser()
        .then(() => {
          console.log('User Signed Out')
        })
        .catch(error => console.log(error.message))
}


  return (
    <div className={`my-app-bar navbar items-center bg-transparent fixed z-10 mx-auto  ${visible? 'visible text-white' : 'bg-white text-black shadow-2xl'}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-black bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <h1 className="text-sm lg:text-2xl font-mono pl-10">DECO DELIGHT</h1>
        <div className="ml-4">
          <Search></Search>
        </div>
        
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end gap-6">
        <Link to='/signIn'  className="font-mono text-xs lg:text-base">Sign In</Link>
        <Link to='/signUp' className="font-mono text-xs lg:text-base">Sign Up</Link>
        <div className="flex-none gap-2">
   
   <div className="dropdown dropdown-end">
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       <div className="w-8 rounded-full border-2">
         <img alt="Tailwind CSS Navbar component" src={user? user.photoURL : defaultProfile} />
       </div>
     </div>
     <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow text-black menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
       <li>
         <Link className="justify-between">
           Dashboard
         </Link>
       </li>
       <li><a>Settings</a></li>
       <li><button onClick={handleSignOut}>Sign out</button></li>
     </ul>
   </div>
 </div>
      </div>
    </div>
  );
};

export default Navbar;
