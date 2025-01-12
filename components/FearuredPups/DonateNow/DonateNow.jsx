"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import img1 from "../../../asserts/fp1.png";
import img2 from "../../../asserts/fp2.png";
import img3 from "../../../asserts/fp3.png";
import img4 from "../../../asserts/fp4.png";
import img5 from "../../../asserts/fp5.png";
import img6 from "../../../asserts/fp6.png";
import img7 from "../../../asserts/fp7.png";
import img8 from "../../../asserts/fp8.png";
import img9 from "../../../asserts/fp9.png";
import svg from "../../../asserts/paw.svg";
import { getImageUrl } from "@/helpers/config/envConfig";

const DonateNow = (params) => {
  const [donationAmount, setDonationAmount] = useState("160.00");

  const { closeModal, setOpen, setIsOpen, isOpen, selectedShelter } = params;

  const handleButtonClick = () => {
    closeModal();
    setOpen(true);
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

  const url = getImageUrl();

  return (
    <div
      ref={containerRef}
      className="relative xl:w-[60vw] w-[90vw] md:h-[90vh] h-full bg-white/30 backdrop-blur-xl md:rounded-[50px] rounded-xl border-2 border-white  p-10 flex justify-center items-center flex-col overflow-hidden overflow-y-auto "
    >
      <button
        className="absolute z-50 lg:top-10  md:top-0 top-2 md:right-10 right-3 font-bold text-2xl text-white"
        onClick={closeModal}
      >
        X
      </button>

      <div className="   max-w-2xl   md:p-10 overflow-y-auto">
        <div className="bg-[#F88D58] rounded-t-lg p-6 ">
          <div className="flex gap-6 items-center md:items-start sm:flex-row flex-col">
            <div className="w-48 h-48 relative rounded-lg overflow-hidden flex-shrink-0 border-2 shadow-xl">
              <Image
                src={url + selectedShelter?.image}
                alt={selectedShelter?.name}
                className="object-cover object-top"
                fill
              />
            </div>
            <div className="flex-1 ">
              <h1 className="md:text-4xl text-2xl font-bold text-black mb-4">
                {selectedShelter?.name}{" "}
              </h1>
              <div className="space-y-2 text-white ">
                <p className="md:text-xl text-lg">
                  Age:{" "}
                  <span className="text-black"> {selectedShelter?.age}</span>
                </p>
                <p className="md:text-xl text-lg">
                  Gender:
                  <span className="text-black">
                    {selectedShelter?.gender}
                  </span>{" "}
                </p>
                <p className="md:text-xl text-lg">
                  Size:{" "}
                  <span className="text-black"> {selectedShelter?.size}</span>{" "}
                </p>
                <p className="md:text-xl text-lg">
                  City:{" "}
                  <span className="text-black">{selectedShelter?.city}</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-b-lg p-6 space-y-6 bg-white">
          <div className=" border border-[#F88D58] shadow-lg rounded-lg p-4">
            <p className="text-gray-700 md:text-lg text-start ">
              {selectedShelter?.description}
            </p>
          </div>

          <div className="space-y-4 flex flex-col md:text-base text-sm ">
            {/* <div className="flex  gap-3 text-start">
              <div className="flex gap-1 items-start  justify-center">
                <Image alt="friend" src={svg} className="w-5" />
                <span className="font-medium">Spayed/Neutered:</span>
              </div>

              <span className="text-[#F88D58]">
                {selectedShelter?.preferences.spayedNeutered}
              </span>
            </div>

            <div className="flex  gap-3 text-start">
              <div className="flex gap-1 items-start justify-center">
                <Image alt="friend" src={svg} className="w-5" />
                <span className="font-medium">How do you play:</span>
              </div>

              <span className="text-[#F88D58]">
                {selectedShelter?.preferences.playStyle}
              </span>
            </div>

            <div className="flex  text-start gap-3">
              <div className="flex gap-1 items-start justify-center">
                <Image alt="friend" src={svg} className="w-5" />
                <span className="font-medium">Do you like a crowd:</span>
              </div>
              <span className="text-[#F88D58]">
                {selectedShelter?.preferences.crowdPreference}
              </span>
            </div>

            <div className="flex  gap-3 text-start">
              <div className="flex gap-1 justify-center items-start">
                <Image alt="friend" src={svg} className="w-5" />
                <span className="font-medium ">Play/Size preferences:</span>
              </div>
              <span className="text-[#F88D58]">
                {" "}
                {selectedShelter?.preferences.sizePreference}
              </span>
            </div>

            <div className="flex  gap-3 text-start">
              <div className="flex gap-1 items-start justify-center">
                <Image alt="friend" src={svg} className="w-5" />
                <span className="font-medium">Location preferences:</span>
              </div>
              <span className="text-[#F88D58]">
                {" "}
                {selectedShelter?.preferences.locationPreference}
              </span>
            </div> */}
            <Link href={selectedShelter?.shelterLink} target="_blank">
              <div className="w-full  ">
                <button
                  className="mt-3 w-full text-center  text-white no-underline  bg-[#F88D58] hover:bg-black
        xl:px-[48px] xl:py-[16px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[10px]  py-[8px] md:mb-0 mb-4 text-[18px]
           md:gap-[16px] gap-[4px] rounded-lg  flex-shrink-0  "
                >
                  Fetch My Info
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateNow;
