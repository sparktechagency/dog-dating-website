"use client";
import React, { useEffect, useRef, useState } from "react";
import img1 from "../../../asserts/fp1.png";
import img2 from "../../../asserts/fp2.png";
import img3 from "../../../asserts/fp3.png";
import img4 from "../../../asserts/fp4.png";
import img5 from "../../../asserts/fp5.png";
import img6 from "../../../asserts/fp6.png";
import img7 from "../../../asserts/fp7.png";
import img8 from "../../../asserts/fp8.png";
import img9 from "../../../asserts/fp9.png";
import Image from "next/image";
import DonateSuccess from "./DonateSuccess";

const DonateNow = (params) => {
  const [donationAmount, setDonationAmount] = useState("160.00");
  // console.log(params.closeModal);
  const { closeModal ,setOpen,setIsOpen,isOpen } = params;

  const handleButtonClick =()=>{
    closeModal();
    setOpen(true);
   console.log(open);  
  }

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



 
  

  const shelters = [
    { id: 1, name: "ABC Shelter", image: img1 },
    { id: 2, name: "ABC Shelter", image: img2 },
    { id: 3, name: "ABC Shelter", image: img3 },
    { id: 4, name: "ABC Shelter", image: img4 },
    { id: 5, name: "ABC Shelter", image: img5 },
    { id: 6, name: "ABC Shelter", image: img6 },
    { id: 7, name: "ABC Shelter", image: img7 },
    { id: 8, name: "ABC Shelter", image: img8 },
    { id: 9, name: "ABC Shelter", image: img9 },
  ];

  const selectedShelter = shelters.find(
    (shelter) => shelter.id === parseInt(params.id)
  );


  return (
    <div ref={containerRef} className="xl:w-[60vw] w-[90vw] lg:h-[90vh] bg-white/30 backdrop-blur-xl rounded-[50px] border-2 border-white  p-10 flex justify-center items-center flex-col md:mt-0 mt-[100px]">
      <button
        className="absolute  lg:top-10  md:top-0 top-2 md:right-10 right-8 font-bold text-2xl text-white"
        onClick={closeModal}
      >
        X
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 xl:w-[50vw] ">
        <Image
          alt={selectedShelter.name}
          src={selectedShelter.image}
          width={0}
          height={0}
          className="object-cover md:ms-0 ms-5 px-2 md:h-[100%] rounded-3xl md:w-full w-52 overflow-hidden mb-4 md:mb-0 md:mr-6 flex justify-center items-center "
        />

        <div className="bg-white  rounded-xl flex flex-col md:gap-[15px] justify-center items-center px-[35px] py-2">
          <h1 className="md:text-[32px] font-extrabold">DONATE NOW</h1>
          <h1 className="text-[14px] font-semibold">
            Shelter Name: istandwithmypack
          </h1>
          <div className="md:text-sm text-[10px] font-normal flex flex-col gap-3 text-justify">
            <p>
              You play a crucial role in our efforts to expose animal cruelty
              and save animal lives.
            </p>
            <p>
              Every animal that we rescue is in desperate need of medical check
              up, and a large number of them are in a need of training before
              they are ready to be placed in their forever homes.
            </p>
            <p>
              Behavioral issues are a response to the trauma they experienced
              during their time at the shelter and after being abandoned. Your
              donation helps us rehabilitate our animals and restore trust in
              humans.
            </p>
            <p className="font-semibold text-[14px]">Donation Amount</p>
          <div className="relative">
            <input
                        value={`${donationAmount}`}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        type="text"
                        className="ring-2 w-1/2 ring-[#F88D58] rounded-lg px-2 ps-6 py-1 focus:outline-none  focus:ring-[#F88D58]"
                      />

                      <p className="absolute left-3 top-1/2 -translate-y-1/2 ">$</p>
          </div>
            
          </div>
          <div className="w-full flex justify-end ">
            <button
              onClick={handleButtonClick }
              className="md:mt-0 mt-3  text-white no-underline  bg-[#F88D58] hover:bg-black 
                xl:px-[48px] xl:py-[20px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[10px]  py-[8px] md:mb-0 mb-4 lg:text-fluid-button text-[18px] flex  
                 items-center md:gap-[16px] gap-[4px] rounded-lg  flex-shrink-0  "
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DonateNow;
