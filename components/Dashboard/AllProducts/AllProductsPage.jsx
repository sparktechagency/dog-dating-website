"use client"
import React, { useState } from "react";
import Item from "./Item";
import { FiSearch } from "react-icons/fi";
import AddNewItem from "./AddNewItem";

const AllProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const items = [
    {
      id: 1,
      name: "Dog Food",
      price: 160,
      description: [
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions.",
        "Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
      ],
    },
    {
      id: 2,
      name: "Dog Food",
      price: 160,
      description: [
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions.",
        "Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
      ],
    },
    {
      id: 3,
      name: "Dog Food",
      price: 160,
      description: [
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions.",
        "Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
      ],
    },
    {
      id: 4,
      name: "Dog Food",
      price: 160,
      description: [
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions.",
        "Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
      ],
    },
    {
      id: 5,
      name: "Dog Food",
      price: 160,
      description: [
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions.",
        "Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
      ],
    },
    {
      id: 6,
      name: "Dog Food",
      price: 160,
      description: [
        "A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions.",
        "Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.",
      ],
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 mx-10">
        <div
          className="flex items-center
                    border-2 border-[#F88D58]
                    w-full  rounded-xl max-w-lg py-3  mt-5"
        >
          <div className="p-2">
            <FiSearch className="text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className=" bg-[#FFFAF5] placeholder:text-black border-none outline-none w-full h-full "
          />
        </div>

        <div className="flex flex-shrink-0 text-lg items-center justify-center">
            <div onClick={toggleMenu}  className="flex justify-center items-center cursor-pointer">

          <span className="text-3xl text-[#F88D58] "> +</span>
          Add New Dog Info
            </div>
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
              <AddNewItem
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 my-5">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
