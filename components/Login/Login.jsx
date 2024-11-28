import Image from 'next/image';
import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import loginImg from "../../asserts/login-img.png";
import logo from "../../asserts/logo.png";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const Login = () => {
    return (
        <div className='container mx-auto pt-5'>
            {/*Back Home button */}
            <Link href={'/'}>
           
            <div className='flex flex-shrink-0 items-center text-xl text-[#656565] gap-4 font-bold cursor-pointer'>
                <IoMdArrowBack className='text-3xl' />
                <h1 className=''>Back To Home</h1>
            </div> 
            </Link>
            {/* Main content */}
            <div className='flex gap-8'>
                {/* Left side Image */}
                <div className=' md:block hidden w-1/2 my-auto'>
                <div className='flex flex-col justify-end mt-10 '>
                    <Image alt='dog-Image' src={loginImg} className='object-cover aspect-square rounded shadow-xl' />
                </div>
                </div>

                {/* Right side login functionality */}
                <div className='flex-1 flex flex-col justify-center items-center  mx-2'>
                    <div className='mb-5 '>
                        <Image alt='dog-Image' src={logo} className='w-52 ' />
                    </div>
                    <h1 className='text-4xl font-bold mb-2 md:mt-16 mt-8'>Log in</h1>
                    <p className='text-gray-600 mb-4 text-xl'>Welcome back! Please enter your details.</p>
                    <form action="" className="w-full max-w-sm">
                        {/* Email */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
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
                        <div className="form-control md:mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className='text-right'>
                        <Link href={'/login/forgot-password'}>
                        <button className="btn btn-link no-underline text-[#F88D58]  md:text-xl md:my-2">Forgot password</button>
                        </Link>
                        </div>
                        <button className="btn bg-[#F88D58] hover:bg-black text-white w-full text-xl  ">Sign in</button>
                    </form>
                        <button className="btn bg-white text-gray-600 w-full text-xl max-w-sm mt-8 border-gray-300"><FcGoogle className='text-4xl' /> Sign in With Google</button>
                        <Link href={'/sign-up'}>
                        <h1 className='text-gray-500'>
                            Don’t have an account?
                            <button className="btn btn-link no-underline
                             text-[#F88D58]  md:text-xl my-2">
                                sign up</button>
                        </h1>
                       </Link>


                    {/* <GoogleLogin/> */}
                </div>
            </div>
        </div>
    );
};

export default Login;
