import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { FiKey } from "react-icons/fi";
import Link from 'next/link';
const SetNewPassword = () => {
    return (
        <div className='flex flex-col justify-center items-center container my-auto mx-auto h-screen'>
            <FiKey className='my-8 text-7xl bg-[#FFF5ED] text-[#F88D58] rounded-full p-5'/>
            <h1 className='text-3xl font-semibold'>Set new password</h1>
            <p className='mt-4 text-gray-500 text-center'>Your new password must be different to 
                <br />previously used passwords.</p>
            <form action="" className="w-full max-w-sm">
                        {/* Password */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                name="password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className='text-left'>
                        <h1 className="text-gray-500   -mt-3 mb-5">Must be at least 8 characters.</h1>
                        </div>
                        {/* Confirm Password */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="email"
                                placeholder="confirm passsword"
                                name="email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <button className="btn bg-[#F88D58] hover:bg-black text-white w-full text-xl  ">Reset password</button>

              </form>        
              <Link href={'/login'}>
              <button className="flex flex-shrink-0  no-underline text-gray-500   my-2 gap-2 mt-5"><IoMdArrowBack className='text-2xl' />
              <h1 className=''>Back to log in</h1></button>
              </Link>

        </div>
    );
};
export default SetNewPassword;