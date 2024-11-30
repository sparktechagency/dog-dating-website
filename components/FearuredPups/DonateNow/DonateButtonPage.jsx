"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DonateButtonPage = (params) => {
    const [donationAmount, setDonationAmount] = useState("160.00");
    // console.log(params.closeModal);
    const { closeModal, setOpen, setIsOpen, isOpen } = params;
  
    const handleButtonClick = () => {
      closeModal();
      setOpen(true);
      console.log(open);
    };
  
    const containerRef = useRef(null); // Ref for the dropdown
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
    }, [isOpen, setIsOpen]);
    return (
        <div
        ref={containerRef}
        className="xl:w-[60vw] w-[90vw] lg:h-[90vh] bg-white/30 backdrop-blur-xl rounded-[50px] border-2 border-white  p-10 flex justify-center items-center flex-col md:mt-0 mt-[100px]"
      >
        <button
          className="absolute  lg:top-10  md:top-0 top-2 md:right-10 right-8 font-bold text-2xl text-white"
          onClick={closeModal}
        >
          X
        </button>
  
        <div className="grid grid-cols-1  md:gap-16 xl:w-[50vw] ">
          {/* <Image
            alt={selectedShelter.name}
            src={selectedShelter.image}
            width={0}
            height={0}
            className="object-cover md:ms-0 ms-5 px-2 md:h-[100%] rounded-3xl md:w-full w-52 overflow-hidden mb-4 md:mb-0 md:mr-6 flex justify-center items-center "
          /> */}
  
          <div className="bg-white mx-auto md:py-20 py-8 rounded-xl flex flex-col md:gap-[15px] justify-center items-center px-[35px]  lg:w-[60%]">
            <h1 className="md:text-[32px] font-extrabold">DONATE NOW</h1>
  
            <div className="md:text-md text-[12px] font-normal flex flex-col gap-3 text-justify">
              {/* <h1 className="text-[18px] font-semibold text-start">
                Name: 
              </h1>
              <p className="font-semibold text-[18px]">
                Age: 
              </p> */}
  
              <p>Your donation helps give shelter dogs the care and love they need while waiting for their forever homes. Every contribution makes a tail wag and a heart hopeful. Click below to make a difference today!</p>
  
              <div className="relative">
              <input
                          value={`${donationAmount}`}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          type="text"
                          className="ring-2 w-1/2 ring-[#F88D58] rounded-lg px-2 ps-5 py-1 focus:outline-none  focus:ring-[#F88D58]"
                        />
  
                        <p className="absolute left-3 top-1/2 -translate-y-1/2 ">$</p>
            </div>
            </div>
            {/* <Link href={selectedShelter.link}> */}
              <div className="w-full flex justify-end ">
                <button
                  onClick={handleButtonClick }
                  className="md:mt-0 mt-3  text-white no-underline  bg-[#F88D58] hover:bg-black 
                  xl:px-[48px] xl:py-[16px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[10px]  py-[8px] md:mb-0 mb-4 lg:text-fluid-button text-[18px] flex  
                   items-center md:gap-[16px] gap-[4px] rounded-lg  flex-shrink-0  "
                >
                   Donate
                </button>
              </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    );
};

export default DonateButtonPage;