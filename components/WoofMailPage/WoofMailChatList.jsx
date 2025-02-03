"use client";
import groupImage from "./asserts/group.svg";
import { Input } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import Loader from "../ui/Loader";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllChatByUserQuery } from "@/redux/api/features/chatApi";
import CreateGroup from "./CreateGroup";
import WoofMailChatListCard from "./WoofMailChatListCard";

const WoofMailChatList = ({
  selectedConversation,
  setSelectedConversation,
  userData,
  imageUrl,
  onlineUsers,
}) => {
  const menuRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleGroupModal = () => setShowAddGroupModal((prev) => !prev);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetAllChatByUserQuery(
      { id: userData?.userId },
      {
        skip: !userData?.userId,
      }
    );

  const filteredConversations = allChatList?.data
    ?.filter((conversation) =>
      conversation?.isGroupChat
        ? conversation?.groupName
            ?.toLowerCase()
            ?.includes(searchTerm.toLowerCase())
        : conversation?.users[0]?._id === userData?.userId
        ? conversation?.users[1]?.petName
            ?.toLowerCase()
            ?.includes(searchTerm.toLowerCase())
        : conversation?.users[0]?.petName
            ?.toLowerCase()
            ?.includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`col-span-1 overflow-y-auto px-3 ${
        selectedConversation ? "hidden lg:block" : "block lg:block"
      }`}
    >
      <div className="sticky top-0 z-20 !bg-[#FFFAF5]    py-5 mb-3 ">
        <div className=" flex justify-between items-center pe-4  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold mt-3">
          Messages
          <div ref={menuRef} className="relative">
            <div onClick={toggleMenu}>
              <FaCirclePlus className="select-none cursor-pointer text-[#F88D58] text-4xl" />
            </div>

            {open && (
              <div className="bg-[#F3F5FB] py-3 shadow-md absolute -left-32 top-9 rounded z-[99999] w-44 p-1">
                <div className="flex gap-2 whitespace-nowrap">
                  <Image alt="profileImage" src={groupImage} className="" />
                  <p
                    onClick={toggleGroupModal}
                    className="text-[#302F51] cursor-pointer text-[20px] font-bold"
                  >
                    Create Group
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Input
          placeholder="Search Conversations"
          prefix={<SearchOutlined className="text-[#F88D58] text-xl" />}
          className=" text-base-color mt-2 py-3 px-2 w-full"
          onChange={handleSearch}
        />
      </div>
      {isAllChatFeacthing ? (
        <Loader className="h-fit" />
      ) : (
        <div className="md:h-full h-fit mb-3">
          <div className=" text-gray-300 bg-white   ">
            {filteredConversations?.map((conversation) => {
              // Compute the image source URL
              const imageUrlSrc = conversation?.isGroupChat
                ? `${imageUrl}${conversation?.groupProfilePicture}`
                : conversation?.users[0]?._id === userData?.userId
                ? `${imageUrl}${conversation?.users[1]?.petImage}`
                : `${imageUrl}${conversation?.users[0]?.petImage}`;

              // Return the JSX
              return (
                <WoofMailChatListCard
                  key={conversation?._id}
                  selectedConversation={selectedConversation}
                  setSelectedConversation={setSelectedConversation}
                  conversation={conversation}
                  imageUrlSrc={imageUrlSrc}
                  userData={userData}
                  onlineUsers={onlineUsers}
                />
              );
            })}
          </div>
        </div>
      )}

      {showAddGroupModal && (
        <div className="inset-0 overflow-y-auto fixed  flex justify-center md:items-center items-start md:mt-0 mt-16 bg-black/20 z-50">
          <CreateGroup
            toggleGroupModal={toggleGroupModal}
            showAddGroupModal={showAddGroupModal}
            setShowAddGroupModal={setShowAddGroupModal}
            userData={userData}
            allChatList={allChatList}
          />
        </div>
      )}
    </div>
  );
};

export default WoofMailChatList;
