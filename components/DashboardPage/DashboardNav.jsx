"use client";
import React from "react";
import { AiOutlineHome, AiOutlineGift, AiOutlineUser, AiOutlineLogout } from "react-icons/ai"; // Example for React Icons

const DashboardNav = () => {
  return (
    <div className="w-[270px] h-[80vh] bg-[#f88d58] rounded-tr-[48px] rounded-br-[48px] relative flex flex-col justify-between py-6 ">
      {/* Dashboard Header */}
      <div className="text-center text-white text-3xl font-bold capitalize tracking-wider ">
        Dashboard
      </div>

      {/* Navigation Items */}
      <div className="space-y-6 mt-8">
        {/* All Products */}
        <div className="flex items-center bg-white rounded-tr-[20px] rounded-br-[20px] p-4">
          <AiOutlineHome className="w-6 h-6 mr-3" /> {/* Home Icon */}
          <span className="text-[#f88d58] text-xl font-bold capitalize tracking-wide">
            All Products
          </span>
        </div>

        {/* Shelter */}
        <div className="flex items-center text-white p-4">
          <AiOutlineHome className="w-6 h-6 mr-3" /> {/* Placeholder Icon */}
          <span className="text-xl font-bold capitalize tracking-wide">
            Shelter
          </span>
        </div>

        {/* Donation */}
        <div className="flex items-center text-white p-4">
          <AiOutlineGift className="w-6 h-6 mr-3" /> {/* Gift Icon */}
          <span className="text-xl font-bold capitalize tracking-wide ">
            Donation
          </span>
        </div>

        {/* Members */}
        <div className="flex items-center text-white p-4">
          <AiOutlineUser className="w-6 h-6 mr-3" /> {/* Users Icon */}
          <span className="text-xl font-bold capitalize tracking-wide ">
            Members
          </span>
        </div>
      </div>

      {/* Log Out Button */}
      <div className="flex justify-center">
        <button className="flex items-center justify-center bg-transparent hover:bg-white/10 
        p-4 rounded-lg text-white font-bold text-xl">
          <AiOutlineLogout className="w-6 h-6 mr-2" /> {/* Logout Icon */}
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
