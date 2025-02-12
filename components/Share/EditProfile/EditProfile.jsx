"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { getImageUrl } from "@/helpers/config/envConfig";
import { useUpdateUserProfileMutation } from "@/redux/api/features/profileApi";

export default function EditProfile(props) {
  const { toggleEditProfile, profileEdit, setProfileEdit, userProfile } = props;
  const profileRef = useRef(null);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileEdit &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileEdit, setProfileEdit]);

  const url = getImageUrl();
  const userImage = url + userProfile?.data?.image;

  const [photo, setPhoto] = useState(userImage);
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

  const [location, setLocation] = useState({
    latitude: userProfile?.data?.location?.coordinates[1],
    longitude: userProfile?.data?.location?.coordinates[0],
  });

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

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Updating Profile...");
    e.preventDefault();

    try {
      const formData = new FormData();
      const image = e.target.image.files[0] || userProfile?.data?.image;
      const userId = userProfile?.data?.userId;

      const address = e.target.address.value;
      const { latitude, longitude } = location;

      const data = {
        userId,
        address,
        location: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)],
        },
      };

      // Add data to FormData as a key-value pair
      formData.append("data", JSON.stringify(data));
      formData.append("file", image);

      const res = await updateUserProfile({
        formData,
        id: userProfile?.data?.userId?._id,
      }).unwrap();

      toast.success("Profile Updated Successfully", {
        id: toastId,
        duration: 2000,
      });
      toggleEditProfile();
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error.message ||
          "An error occurred during updating Profile",
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
          Edit Profile
        </h1>
        <div
          onClick={toggleEditProfile}
          className="cursor-pointer  md:flex justify-end top-5  z-50 absolute right-5"
        >
          <p className=" text-lg font-bold ">X</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-2 w-full flex-1">
            <div className=" w-20 h-20 relative rounded-full overflow-hidden bg-gray-100">
              {photo ? (
                <Image
                  loading="lazy"
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
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={userProfile?.data?.address}
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
