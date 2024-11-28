import React from "react";
import Friend from "./Friend";
import HowDoYouPlay from "../HomePage/HowDoYouPlay";
import Pagination from "./Pagination";
import img1 from "../../asserts/memo.jpeg";
import img2 from "../../asserts/jack.jpeg";
import img3 from "../../asserts/lily.jpeg";
import img4 from "../../asserts/sparrow.jpeg";

const Friends = () => {
  const petPartners = [
    {
      id:1,
      name: "Memo",
      age: 2,
      gender: "Male",
      size: "Small (10-30 lbs)",
      breed: "Corgi",
      location: "Houston, TX",
      img: img1,
      distance: 1.2,
      description: "Memo is a small-sized male Corgi, weighing between 10-30 lbs, and located in Houston, TX. He is neutered, loves playing fetch, enjoys the company of small crowds, and gets along well with other small-sized dogs.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Focused Play; throw the ball!",
        crowdPreference: "I prefer one friend at a time",
        sizePreference: "I'm comfortable with friends my own size.",
        locationPreference: "Backyard/Home playdate"
      }
    },
    {
      id:2,
      name: "Jack",
      age: 2,
      gender: "Male",
      size: "Medium (30-50 lbs)",
      breed: "Beagle",
      location: "Houston, TX",
      img: img2,
      distance: 1.5,
      description: "Jack is a medium-sized male Beagle, weighing between 30-50 lbs, and located in Houston, TX. He loves sniffing around, enjoys a good chase, and prefers an open space to run.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Running and chasing",
        crowdPreference: "I love being in a pack!",
        sizePreference: "No preference, I get along with all sizes.",
        locationPreference: "Dog park or open fields"
      }
    },
    {
      id:3,
      name: "Lily",
      age: 2,
      gender: "Female",
      size: "Small (10-30 lbs)",
      breed: "French Bulldog",
      location: "Houston, TX",
      img: img3,
      distance: 2.0,
      description: "Lily is a small-sized female French Bulldog, weighing between 10-30 lbs, and located in Houston, TX. She is calm, enjoys short play sessions, and loves being around familiar faces.",
      preferences: {
        spayedNeutered: "No",
        playStyle: "Short play sessions with lots of cuddles",
        crowdPreference: "Prefers smaller groups",
        sizePreference: "Comfortable with dogs her size or smaller.",
        locationPreference: "Indoor play or fenced backyard"
      }
    },
    {
      id:4,
      name: "Sparrow",
      age: 2,
      gender: "Male",
      size: "Large (50-70 lbs)",
      breed: "Golden Retriever",
      location: "Houston, TX",
      img: img4,
      distance: 2.3,
      description: "Sparrow is a large-sized male Golden Retriever, weighing between 50-70 lbs, and located in Houston, TX. He is very friendly, loves to swim, and enjoys playing with other dogs of all sizes.",
      preferences: {
        spayedNeutered: "Yes",
        playStyle: "Swimming and fetching toys",
        crowdPreference: "Happy in both large and small groups",
        sizePreference: "Gets along with all dogs, no size preference",
        locationPreference: "Beach or large park with water access"
      }
    }
  ];
  return (
    <div className="bg-[#FFFAF5]">
      <h1 style={{fontSize:"clamp(16px, 2vw + 1rem ,36px)"}}  className="  text-center font-bold my-[50px]  text-[#302F51]">
        FRIENDS NEAR YOU
      </h1>
{
  petPartners.map((petPartner, index) => (
    <Friend key={petPartner.id} petPartner={petPartner} index={index} />
  ))
}


      <div className="pt-[50px] ">
        <HowDoYouPlay />
      </div>

      <div className="flex flex-col items-center justify-center  bg-gray-50 py-[100px]">
        <Pagination totalPages={10} initialPage={1} />
      </div>

      <div className="text-[#302F51] text-center py-8 px-4 mb-[100px]">
        <h2 className="text-[40px]  font-semibold mb-4 text-gray-800">
          Disclaimer
        </h2>
        <p className="leading-relaxed text-[22px] text-justify md:mx-[150px] mx-[24px]">
          Woof Spot is designed to help dog owners connect with others in their
          community for activities like walks, hikes, and playdates. While we
          encourage positive interactions, it is important to use caution when
          meeting new people and dogs. Woof Spot does not vet users or guarantee
          the safety, behavior, or reliability of any individuals or their pets.
          By using our platform, you agree that Woof Spot is not responsible or
          liable for any negative experiences, injuries, or disputes that may
          arise from interactions between users. Always prioritize safety and
          good judgment when arranging meetups.
        </p>
      </div>
    </div>
  );
};

export default Friends;
