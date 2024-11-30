import React from 'react';
import logo from '../../asserts/footerLogo.png'
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
  return (
    <nav className="bg-[#302F51] p-4 z-40">
      {/* <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center"> */}
      <div className="container mx-auto ">
        {/* Logo */}
        <div className='flex justify-between md:flex-row flex-col'>

    
        <div className="flex items-center justify-center md:justify-start">
          <Image
            src={logo} // Replace with the actual path to your logo
            alt="Woof Spot"
            className="md:h-32 h-24 w-auto"
          />
         
        </div>

        {/* Email Input and Join Button */}
        <div className="md:grid flex flex-col-reverse text-center gap-4 mt-4 md:gap-0 md:mt-0">
            <div>
              <p className="text-white text-sm ">
           
          </p>
            </div>


          <div className="flex items-end">
          <div className='flex flex-col justify-start items-start gap-2'>

        
          <label htmlFor="email"  className="text-white text-sm "> JOIN OUR FURRY COMMUNITY</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md w-full lg:w-64"
            />  </div>
            <button className="ml-2 p-2 bg-[#F4893D] hover:bg-black text-white rounded-md ">
              JOIN
            </button>
          </div>
        </div>
        </div>
        <div>

        {/* Navigation Links (Hidden on mobile, shown on larger screens) */}
                <div className="hidden lg:flex space-x-4 my-6">
                <Link href="/" className="text-white hover:text-gray-400">Home</Link>
                <Link href="/friends" className="text-white hover:text-gray-400">Friends</Link>
                <Link href="/woof-mail" className="text-white hover:text-gray-400">Woof Mail</Link>
                <Link href="/fetch-worthy-finds" className="text-white hover:text-gray-400">Fetch-Worthy Finds</Link>
                <Link href="/featured-pups" className="text-white hover:text-gray-400">Featured Pups</Link>
                <Link href="/our-pack" className="text-white hover:text-gray-400">Our Pack</Link>
                <Link href="/contact-us" className="text-white hover:text-gray-400">Contact us</Link>
                </div>

                <hr className='my-4 md:block hidden' />
        </div>

        <div className='flex justify-between md:flex-row flex-col-reverse gap-6 md:gap-0'>
                {/* Social Icons */}

                <div className=" text-white md:text-xl text-center">
                © 2024 Woof Spot. All rights reserved.
            </div>




                <div className="flex md:justify-end justify-center  space-x-4 ">
                <FaFacebook className='text-white text-2xl'/>
                <FaYoutube className='text-white text-2xl'/>
                <FaLinkedin className='text-white text-2xl'/>
                <FaInstagram className='text-white text-2xl'/>
                </div>

    
        </div>
        
      </div>

      {/* Footer */}

     


      
    </nav>
  );
};

export default Footer;
