import Image from "next/image";
import React from "react";
import dog1 from "../../asserts/b2.png";
import dog2 from "../../asserts/b3.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import HowDoYouPlay from "./HowDoYouPlay";
import * as motion from "framer-motion/client";
import Link from "next/link";

const Containt = () => {
  return (
    <section className="relative  md:pt-[100px] pb-10 bg-[#FFFAF5]">
      <div
        className="md:grid  md:grid-cols-2 flex flex-col-reverse  
    xl:ms-[147.5px] xl:me-[221px] lg:ms-[100px] lg:me-[100px]  md:ms-[50px] 
    md:me-[50px] md:gap-[100px]  gap-[20px]  md:pt-[100px]"
      >
        <div className="relative flex items-end   sm:pb-16 md:justify-center  md:mx-0 mx-auto ">
          <motion.div
          					  initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 , delay: 0.4 }}
          className="">
            <Image
              className="md:w-screen w-[82vw] rounded-lg shadow-lg scale-110"
              objectFit="cover"
              src={dog1}
              alt=""
            />
          </motion.div>
        </div>
        {/* sm:px-6 lg:px-8 sm:py-16 lg:py-24 */}

        <div className="flex items-center justify-center text-center">
          <div className="flex justify-center items-center flex-col text-[#302F51]">
            <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
            className="text-[34px] md:text-fluid-lg-title xl:text-[62px] font-bold flex flex-shrink-0 md:mb-[12px] mb-[20px] md:mx-0 mx-[20px]">
              Add Your Profile
            </motion.h2>
            <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[22px] md:text-fluid-small-title font-semibold md:mb-[30px] mb-[20px]">
              Find new Friends Nearby
            </motion.p>
            <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4}}
            className="text-[16px] md:text-fluid-base text-justify mx-6">
              Become a part of the Woof Spot community! Create a profile for
              your pup and discover dogs near you. Match your dogs play style
              with others for fun playdates and lasting friendships.
            </motion.p>
            <Link href="/friends">
            <button
              className="md:mt-[46.5px] mt-5  text-white no-underline  bg-[#F88D58] hover:bg-black 
                 xl:px-[48px] xl:py-[20px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[48px]  py-[20px] md:mb-0 mb-6 md:text-fluid-button text-[18px] flex justify-center 
                 items-center gap-[16px] rounded-lg "
            >
              Get Started <MdOutlineArrowOutward />
            </button></Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:ms-[183px] md:me-[119px]   md:gap-[100px] gap-[40px] 2xl:mt-[210px] xl:mt-[120px] mt-[20px]">
        {/* sm:px-6 lg:px-8 sm:py-16 lg:py-24 */}

        <div className="flex items-center justify-center text-center">
          <div className="flex justify-center items-center flex-col text-[#302F51]">
            <motion.h2 
                      					  initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8  }}
            className="md:text-fluid-lg-title text-[40px] font-bold flex flex-shrink-0 mb-[30px] text-center md:mx-0 mx-[24px]">
              Connecting Paws, Building Community
            </motion.h2>
            {/* <p  className="text-fluid-small-title font-semibold mb-[30px]">Find new Friends Nearby </p> */}

            <motion.p
                      					  initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 , delay: 0.2 }}
            className="md:text-fluid-base text-[16px]  text-justify mb-[20px] md:mx-0 mx-[20px]">
              For over twenty years, I lived in the same neighborhood, but I
              didn’t know a single neighbor. Life was busy, and connections just
              didn’t happen. Then, three years ago, things changed when the
              tiniest, goofiest puppy came into my life. Neighbors began to stop
              and chat during our walks, and playdates filled our calendar. It
              was a revelation—the love of dogs has the power to bring people
              together.
            </motion.p>
            <motion.p
                      					  initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 , delay: 0.2 }}
            className="md:text-fluid-base text-[16px]  text-justify mb-[20px] md:mx-0 mx-[20px]">
              Dogs bring so much joy into our lives, and they enrich our
              communities in ways we often overlook. They help us forge
              connections, share smiles, and create bonds that last. In
              recognizing the incredible value dogs bring, Woof Spot was born.
            </motion.p>
            <motion.p 
                      					  initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 , delay: 0.2 }}
            className="md:text-fluid-base text-[16px] text-justify md:mx-0 mx-[20px]">
              At Woof Spot, we believe that every dog is unique, with their own
              play styles, social needs, and personalities. Our mission is to
              connect dogs and their owners, fostering friendships that make
              life richer for everyone involved—both two-legged and four-legged.
              Whether it&apos;s finding a playmate for your energetic pup, or
              pal that matches your pup&apos;s playstyle, organizing a
              neighborhood dog walk, or simply meeting other dog lovers in your
              area, Woof Spot is here to help you and your dog make the most of
              your community.
            </motion.p>

            {/* <button className=" text-white no-underline  bg-[#F88D58] hover:bg-black 
                 mt-[66.5px] px-[48px] py-[20px]  text-fluid-button flex justify-center 
                 items-center gap-[16px] rounded-lg">
                                Get Started <MdOutlineArrowOutward /></button> */}
          </div>
        </div>

        <div className="relative flex  items-center md:px-4  sm:pb-16 md:justify-center   md:mx-0 mx-auto">
          <motion.div
                    					  initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.8 , delay: 0.2 }}
          className="">
            <Image
              className="md:w-screen w-[82vw] rounded-lg shadow-lg 
                scale-110"
              objectFit="cover"
              src={dog2}
              alt=""
            />
          </motion.div>
        </div>
      </div>

      {/* <div className='2xl:pt-[210px] lg:pt-[100px] pt-[40px] md:pb-[210px] pb-[20px]'>
        
      <HowDoYouPlay />
    </div > */}
    </section>
  );
};

export default Containt;
