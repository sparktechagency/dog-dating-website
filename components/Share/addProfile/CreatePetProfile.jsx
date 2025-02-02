import React, { useEffect, useRef, useState } from "react";
import blankProfile from "../../../asserts/blankProfile.png";
import { toast } from "sonner";
import Image from "next/image";
import { useCreatePetProfileMutation } from "@/redux/api/features/profileApi";

const CreatePetProfile = ({
  toggleCreatePetProfile,
  createPetProfile,
  setCreatePetProfile,
  myProfileData,
}) => {
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createPetProfile &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setCreatePetProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [createPetProfile, setCreatePetProfile]);

  const [createProfile, { isLoading }] = useCreatePetProfileMutation();

  const [photo, setPhoto] = useState(blankProfile);
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhoto(e.target.result);
          setError(""); // Clear any existing error
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImage = (e) => {
    handlePhotoChange(e);
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Creating Profile...");
    e.preventDefault();

    try {
      const formData = new FormData();
      const image = e.target.image.files[0];
      const userId = myProfileData?.userId;
      const name = e.target.name.value;
      const age = e.target.age.value;
      const gender = e.target.gender.value;
      const size = e.target.size.value;
      const neuteredSpayed = e.target.neuteredSpayed.value;
      const howDoYouPlay = e.target.howDoYouPlay.value;
      const doYouLikeACrowd = e.target.doYouLikeACrowd.value;
      const playSizePreferences = e.target.playSizePreferences.value;
      const locationPreferences = e.target.locationPreferences.value;
      const description = e.target.description.value;

      // Validate latitude and longitude

      if (!image) {
        setError("Please select an image.");
        throw new Error("Please select an image.");
      }

      const data = {
        userId,
        name,
        age: Number(age),
        gender,
        size,
        neuteredSpayed,
        howDoYouPlay,
        doYouLikeACrowd,
        playSizePreferences,
        locationPreferences,
        description,
      };

      // Add data to FormData as a key-value pair
      formData.append("data", JSON.stringify(data));
      formData.append("file", image);

      // Assuming `createProfile` is an API call function
      const res = await createProfile(formData).unwrap();

      toast.success("Profile Created Successfully", {
        id: toastId,
        duration: 2000,
      });
      toggleCreatePetProfile();
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error.message ||
          "An error occurred during profile creation",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <div
      ref={profileRef}
      className="bg-white md:w-[500px] rounded-md mt-5 h-[95vh]"
    >
      <div className="w-full relative bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Pet Profile
        </h1>
        <div
          onClick={toggleCreatePetProfile}
          className="cursor-pointer md:flex justify-end top-5 z-50 absolute right-5"
        >
          <p className="text-lg font-bold">X</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-2 w-full flex-1">
            <div className=" w-20 h-20 relative rounded-full overflow-hidden bg-gray-100">
              {photo ? (
                <Image
                  src={photo}
                  alt="Profile"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No File Selected
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImage}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="text-blue-500 cursor-pointer text-sm"
            >
              Choose Photo
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
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
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="block text-sm">Gender</label>
            <select
              name="gender"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            >
              <option disabled selected value="">
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block text-sm">Size</label>
            <select
              name="size"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            >
              <option disabled selected value="">
                Select Size
              </option>
              <option value="Extra Small (0-10 lbs)">
                Extra Small (0-10 lbs)
              </option>
              <option value="Small (10-30 lbs)">Small (10-30 lbs)</option>
              <option value="Medium (30-55 lbs)">Medium (30-55 lbs)</option>
              <option value="Large (55-80 lbs)">Large (55-80 lbs)</option>
              <option value="Extra Large (80+ lbs)">
                Extra Large (80+ lbs)
              </option>
            </select>
          </div>

          {/* Neutered/Spayed */}
          <div className="space-y-2">
            <label className="block text-sm">Neutered/Spayed</label>
            <select
              name="neuteredSpayed"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            >
              <option disabled selected value="">
                Select option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* How do you play */}
          <div className="space-y-2">
            <label className="block text-sm">How do you play?</label>
            <select
              name="howDoYouPlay"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            >
              <option disabled selected value="">
                Select option
              </option>
              <option value="I’m new to play, and can be shy">
                I’m new to play, and can be shy
              </option>
              <option value="Low speed; let’s hang out">
                Low speed; let’s hang out
              </option>
              <option value="High Speed; I love to chase/be chased">
                High Speed; I love to chase/be chased
              </option>
              <option value="Focused Play; throw the ball!">
                Focused Play; throw the ball!
              </option>
              <option value="Always herding">Always herding</option>
              <option value=" Assertive; I need to be the boss">
                Assertive; I need to be the boss
              </option>
            </select>
          </div>

          {/* Crowd preference */}
          <div className="space-y-2">
            <label className="block text-sm">Do you like a crowd?</label>
            <select
              name="doYouLikeACrowd"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            >
              <option disabled selected value="">
                Select option
              </option>
              <option value="I prefer one friend at a time">
                I prefer one friend at a time
              </option>
              <option value="I’m comfortable with small groups">
                I’m comfortable with small groups
              </option>
              <option value="I run with the pack!">I run with the pack!</option>
            </select>
          </div>

          {/* Play size preferences */}
          <div className="space-y-2">
            <label className="block text-sm">Play size preferences:</label>
            <select
              name="playSizePreferences"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            >
              <option disabled selected value="">
                Select option
              </option>
              <option value="I’m comfortable with friends my own size">
                I’m comfortable with friends my own size
              </option>
              <option value="I prefer medium - big dogs">
                I prefer medium - big dogs
              </option>
              <option value="I prefer small - medium dogs (we love the short kings/queens!)">
                I prefer small - medium dogs (we love the short kings/queens!)
              </option>
            </select>
          </div>

          {/* Location preferences */}
          <div className="space-y-2">
            <label className="block text-sm">Location preferences:</label>
            <select
              name="locationPreferences"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            >
              <option disabled selected value="">
                Select option
              </option>
              <option value="backyard/home playdate">
                Backyard/Home playdate
              </option>
              <option value="neighborhood walk">Neighborhood walk</option>
              <option value="trail/hike">Trail/hike</option>
              <option value="I’m comfortable in any crowd">
                I’m comfortable in any crowd
              </option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm">Description</label>
            <textarea
              name="description"
              placeholder="Type your Response"
              required
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#F88D58] text-white py-2 rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePetProfile;
