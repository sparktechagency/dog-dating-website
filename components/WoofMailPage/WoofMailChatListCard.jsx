import { formatDateTime } from "@/helpers/date-formats";
import Image from "next/image";
import React from "react";

const WoofMailChatListCard = ({
  selectedConversation,
  setSelectedConversation,
  conversation,
  imageUrlSrc,
  userData,
  onlineUsers,
}) => {
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div
      onClick={() => handleConversationSelect(conversation)}
      className={`m-1 rounded  border-b border-gray-200 bg-[#FFFAF5] text-black ${
        conversation?._id === selectedConversation?._id
          ? "!bg-[#F88D58] text-white"
          : ""
      }`}
    >
      <div className="py-4 px-2 cursor-pointer flex justify-between ">
        <div className="flex items-center gap-2">
          <Image
            className="rounded aspect-square h-12 w-fit object-cover relative"
            src={imageUrlSrc}
            width={100}
            height={100}
            sixes="100vw"
            alt="Profile"
          />
          <div>
            <div className="flex items-center gap-1 text-xl">
              <div>
                {conversation?.isGroupChat
                  ? conversation?.groupName.length > 15
                    ? `${conversation?.groupName.slice(0, 10)}...`
                    : conversation?.groupName
                  : conversation?.users[0]?._id === userData?.userId
                  ? conversation?.users[1]?.fullName.length > 15
                    ? `${conversation?.users[1]?.fullName.slice(0, 15)}...`
                    : conversation?.users[1]?.fullName
                  : conversation?.users[0]?.fullName.length > 15
                  ? `${conversation?.users[0]?.fullName.slice(0, 15)}...`
                  : conversation?.users[0]?.fullName}
              </div>

              {!conversation?.isGroupChat &&
                (conversation?.users[0]?._id === userData?.userId
                  ? onlineUsers.includes(conversation?.users[1]?._id) && (
                      <div className="size-2 rounded-full bg-green-500"></div>
                    )
                  : onlineUsers.includes(conversation?.users[0]?._id) && (
                      <div className="size-2 rounded-full bg-green-500"></div>
                    ))}
            </div>
            <div className="text-sm">
              {conversation?.lastMessage?.text
                ? conversation?.lastMessage?.text
                : ""}
            </div>
          </div>
        </div>
        <div className="text-sm">
          {conversation?.lastMessage?.createdAt
            ? formatDateTime(conversation?.lastMessage?.createdAt)
            : ""}
        </div>
      </div>
    </div>
  );
};

export default WoofMailChatListCard;
