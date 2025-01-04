"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import blankProfile from "../../../asserts/blankProfile.png";
import { toast } from "sonner";
import { useCreateUserProfileMutation } from "@/redux/api/features/profileApi";

export default function CreateUserProfile(props) {
  const {
    toggleCreateProfile,
    createUserProfile,
    setCreateUserProfile,
    myProfileData,
  } = props;
  const profileRef = useRef(null);

  const [createProfile, { isLoading }] = useCreateUserProfileMutation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createUserProfile &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setCreateUserProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [createUserProfile, setCreateUserProfile]);

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

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          });
        },

        (error) => {
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const validateCoordinates = (latitude, longitude) => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Creating Profile...");
    e.preventDefault();

    try {
      const formData = new FormData();
      const image = e.target.image.files[0];
      const userId = myProfileData?.userId;
      const address = e.target.address.value;
      const { latitude, longitude } = location;

      // Validate latitude and longitude
      if (!validateCoordinates(latitude, longitude)) {
        throw new Error("Please provide valid location coordinates.");
      }

      if (!image) {
        setError("Please select an image.");
        throw new Error("Please select an image.");
      }

      const data = {
        userId,
        address,
        location: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)], // Longitude first for GeoJSON
        },
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
      toggleCreateProfile();
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
    <div ref={profileRef} className="bg-white md:w-[500px] rounded-md mt-5">
      <div className="w-full relative bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Profile
        </h1>
        <div
          onClick={toggleCreateProfile}
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
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={myProfileData?.fullName}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={myProfileData?.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              defaultValue={myProfileData?.phone}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Latitude"
                  value={location.latitude}
                  required
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Longitude"
                  value={location.longitude}
                  required
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleLocationClick}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors mt-2 w-fit"
                >
                  Get Location
                </button>
              </div>
            </div>
          </div>

          <button
            // onClick={toggleCreateProfile}
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
