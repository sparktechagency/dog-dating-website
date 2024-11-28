import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { FiCheckCircle } from "react-icons/fi";
const ResetConfirmPage = () => {
    return (
        <div className='flex flex-col justify-center items-center container my-auto mx-auto h-screen'>
            <FiCheckCircle className='my-8 text-7xl bg-[#D1FADF] text-[#039855] rounded-full p-5'/>
            <h1 className='text-3xl font-semibold'>Password reset</h1>
            <p className='mt-4 text-gray-500 text-center'>Your password has been successfully reset. <br /> Click below to log in magically.</p>
       
                        <button className="my-5 btn bg-[#F88D58] hover:bg-black text-white w-full text-xl    max-w-sm ">Continue</button>
                        {/* <h1 className='text-gray-500'>Didn’t receive the email? <button className="text-base  my-2 cursor-pointer text-[#6941C6]">Click to resend</button></h1>
              <button className="flex flex-shrink-0  no-underline text-gray-500   my-2 gap-2"><IoMdArrowBack className='text-2xl' />
              
              <h1 className=''>Back to log in</h1></button> */}

        </div>
    );
};

export default ResetConfirmPage;