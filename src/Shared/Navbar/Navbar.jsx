import React from "react";
import { Link, NavLink } from "react-router-dom";
import './navbar.css'
import defaultProfile from '../../assets/Images/defaultProfile.png'

const Navbar = () => {
  const navOptions = (
    <>
     <li className="navLinks text-white"><Link to="/">Home</Link></li>
                            <li className="navLinks text-white"><Link to="/products">Products</Link></li>
                            <li className="navLinks text-white"><Link to="/myCart">My Cart</Link></li>
                            <li className="navLinks text-white"><Link to="/about">About</Link></li>
                            <li className="navLinks text-white"><Link to="/contact">Contact</Link></li>
    </>
  );
  return (
    <div className="navbar bg-transparent fixed z-10 mx-auto text-white">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Deco Delight</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end gap-6">
        <Link className="font-mono">Sign In</Link>
        <Link className="font-mono">Sign Up</Link>
        <div className="w-8 rounded-full border-none">
          <img className="" alt="Tailwind CSS Navbar component" src={defaultProfile} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
