import Image from 'next/image';
import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import loginImg from "../../asserts/Signup-img.png";
import logo from "../../asserts/logo.png";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';


const SignUp = () => {
    return (
        <div className='container mx-auto pt-5'>
            {/* sign in Back button */}
            <Link href={'/'}>
          
                <div className='flex flex-shrink-0 items-center text-xl text-[#656565] gap-4 font-bold'>
                    <IoMdArrowBack className='text-3xl' />
                    <h1 className=''>Back To Home</h1>
                </div> 
            </Link>
            {/* Main content */}
            <div className='flex gap-8 flex-row-reverse'>
                {/* Right side Image */}
                <div className='md:block hidden  w-1/2 my-auto'>
                <div className='flex flex-col justify-end mt-10'>

                    <Image alt='dog-Image' src={loginImg} className='object-cover aspect-square rounded shadow-xl' />
                </div>
                </div>

                {/* Left side signup functionality */}
                <div className='flex-1 flex flex-col justify-center items-center mx-2 '>
                    <div className='mb-5 '>
                        <Image alt='dog-Image' src={logo} className='w-52 ' />
                    </div>
                    <h1 className='text-4xl font-bold mb-7 text-center flex flex-shrink-0'>Create an account</h1>
                    {/* <p className='text-gray-600 mb-4 text-xl'>Welcome back! Please enter your details.</p> */}
                    <form action="" className="w-full max-w-sm">
                        {/* Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                name="name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        {/* Email */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your unique user name"
                                name="userName"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        {/* Email */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        {/* Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className='text-left'>
                        <h1 className="text-gray-500  -mt-3  mb-5">Must be least 8 characters.</h1>
                        </div>
                        <button className="btn bg-[#F88D58] hover:bg-black text-white w-full text-xl">Sign in</button>
                    </form>
                        <button className="btn bg-white text-gray-600 w-full text-xl max-w-sm mt-8 border-gray-300"><FcGoogle className='text-4xl' /> Sign in With Google</button>
                        <h1 className='text-gray-500'>
                            Already have an account?
                            <Link href={'/login'}>
                            <button className="btn btn-link no-underline 
                            text-[#F88D58]  my-2">
                                Log in
                            </button>
                            </Link>
                        </h1>

                    {/* <GoogleLogin/> */}
                </div>
            </div>
        </div>
    );
};

export default SignUp;