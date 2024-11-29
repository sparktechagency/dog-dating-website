import Image from 'next/image';
import React from 'react';
import banner from '../../asserts/fb1.png'

const FriendBanner = () => {
    return (
<section  className="relative  bg-white  w-full overflow-hidden   ">
    <div  className=" bg-white">
        <Image  className="w-full h-[70vh]  object-cover " alt="Dog Image" src={banner}  />
    </div>

    {/* <div  className="absolute  hidden bg-gradient-to-r md:block"></div> */}

    <div  className="absolute inset-0  bg-black opacity-50"></div>


        <div  className="   absolute bottom-10 left-[13%]">
            <h2 style={{fontSize:"clamp(20px, 3vw + 1rem ,72px)"}}   className="text-white xl:text-[72px] text-fluid-2xl-2 font-bold">Your New Best Friends...</h2>
        </div>
    </section>

    );
};

export default FriendBanner;