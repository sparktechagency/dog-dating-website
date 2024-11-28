import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { CiMail } from "react-icons/ci";

const CheckYourMail = () => {
    return (
        <div className='flex flex-col justify-center items-center container my-auto mx-auto h-screen'>
            <CiMail className='my-8 text-7xl bg-[#FFF5ED] text-[#F88D58] rounded-full p-5'/>
            <h1 className='text-3xl font-semibold'>Check your email</h1>
            <p className='mt-4 text-gray-500 text-center'>We sent a password reset link to <br /> olivia@untitledui.com</p>
       
                        <button className="my-5 btn bg-[#F88D58] hover:bg-black text-white w-full text-xl    max-w-sm ">Open email app</button>
                        <h1 className='text-gray-500'>Didn’t receive the email? <button className="text-base  my-2 cursor-pointer text-[#6941C6]">Click to resend</button></h1>
              <button className="flex flex-shrink-0  no-underline text-gray-500   my-2 gap-2"><IoMdArrowBack className='text-2xl' />
              
              <h1 className=''>Back to log in</h1></button>

        </div>
    );
};
export default CheckYourMail;