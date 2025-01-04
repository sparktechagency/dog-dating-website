"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import shelterImg from "../../../asserts/fp2.png";
import { toast } from "sonner";
import { useCreateShelterMutation } from "@/redux/api/features/shelterApi";

const AddNewShelter = (props) => {
  const [createShelter] = useCreateShelterMutation();

  const { setIsOpen, isOpen, toggleMenu } = props;
  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const [photo, setPhoto] = useState(shelterImg);
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
    const toastId = toast.loading("Adding New Shelter...");
    e.preventDefault();
    const formData = new FormData();

    try {
      const image = e.target.image.files[0];
      const name = e.target.name.value;
      const age = e.target.age.value;
      const gender = e.target.gender.value;
      const size = e.target.size.value;
      const city = e.target.city.value;
      const description = e.target.description.value;
      const shelterLink = e.target.shelterLink.value;

      if (!image) {
        setError("Please select an image.");
        throw new Error("Please select an image."); // Set error message to display it
      }

      const data = {
        name,
        age: Number(age),
        gender,
        size,
        city,
        description,
        shelterLink,
      };

      formData.append("data", JSON.stringify(data));
      formData.append("file", image);

      const res = await createShelter(formData).unwrap();

      toast.success("Shelter Added Successfully", {
        id: toastId,
        duration: 2000,
      });
      toggleMenu();
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error.message ||
          "An error occurred during Add New Shelter",
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
      className="overflow-y-auto bg-white/30 lg:w-[60vw] md:w-[80vw] w-[90vw] lg:h-[90vh] py-4  backdrop-blur-2xl brightness-105% contrast-90% rounded-[50px] border border-white/50 shadow-xl "
    >
      <div onClick={toggleMenu} className="cursor-pointer ">
        <p className="  text-lg font-bold text-white text-end me-10 mt-4 ">X</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col  h-full ">
        <div className="flex lg:flex-row flex-col  items-center gap-4 justify-around   my-auto  ">
          <div className="flex flex-col items-center space-y-2 w-full flex-1">
            <div className="xl:w-80 xl:h-80 md:w-48 md:h-48 w-36 h-36 relative rounded-full overflow-hidden bg-gray-100">
              {photo ? (
                <Image
                  src={photo}
                  alt="Profile"
                  fill
                  className="object-cover "
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
            </label>{" "}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="lg:w-full flex-1 lg:me-10 ">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={`Please Enter Name`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-white mb-1"
              >
                Age*
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                placeholder={`Please Enter Age`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {/* Gender  */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-white mb-1"
              >
                Gender*
              </label>
              <select
                id="gender"
                name="gender"
                required
                placeholder={`Please Select Gender`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option
                  disabled
                  value=""
                  className="text-[#F88D58] bg-[#FFF5ED]"
                >
                  Select Gender
                </option>
                <option value="male" className="text-[#F88D58] bg-[#FFF5ED]">
                  Male
                </option>
                <option value="female" className="text-[#F88D58] bg-[#FFF5ED]">
                  Female
                </option>
              </select>
            </div>
            {/* Size  */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-white mb-1"
              >
                Size*
              </label>
              <select
                id="size"
                name="size"
                required
                placeholder={`Please Select Size`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option disabled selected value="">
                  Select Size
                </option>
                <option
                  className="text-[#F88D58] bg-[#FFF5ED]"
                  value="Extra small (0 – 10 lbs)"
                >
                  Extra small (0 – 10 lbs)
                </option>
                <option
                  className="text-[#F88D58] bg-[#FFF5ED]"
                  value="Small (10 – 30 lbs)"
                >
                  Small (10 – 30 lbs)
                </option>
                <option
                  className="text-[#F88D58] bg-[#FFF5ED]"
                  value="Medium (30 – 55 lbs)"
                >
                  Medium (30 – 55 lbs)
                </option>
                <option
                  className="text-[#F88D58] bg-[#FFF5ED]"
                  value="Large (55 – 80 lbs)"
                >
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

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-white mb-1"
              >
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder={`Please Enter City`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="shelterLink"
                className="block text-sm font-medium text-white  mb-1"
              >
                Shelter Link*
              </label>
              <input
                type="text"
                id="shelterLink"
                name="shelterLink"
                placeholder={`Product affiliate Link`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white  mb-1"
              >
                Description
              </label>
              <textarea
                type="text"
                rows={6}
                id="description"
                name="description"
                placeholder={`Write Description`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
                style={{ resize: "none" }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewShelter;
