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

  // const shelters = [
  //   {
  //     id: 1,
  //     name: "Tommy",
  //     image: img1,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 2,
  //     name: "Tommy",
  //     image: img2,
  //     age: 3,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 3,
  //     name: "Tommy",
  //     image: img3,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 4,
  //     name: "Tommy",
  //     image: img4,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 5,
  //     name: "Tommy",
  //     image: img5,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 6,
  //     name: "Tommy",
  //     image: img6,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 7,
  //     name: "Tommy",
  //     image: img7,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 8,
  //     name: "Tommy",
  //     image: img8,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  //   {
  //     id: 9,
  //     name: "Tommy",
  //     image: img9,
  //     link: "https://sarvoham.org/adopt-5-star/",
  //     age: 3,
  //     description:
  //       "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
  //   },
  // ];

  const shelters = [
    {
      id: 1,
      name: "Memo",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Small (10-30 lbs)",
      breed: "Corgi",
      location: "Houston, TX",
      img: img1,
      description:
        "Memo is a small-sized male Corgi, weighing between 10-30 lbs, and located in Houston, TX. He is neutered, loves playing fetch, enjoys the company of small crowds, and gets along well with other small-sized dogs.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Focused Play; throw the ball!",
        crowdPreference: "I prefer one friend at a time",
        sizePreference: "I'm comfortable with friends my own size.",
        locationPreference: "Backyard/Home playdate",
      },
    },
    {
      id: 2,
      name: "Jack",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Medium (30-50 lbs)",
      breed: "Beagle",
      location: "Houston, TX",
      img: img2,
      description:
        "Jack is a medium-sized male Beagle, weighing between 30-50 lbs, and located in Houston, TX. He loves sniffing around, enjoys a good chase, and prefers an open space to run.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Running and chasing",
        crowdPreference: "I love being in a pack!",
        sizePreference: "No preference, I get along with all sizes.",
        locationPreference: "Dog park or open fields",
      },
    },
    {
      id: 3,
      name: "Lily",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Female",
      size: "Small (10-30 lbs)",
      breed: "French Bulldog",
      location: "Houston, TX",
      img: img3,
      description:
        "Lily is a small-sized female French Bulldog, weighing between 10-30 lbs, and located in Houston, TX. She is calm, enjoys short play sessions, and loves being around familiar faces.",
      preferences: {
        spayedNeutered: "No",
        playStyle: "Short play sessions with lots of cuddles",
        crowdPreference: "Prefers smaller groups",
        sizePreference: "Comfortable with dogs her size or smaller.",
        locationPreference: "Indoor play or fenced backyard",
      },
    },
    {
      id: 4,
      name: "Sparrow",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Large (50-70 lbs)",
      breed: "Golden Retriever",
      location: "Houston, TX",
      img: img4,
      description:
        "Sparrow is a large-sized male Golden Retriever, weighing between 50-70 lbs, and located in Houston, TX. He is very friendly, loves to swim, and enjoys playing with other dogs of all sizes.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Swimming and fetching toys",
        crowdPreference: "Happy in both large and small groups",
        sizePreference: "Gets along with all dogs, no size preference",
        locationPreference: "Beach or large park with water access",
      },
    },
    {
      id: 5,
      name: "Sparrow",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Large (50-70 lbs)",
      breed: "Golden Retriever",
      location: "Houston, TX",
      img: img5,
      description:
        "Sparrow is a large-sized male Golden Retriever, weighing between 50-70 lbs, and located in Houston, TX. He is very friendly, loves to swim, and enjoys playing with other dogs of all sizes.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Swimming and fetching toys",
        crowdPreference: "Happy in both large and small groups",
        sizePreference: "Gets along with all dogs, no size preference",
        locationPreference: "Beach or large park with water access",
      },
    },
    {
      id: 6,
      name: "Sparrow",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Large (50-70 lbs)",
      breed: "Golden Retriever",
      location: "Houston, TX",
      img: img6,
      description:
        "Sparrow is a large-sized male Golden Retriever, weighing between 50-70 lbs, and located in Houston, TX. He is very friendly, loves to swim, and enjoys playing with other dogs of all sizes.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Swimming and fetching toys",
        crowdPreference: "Happy in both large and small groups",
        sizePreference: "Gets along with all dogs, no size preference",
        locationPreference: "Beach or large park with water access",
      },
    },
    {
      id: 7,
      name: "Sparrow",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Large (50-70 lbs)",
      breed: "Golden Retriever",
      location: "Houston, TX",
      img: img7,
      description:
        "Sparrow is a large-sized male Golden Retriever, weighing between 50-70 lbs, and located in Houston, TX. He is very friendly, loves to swim, and enjoys playing with other dogs of all sizes.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Swimming and fetching toys",
        crowdPreference: "Happy in both large and small groups",
        sizePreference: "Gets along with all dogs, no size preference",
        locationPreference: "Beach or large park with water access",
      },
    },
    {
      id: 8,
      name: "Sparrow",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Large (50-70 lbs)",
      breed: "Golden Retriever",
      location: "Houston, TX",
      img: img8,
      description:
        "Sparrow is a large-sized male Golden Retriever, weighing between 50-70 lbs, and located in Houston, TX. He is very friendly, loves to swim, and enjoys playing with other dogs of all sizes.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Swimming and fetching toys",
        crowdPreference: "Happy in both large and small groups",
        sizePreference: "Gets along with all dogs, no size preference",
        locationPreference: "Beach or large park with water access",
      },
    },
    {
      id: 9,
      name: "Sparrow",
      age: 2,
      link: "https://sarvoham.org/adopt-5-star/",
      gender: "Male",
      size: "Large (50-70 lbs)",
      breed: "Golden Retriever",
      location: "Houston, TX",
      img: img9,
      description:
        "Sparrow is a large-sized male Golden Retriever, weighing between 50-70 lbs, and located in Houston, TX. He is very friendly, loves to swim, and enjoys playing with other dogs of all sizes.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Swimming and fetching toys",
        crowdPreference: "Happy in both large and small groups",
        sizePreference: "Gets along with all dogs, no size preference",
        locationPreference: "Beach or large park with water access",
      },
    },
  ];
 
  const selectedShelter = shelters.find(
    (shelter) => shelter.id === parseInt(params.id)
  );

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
                src={selectedShelter?.img}
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
                  <span className="text-black">
                    {selectedShelter?.location}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-b-lg p-6 space-y-6 bg-white">
          <div className=" border border-[#F88D58] shadow-lg rounded-lg p-4">
            <p className="text-gray-700 md:text-lg text-justify ">
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
            <Link href={selectedShelter.link}>
              <div className="w-full  ">
                <button
               
                  className="mt-3 w-full text-center  text-white no-underline  bg-[#F88D58] hover:bg-black
        xl:px-[48px] xl:py-[16px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] px-[10px]  py-[8px] md:mb-0 mb-4 text-[18px]
           md:gap-[16px] gap-[4px] rounded-lg  flex-shrink-0  "
                >
                  Featch My Info
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

