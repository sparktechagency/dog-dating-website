"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dogFood from "../../../asserts/dogfood.png";

const EditItem = (props) => {
  const { item, setIsOpen, isOpen, toggleMenu } = props;
  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const [formData, setFormData] = useState({
    name: item?.name,
    image: dogFood,
    price: item?.price,
    description: item?.description,
    link: "https://www.amazon.com/Bully-Max-Performance-Super-Premium/dp/B01FT67D0O?th=1", // Default empty
  });
  //   console.log(formData);
  const [photo, setPhoto] = useState(formData?.image);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhoto(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImage = (e) => {
    handleChange(e);
    handlePhotoChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div  ref={profileRef} className="bg-white/30 lg:w-[60vw] md:w-[80vw] w-[90vw] lg:h-[90vh] py-4  backdrop-blur-2xl brightness-105% contrast-90% rounded-[50px] border border-white/50 shadow-xl ">
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
            </label>
          </div>

          <div className="lg:w-full flex-1 lg:me-10 ">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Title*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white  mb-1"
              >
                Product Price*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white  mb-1"
              >
                Product (affiliate) Link*
              </label>
              <input
                type="text"
                id="link"
                name="link"
                placeholder={formData.link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white  mb-1"
              >
                Description
              </label>
              <textarea
                type="text"
                rows={6}
                id="description"
                name="description"
                placeholder={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
                style={{ resize: "none" }}
              />
            </div>

            <button
               onClick={toggleMenu}
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
