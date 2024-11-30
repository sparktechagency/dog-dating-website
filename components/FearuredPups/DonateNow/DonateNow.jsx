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

const DonateNow = (params) => {
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

  const shelters = [
    {
      id: 1,
      name: "Tommy",
      image: img1,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 2,
      name: "Tommy",
      image: img2,
      age: 3,
      link: "https://sarvoham.org/adopt-5-star/",
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 3,
      name: "Tommy",
      image: img3,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 4,
      name: "Tommy",
      image: img4,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 5,
      name: "Tommy",
      image: img5,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 6,
      name: "Tommy",
      image: img6,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 7,
      name: "Tommy",
      image: img7,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 8,
      name: "Tommy",
      image: img8,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
    {
      id: 9,
      name: "Tommy",
      image: img9,
      link: "https://sarvoham.org/adopt-5-star/",
      age: 3,
      description:
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
    },
  ];

  const selectedShelter = shelters.find(
    (shelter) => shelter.id === parseInt(params.id)
  );

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

      <div className="md:grid  md:grid-cols-2 flex flex-col justify-center items-center md:gap-16 xl:w-[50vw] ">
        <Image
          alt={selectedShelter.name}
          src={selectedShelter.image}
          width={0}
          height={0}
          className="object-cover  px-2 md:h-[100%] rounded-3xl md:w-full aspect-square  overflow-hidden mb-4 md:mb-0 md:mr-6 flex justify-center items-center "
        />

        <div className="bg-white  rounded-xl flex flex-col md:gap-[15px] justify-center items-center px-[35px] py-2">
          <h1 className="text-[32px] font-extrabold">Adapt This Pup</h1>

          <div className="md:text-sm text-[10px] font-normal flex flex-col gap-3 text-justify ">
            <h1 className="text-[18px] font-semibold text-start">
              Name: {selectedShelter.name}
            </h1>
            <p className="font-semibold text-[18px]">
              Age: {selectedShelter.age}
            </p>

            <p>{selectedShelter.description}</p>

            {/* <div className="relative">
            <input
                        value={`${donationAmount}`}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        type="text"
                        className="ring-2 w-1/2 ring-[#F88D58] rounded-lg px-2 ps-6 py-1 focus:outline-none  focus:ring-[#F88D58]"
                      />

                      <p className="absolute left-3 top-1/2 -translate-y-1/2 ">$</p>
          </div> */}
          </div>
          <Link href={selectedShelter.link}>
            <div className="w-full flex justify-end ">
              <button
                // onClick={handleButtonClick }
                className="md:mt-0 mt-3  text-white no-underline  bg-[#F88D58] hover:bg-black 
                xl:px-[48px] xl:py-[16px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[10px]  py-[8px] md:mb-0 mb-4 lg:text-fluid-button text-[18px] flex  
                 items-center md:gap-[16px] gap-[4px] rounded-lg  flex-shrink-0  "
              >
                Go to shelter
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateNow;
