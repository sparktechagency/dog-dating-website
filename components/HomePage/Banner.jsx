import * as motion from "framer-motion/client"
import React from 'react';
import Image from 'next/image';
import logo from "../../asserts/banner.png";

const Banner = () => {
  return (
    <div className="relative md:h-[90vh] w-full overflow-hidden ">
      {/* Background Image */}
      <div
      className="absolute  w-full h-full md:block hidden"> {/* Adjust top to move up */}
        <Image
          src={logo}
          alt="Dog Banner"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>

      <div
      className=" md:hidden m-5 md:mt-40 "> {/* Adjust top to move up */}
        <Image
          src={logo}
          alt="Dog Banner"
          className="object-right-top rounded-xl "
        />
      </div>




      <div  className="md:block hidden md:absolute inset-0 bg-black opacity-30"></div> 
      {/* Text Overlay */}
      <div  className="absolute inset-0 flex items-center justify-start left-[8%] md:top-[20%] -top-[18%] z-10">
        <motion.h1
                        					  initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 , delay: 0.4 }}
        style={{fontSize:"clamp(20px, 3vw + 1rem ,85px)"}} className="text-white font-inter font-bold md:mx-0 mx-auto  md:text-start text-center  leading-tight">
          YOUR BEST <br /> FRIEND DESERVES <br /> THEIR BEST DAY
        </motion.h1>
      </div>
    </div>
  );
};

export default Banner;
