"use client";
import Image from "next/image";
import ceo from "../../asserts/ceo.png";
import ced from "../../asserts/ced.png";
import EditProfile from "./EditProfile/EditProfile";
import { useState } from "react";
import EditPetProfille from "./EditProfile/EditPetProfille";
export default function Profile() {
  const [profileEdit, setProfileEdit] = useState(false);
  const toggleEditProfile = () => {
    setProfileEdit((prev) => !prev);
  };

  const [petProfileEdit, setPetProfileEdit] = useState(false);
  const toggleEditPetProfile = () => {
    setPetProfileEdit((prev) => !prev);
  };

  const profile = {
    name: "Sara Sowa",
    img: ceo,
    address: "1234 Sunset Blvd, Los Angeles, California, USA",
    mobile: "00000000",
    email: "example@gmail.com",
    location: "Los Angeles, California, USA",
  };
  const petProfile = {
    name: "Murphy Bear",
    photo: ced,
    address: "1234 Sunset Blvd, Los Angeles, California, USA",
    age: "2",
    gender: "Male",
    size: "S (34-36)",
    neutered: "Yes",
    playStyle: "Focused Play; throw the ball!",
    crowdPreference: "I'm comfortable with small groups",
    playpreferences: "I'm comfortable in any crowd",
    locationPreference: "Backyard/Home playdate",
    describe: "Type your Response",
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* My Profile Section */}
      <div className="flex-1  p-6 ">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <div className="flex items-center mb-6">
          <Image
            src={profile?.img}
            alt={profile?.name}
            width={0}
            height={0}
            className="rounded-full mr-4 w-20 ring-1 ring-[#F88D58] object-cover aspect-square"
          />
          <h3 className="text-xl font-semibold">{profile?.name}</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={profile?.address}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile no
            </label>
            <input
              type="tel"
              className="input input-bordered w-full bg-gray-100"
              value={profile?.mobile}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100"
              value={profile?.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={profile?.location}
            />
          </div>
          <div onClick={toggleEditProfile} className="text-end">
            <button className="btn bg-[#F88D58] hover:bg-orange-600 text-white border-none  mt-4 w-fit ">
              Edit
            </button>
          </div>
          {profileEdit && (
            <div className="inset-0 fixed flex justify-center items-center bg-black/20 z-50 ">
              <EditProfile
                toggleEditProfile={toggleEditProfile}
                profileEdit={profileEdit}
                setProfileEdit={setProfileEdit}
              />
            </div>
          )}


        </div>
      </div>

      {/* Pets Profile Section */}
      <div className="flex-1  p-6 ">
        <h2 className="text-2xl font-bold mb-6">Pets Profile</h2>
        <div className="flex items-center mb-6">
          <Image
            src={petProfile?.photo}
            alt={petProfile?.name}
            width={0}
            height={0}
            className="rounded-full mr-4 w-20 ring-1 ring-[#F88D58] object-cover aspect-square"
          />
          <h3 className="text-xl font-semibold">{petProfile?.name}</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.address}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.age}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.gender}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.size}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Neutered/Spayed
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.neutered}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How do you play?
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.playStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do you like a crowd?
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.crowdPreference}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Play/size preferences
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.playpreferences}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location preferences
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={petProfile?.locationPreference}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How would your Best Friend (aka human) describe you?
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder={petProfile?.describe}
            />
          </div>
          <div onClick={toggleEditPetProfile} className="text-end">
            <button className="btn bg-[#F88D58] hover:bg-orange-600 text-white border-none w-fit mt-4">
              Edit
            </button>
          </div>

          {petProfileEdit && (
            <div className="inset-0 fixed flex justify-center  bg-black/20 z-50 overflow-y-scroll ">
              <EditPetProfille
                toggleEditPetProfile={toggleEditPetProfile}
                petProfileEdit={petProfileEdit}
                setPetProfileEdit={setPetProfileEdit}
              />
            </div>
          )}



        </div>
      </div>
    </div>
  );
}
