import React from 'react';
import img1 from "../../asserts/memo.jpeg";
import img2 from "../../asserts/jack.jpeg";
import img3 from "../../asserts/lily.jpeg";
import img4 from "../../asserts/sparrow.jpeg";
import svg from "../../asserts/paw.svg"
import Image from 'next/image';


const SingleFriend = ({id}) => {
    console.log(id);
    const petPartners = [
        {
          id:1,
          name: "Memo",
          age: 2,
          gender: "Female",
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
          gender: "Female",
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
          gender: "Female",
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

      const pet= petPartners.find((partner) => partner.id === parseInt(id));
    


    
    
    return (
        <div className=" mx-auto p-4 max-w-2xl md:mt-0 mt-20">
        <div className="bg-[#F88D58] rounded-t-lg p-6 ">
          <div className="flex gap-6 items-center md:items-start sm:flex-row flex-col">
            <div className="w-48 h-48 relative rounded-lg overflow-hidden flex-shrink-0 border-2 shadow-xl">
              <Image
                src={pet?.img}
                alt={pet?.name}
                className="object-cover object-top"
                fill
              />
            </div>
            <div className="flex-1 ">
              <h1 className="text-4xl font-bold text-black mb-4">{pet?.name}	</h1>
              <div className="space-y-2 text-white">
                <p className="text-xl">Age:    <span className='text-black'> {pet?.age}</span></p>
                <p className="text-xl">Gender:<span className='text-black'>{pet?.gender}</span>   </p>
                <p className="text-xl">Size: <span className='text-black'>  {pet?.size}</span>  </p>
                <p className="text-xl">City:    <span className='text-black'>{pet?.location}</span>    </p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="border rounded-b-lg p-6 space-y-6 bg-white">
          <div className=" border border-[#F88D58] shadow-lg rounded-lg p-4">
            <p className="text-gray-700 text-lg">
              {pet?.description}
            </p>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center gap-3">
            <Image alt='friend' src={svg} className='w-5'/>
              <span className="font-medium">Spayed/Neutered:</span>
              <span className="text-[#F88D58]">{pet?.preferences.spayedNeutered}</span>
            </div>
  
            <div className="flex items-center gap-3">
            <Image alt='friend'  src={svg} className='w-5'/>
              <span className="font-medium">How do you play:</span>
              <span className="text-[#F88D58]">{pet?.preferences.playStyle}</span>
            </div>
  
            <div className="flex items-center gap-3">
            <Image  alt='friend'  src={svg} className='w-5'/>
              <span className="font-medium">Do you like a crowd?:</span>
              <span className="text-[#F88D58]">{pet?.preferences.crowdPreference}</span>
            </div>
  
            <div className="flex items-center gap-3">
            <Image  alt='friend'  src={svg} className='w-5'/>
              <span className="font-medium">Play/Size preferences:</span>
              <span className="text-[#F88D58]"> {pet?.preferences.sizePreference}</span>
            </div>
  
            <div className="flex items-center gap-3">
            <Image  alt='friend' src={svg} className='w-5'/>
              <span className="font-medium">Location preferences:</span>
              <span className="text-[#F88D58]"> {pet?.preferences.locationPreference}</span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SingleFriend;