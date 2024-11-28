import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { FiKey } from "react-icons/fi";
import Link from 'next/link';

const ForgotPass = () => {
    return (
        <div className='flex flex-col justify-center items-center container my-auto mx-auto h-screen'>
            <FiKey className='my-8 text-8xl bg-[#FFF5ED] text-[#F88D58] rounded-full p-6'/>
            <h1 className='text-3xl font-semibold'>Forgot password?</h1>
            <p className='mt-4 text-gray-500'>No worries, we&apos;ll send yoy rest instructions.</p>
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
                        <button className="btn bg-[#F88D58] hover:bg-black text-white w-full text-xl  ">Submit</button>

              </form>          
              <Link href={'/login'}>
              <button className="flex flex-shrink-0  no-underline text-gray-500   my-2 gap-2"><IoMdArrowBack className='text-2xl' />
              <h1 className=''>Back to log in</h1></button>
              </Link>

        </div>
    );
};

export default ForgotPass;