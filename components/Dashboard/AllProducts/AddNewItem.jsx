"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dogFood from "../../../asserts/dogfood.png";
import { useCreateProductMutation } from "@/redux/api/features/productApi";
import { toast } from "sonner";

const AddNewItem = (props) => {
  const { setIsOpen, isOpen, toggleMenu } = props;
  const [createProduct, { isLoading }] = useCreateProductMutation();
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

  const [photo, setPhoto] = useState(dogFood);
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
    const toastId = toast.loading("Adding New Product...");
    e.preventDefault();
    const formData = new FormData();
    try {
      const image = e.target.image.files[0];
      const title = e.target.title.value;
      const price = e.target.price.value;
      const productLink = e.target.link.value;
      const description = e.target.description.value;

      console.log(image, title, price, productLink);

      if (!image) {
        setError("Please select an image.");
        throw new Error("Please select an image."); // Set error message to display it
      }

      const data = {
        title,
        price: Number(price),
        productLink: productLink,
        description: description,
      };

      formData.append("data", JSON.stringify(data));
      formData.append("file", image);

      const res = await createProduct(formData).unwrap();

      toast.success("Product Added Successfully", {
        id: toastId,
        duration: 2000,
      });
      toggleMenu();
      // if (res?.data?.success === false) {
      //   throw new Error(res?.data?.message);
      // } else {
      //
      // }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error.message ||
          "An error occurred during Add New Product",
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
                  loading="lazy"
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
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
                name="title"
                required
                placeholder={`Give a title`}
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
                step="0.01"
                id="price"
                name="price"
                placeholder={`Give price`}
                required
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
                placeholder={`Product affiliate Link`}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-5"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Description*
              </label>
              <textarea
                type="text"
                rows={5}
                id="name"
                name="description"
                required
                placeholder={`Give a details about the product`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add New Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem;
