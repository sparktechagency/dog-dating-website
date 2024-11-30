"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ced from "../../../asserts/ced.png";

export default function EditPetProfile(props) {
  // State for form fields

  const {toggleEditPetProfile,petProfileEdit,setPetProfileEdit}=props
  const profileRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (petProfileEdit && profileRef.current && !profileRef.current.contains(event.target)) {
        setPetProfileEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [petProfileEdit, setPetProfileEdit]);

  const petProfile = {
    name: "Murphy Bear",
    photo: ced,
    address: "1234 Sunset Blvd, Los Angeles, California, USA",
    age: "2",
    gender: "Male",
    size: "Small (10 – 30 lbs)",
    neutered: "Yes",
    playStyle: "Focused Play; throw the ball!",
    crowdPreference: "I'm comfortable with small groups",
    playpreferences: "I'm comfortable in any crowd",
    locationPreference: "Backyard/Home playdate",
    describe: "Type your Response",
  };

  const [formData, setFormData] = useState({
    name: petProfile.name,
    photo: petProfile.photo, // For storing photo data
    address: petProfile.address,
    age: petProfile.age,
    gender: petProfile.gender,
    size: petProfile.size,
    neutered: petProfile.neutered,
    playStyle: petProfile.playStyle,
    crowdPreference: petProfile.crowdPreference,
    playpreferences: petProfile.playpreferences,
    locationPreference: petProfile.locationPreference,
    describe: petProfile.describe,
  });

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle photo change (for image upload)
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prevData) => ({
            ...prevData,
            photo: e.target.result, // Store the photo in the state
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log formData to the console, or you can send it to a backend
    console.log("Form Submitted:", formData);
  };

  return (
    <div ref={profileRef} className="bg-white md:w-[500px] rounded-md mt-5 ">
      <div className="mx-auto">
        <form className="relative p-4 space-y-4 bg-white z-50 rounded-lg" onSubmit={handleSubmit}>
          <div className="text-lg font-semibold flex justify-between">
            
            Edit Profile
            
            <div
          onClick={toggleEditPetProfile}
          className="cursor-pointer "
        >
          <p className="  text-lg font-bold ">X</p>
        </div>
            </div>
          

          {/* Photo Upload */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-100">
              {formData.photo ? (
                <Image
                  src={formData.photo}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full text-center mt-3 text-gray-400">
                  No File Selected
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="text-blue-500 cursor-pointer text-sm"
            >
              Choose Photo
            </label>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm">Address</label>
            <input
              name="address"
              type="text"
              placeholder="Type your Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="block text-sm">Age</label>
            <input
              name="age"
              type="number"
              placeholder="Your age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}

          <div className="space-y-2">
            <label className="block text-sm ">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 "
            >
              <option disabled selected value="">Select Gender</option>
              <option className="text-[#F88D58] bg-[#FFF5ED]" value="Male">
                Male
              </option>
              <option className="text-[#F88D58] bg-[#FFF5ED]" value="Female">
                Female
              </option>
            </select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block text-sm ">Size</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled selected value="">Select Size</option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="Extra small (0 – 10 lbs)"
              >
                Extra small (0 – 10 lbs)
              </option>
              <option className="text-[#F88D58] bg-[#FFF5ED]" value="Small (10 – 30 lbs)">
              Small (10 – 30 lbs)
              </option>
              <option className="text-[#F88D58] bg-[#FFF5ED]" value="Medium (30 – 55 lbs)">
              Medium (30 – 55 lbs)
              </option>
              <option className="text-[#F88D58] bg-[#FFF5ED]" value="Large (55 – 80 lbs)">
              Large (55 – 80 lbs)
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="Extra Large (80+ lbs)"
              >
                Extra Large (80+ lbs)
              </option>
            </select>
          </div>

          {/* Neutered//Spayed */}
          <div className="space-y-2">
            <label className="block text-sm ">Neutered//Spayed</label>
            <select
              name="neutered"
              value={formData.neutered}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled selected value="">Select option</option>
              <option className="text-[#F88D58] bg-[#FFF5ED]" value="Yes">
                Yes
              </option>
              <option className="text-[#F88D58] bg-[#FFF5ED]" value="No">
                No
              </option>
            </select>
          </div>

          {/* playStyle */}
          <div className="space-y-2">
            <label className="block text-sm ">How do you play?</label>
            <select
              name="playStyle"
              value={formData.playStyle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled selected value="">Select option</option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I'm new to play, and can be shy"
              >
                I&apos;m new to play, and can be shy
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="Low speed; let's hang out"
              >
                Low speed; let&apos;s hang out
              </option>

              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="High Speed; I love to chase/be chased"
              >
                High Speed; I love to chase/be chased
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="Focused Play; throw the ball!"
              >
                Focused Play; throw the ball!
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="Always herding"
              >
                Always herding
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value=" Assertive; I need to be the boss"
              >
                Assertive; I need to be the boss
              </option>
            </select>
          </div>

          {/* Do you like a crowd?*/}
          <div className="space-y-2">
            <label className="block text-sm ">Do you like a crowd?</label>
            <select
              name="crowdPreference"
              value={formData.crowdPreference}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled selected value="">Select option</option>

              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I prefer one friend at a time"
              >
                I prefer one friend at a time
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I'm comfortable with small groups"
              >
                I&apos;m comfortable with small groups
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I run with the pack!"
              >
                I run with the pack!
              </option>
            </select>
          </div>

          {/* Play/size preferences: */}
          <div className="space-y-2">
            <label className="block text-sm ">Play/size preferences:</label>
            <select
              name="playpreferences"
              value={formData.playpreferences}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option  disabled selected value="">Select option</option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I'm comfortable with friends my own size"
              >
                I&apos;m comfortable with friends my own size
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I prefer medium to big dogs"
              >
                I prefer medium to big dogs
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I prefer small to medium dogs (we love the short kings/queens!)"
              >
                I prefer small to medium dogs (we love the short kings/queens!)
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I'm comfortable in any crowd"
              >
                I&apos;m comfortable in any crowd
              </option>
            </select>
          </div>

          {/* locationPreference*/}
          <div className="space-y-2">
            <label className="block text-sm "> Location preferences:</label>
            <select
              name="locationPreference"
              value={formData.locationPreference}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option   disabled selected value="">Select option</option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="Backyard/Home playdate"
              >
                Backyard/Home playdate
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="neighborhood walk"
              >
                neighborhood walk
              </option>

              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="trail/hike"
              >
                trail/hike
              </option>
              <option
                className="text-[#F88D58] bg-[#FFF5ED]"
                value="I'm comfortable in any crowd"
              >
                I&apos;m comfortable in any crowd
              </option>
            </select>
          </div>

          {/* describe */}
          <div className="space-y-2">
            <label className="block text-sm">Describe</label>
            <textarea
              name="describe"
              type="text"
              placeholder="Type your Response"
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // onClick={toggleEditPetProfile}
            className="w-full bg-[#F88D58] text-white py-2 rounded-md  "
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
