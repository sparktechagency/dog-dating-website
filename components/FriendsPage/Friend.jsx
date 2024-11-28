"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoIosHeart } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { PiMapPinAreaFill } from "react-icons/pi";
import img1 from "../../asserts/f1.png";
import img2 from "../../asserts/f2.png";
import Link from "next/link";

const mypetInfo = {
  name: "Murphy Bear",
  age: 2,
  location: "Houston, TX",
  img: img1,
};

const Friend = ({ petPartner, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const containerRef = useRef(null); // Ref for the dropdown

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);



  

  return (
    <div
      className="grid md:grid-cols-3 bg-white 
            container mx-auto shadow-lg rounded-lg py-[29px] px-[46px] mt-[50px]"
    >
      <div className="text-center flex justify-center items-center flex-col">
        {/* Profile Image Wrapper */}
        <div
          className="
                    relative rounded-full overflow-hidden                   
                    border-[3px] border-solid border-[#F88D58]           
                    shadow-[1px_0px_0px_rgba(248,141,88,0.08)] 

                    /* Responsive Sizes */
                    w-[200px] h-[200px] /* Default size for small screens */
                    sm:w-[240px] sm:h-[240px]
                    md:w-[280px] md:h-[280px]
                    lg:w-[320px] lg:h-[320px]
                "
        >
          <Image
            alt={mypetInfo?.name}
            src={mypetInfo?.img}
            objectFit="cover" /* Cover the container */
            className="rounded-full " /* Ensures circular shape */
          />
        </div>

        {/* Profile Information */}
        <p style={{fontSize:"clamp(14px, 3vw + 1rem ,30px)"}}  className=" font-semibold text-[#302F51]">
          {mypetInfo?.name}
        </p>
        <p style={{fontSize:"clamp(14px, 3vw + 1rem ,30px)"}}  className=" font-semibold text-[#302F51]">
          Age: {mypetInfo?.age}
        </p>
        <p style={{fontSize:"clamp(14px, 3vw + 1rem ,30px)"}}  className=" font-semibold flex justify-center items-center gap-2 text-[#302F51]">
          <PiMapPinAreaFill className="text-[#F88D58]" /> {mypetInfo?.location}
        </p>
      </div>

      <div className="flex justify-top items-center flex-col gap-1 md:mb-0 mb-[40px]">
        <p className="bg-[#F88D58] rounded-full py-4 px-6 text-white font-bold ">
          {index + 1}
        </p>
        <IoIosHeart className="text-red-600 text-[80px] md:mt-[68px] mt-[40px] " />
        <p className="text-fluid-button font-bold">Matched</p>
        <div className="flex justify-center items-center gap-[11px]">
          {/* <RiPinDistanceFill className='text-[#F88D58] text-7xl'/> */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="50"
            viewBox="0 0 51 50"
            fill="none"
          >
            <g clip-path="url(#clip0_978_4806)">
              <path
                d="M42.1667 0C37.5718 0 33.8334 3.73838 33.8334 8.3333C33.8334 12.319 39.7386 20.3859 41.1222 22.222C41.1218 22.815 41.1222 23.3974 41.1078 23.9318C41.0926 24.5065 41.5463 24.9857 42.122 25.001H42.1505C42.712 25.001 43.1759 24.5523 43.1911 23.9868C43.2055 23.4384 43.2051 22.8397 43.2055 22.2298C44.5799 20.4063 50.5 12.3237 50.5 8.3333C50.5 3.73838 46.7616 0 42.1667 0ZM42.1667 10.4167C41.0183 10.4167 40.0834 9.48184 40.0834 8.3334C40.0834 7.18496 41.0183 6.2501 42.1667 6.2501C43.3151 6.2501 44.25 7.18486 44.25 8.3333C44.25 9.48184 43.3151 10.4167 42.1667 10.4167ZM32.3848 30.0222C30.6656 30.9978 29.7104 32.6914 29.1407 33.8796C28.8915 34.3984 29.1102 35.021 29.629 35.2691C29.7523 35.3284 29.886 35.3627 30.0226 35.3703C30.1592 35.3778 30.2959 35.3583 30.425 35.313C30.554 35.2676 30.6729 35.1973 30.7747 35.106C30.8766 35.0147 30.9594 34.9042 31.0186 34.7809C31.7418 33.2723 32.4804 32.3639 33.4142 31.8328C33.9137 31.549 34.0896 30.9132 33.8048 30.4127C33.5221 29.9123 32.8883 29.7363 32.3848 30.0222ZM22.905 45.1446C21.8612 45.9717 20.6752 46.5942 19.2774 47.0489C18.7302 47.227 18.4311 47.8149 18.6091 48.3622C18.7525 48.8017 19.1604 49.0814 19.5999 49.0814C19.7067 49.0814 19.8155 49.0651 19.9224 49.0306C21.5367 48.5057 22.9751 47.7479 24.1989 46.7783C24.6496 46.4202 24.7259 45.7651 24.3688 45.3145C24.0087 44.8649 23.3546 44.7846 22.905 45.1446ZM28.7786 37.5428C28.2395 37.3332 27.6393 37.6008 27.4308 38.1379C26.9639 39.3443 26.38 40.7512 25.5926 42.04C25.2925 42.5313 25.4481 43.1723 25.9385 43.4724C26.1016 43.5724 26.2893 43.6252 26.4807 43.625C26.8316 43.625 27.1744 43.4479 27.3708 43.1266C28.2437 41.6963 28.8732 40.1826 29.3737 38.8907C29.5812 38.3545 29.3147 37.7513 28.7786 37.5428ZM41.7801 27.4435C41.307 27.123 40.657 27.2461 40.3335 27.7222C39.9907 28.2288 39.2888 28.9256 37.1657 29.1158C36.593 29.1677 36.1698 29.6732 36.2217 30.247C36.2705 30.7882 36.7252 31.195 37.2583 31.195C37.2898 31.195 37.3214 31.194 37.3529 31.1909C39.6082 30.9885 41.1473 30.2357 42.0588 28.8898C42.3813 28.4139 42.2562 27.7659 41.7801 27.4435ZM15.4683 47.9302C18.7551 44.4251 25.5 36.3614 25.5 29.1667C25.5 22.1578 20.0089 16.6667 13 16.6667C5.99111 16.6667 0.5 22.1578 0.5 29.1667C0.5 38.4064 11.6395 49.1028 12.262 49.6931L12.2657 49.6968L12.285 49.7152C12.328 49.7562 12.3817 49.7751 12.4295 49.8071C12.4886 49.847 12.542 49.8939 12.6089 49.9212C12.7344 49.9722 12.8666 50 13 50C13.7589 50 14.4801 49.9735 15.1637 49.9217C15.7374 49.8779 16.1677 49.3784 16.1239 48.8047C16.0927 48.3941 15.827 48.0739 15.4683 47.9302ZM13 35.4167C9.55352 35.4167 6.75 32.6132 6.75 29.1667C6.75 25.7202 9.55352 22.9167 13 22.9167C16.4465 22.9167 19.25 25.7202 19.25 29.1667C19.25 32.6131 16.4465 35.4167 13 35.4167Z"
                fill="#F88D58"
              />
            </g>
            <defs>
              <clipPath id="clip0_978_4806">
                <rect
                  width="50"
                  height="50"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <p className="font-semibold text-fluid-lg-title-2 my-[27px]">
            {petPartner?.distance} Miles
          </p>
        </div>
        {/* <button className="btn text-white no-underline bg-[#F88D58] hover:bg-black my-2">
                    Message Me <MdOutlineArrowOutward />
                </button> */}

        <button
          onClick={openModal}
          className=" text-white no-underline  bg-[#F88D58] hover:bg-black 
                xl:px-[48px] xl:py-[20px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[48px]  py-[20px] md:mb-0 mb-4 lg:text-fluid-button text-[18px] flex justify-center 
                 items-center md:gap-[16px] gap-[4px] rounded-lg  flex-shrink-0"
        >
          Message Me
          <MdOutlineArrowOutward />
        </button>
      </div>
      <Link href={`/friends/${petPartner.id}`}>
        <div className="text-center flex justify-center items-center flex-col">
          <div
            className="
                          relative rounded-full overflow-hidden                   
                          border-[3px] border-solid border-[#F88D58]           
                          shadow-[1px_0px_0px_rgba(248,141,88,0.08)] 

                          /* Responsive Sizes */
                          w-[200px] h-[200px] /* Default size for small screens */
                          sm:w-[240px] sm:h-[240px]
                          md:w-[280px] md:h-[280px]
                          lg:w-[320px] lg:h-[320px]
                      "
          >
            <Image
              alt="profile"
              src={petPartner?.img}
              layout="fill" /* Fill the container */
              objectFit="cover" /* Cover the container */
              className="rounded-full" /* Ensures circular shape */
            />
          </div>
          <p  style={{fontSize:"clamp(14px, 3vw + 1rem ,30px)"}}   className=" font-semibold text-[#302F51]">
            {petPartner?.name}
          </p>
          <p  style={{fontSize:"clamp(14px, 3vw + 1rem ,30px)"}}   className="font-semibold text-[#302F51]">
            Age: {petPartner?.age}
          </p>
          <p  style={{fontSize:"clamp(14px, 3vw + 1rem ,30px)"}}   className=" font-semibold flex justify-center items-center gap-2 text-[#302F51]">
            <PiMapPinAreaFill className="text-[#F88D58]" />{" "}
            {petPartner?.location}
          </p>
        </div>
      </Link>

      {isOpen && (
        <div className="  fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            ref={containerRef}
            className="bg-[#FFFAF5] relative  lg:py-[100px]  rounded-lg shadow-xl lg:w-[70vw]"
          >
            <div className="absolute  lg:top-10 lg:right-10 top-2 md:right-4 right-3 z-50">
              <button
                onClick={closeModal}
                className=" text-gray-400 hover:text-gray-600 text-2xl "
              >
                X<span className="sr-only">Close</span>
              </button>
            </div>
            <div className="relative p-6 lg:max-w-4xl mx-auto ">
              <h2 className="lg:text-[40px] font-semibold text-center mb-4  ">
                Disclaimer
              </h2>
              <p className="lg:text-[22px] text-sm text-gray-600 text-justify mb-6 leading-normal  mx-auto">
                Woof Spot is designed to help dog owners connect with others in
                their community for activities like walks, hikes, and playdates.
                While we encourage positive interactions, it is important to use
                caution when meeting new people and dogs. Woof Spot does not vet
                users or guarantee the safety, behavior,or reliability of any
                individuals or their pets. By using our platform, you agree that
                Woof Spot is not responsible or liable for any negative
                experiences, injuries, or disputes that may arise from
                interactions between users. Always prioritize safety and good
                judgment when arranging meetups.
              </p>
              <div className="flex justify-end">
                <button
                  className=" text-white no-underline  bg-[#F88D58] hover:bg-black 
                xl:px-[48px] xl:py-[20px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[10px]  py-[8px] md:mb-0 mb-4 lg:text-fluid-button text-[18px] flex justify-center 
                 items-center md:gap-[16px] gap-[4px] rounded-lg  flex-shrink-0  "
                >
                  Message Me
                  <MdOutlineArrowOutward />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friend;
