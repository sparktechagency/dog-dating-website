import {
  formatDateTime,
  formatDateTimeForChatList,
} from "@/helpers/date-formats";
import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";
import WoofHero from "@/asserts/woofHero.png";
import WoofSupporter from "@/asserts/woofSupporter.png";

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
      <div className="py-4 px-2 cursor-pointer">
        <div className="flex items-center gap-1">
          <Image
            loading="lazy"
            className="rounded aspect-square h-12 w-fit object-cover relative"
            src={imageUrlSrc}
            width={100}
            height={100}
            sixes="100vw"
            alt="Profile"
          />
          <div className="w-full mt-1">
            <div className="flex items-center gap-1 text-xl">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <p>
                    {conversation?.isGroupChat
                      ? conversation?.groupName.length > 10
                        ? `${conversation?.groupName.slice(0, 10)}...`
                        : conversation?.groupName
                      : conversation?.users[0]?._id === userData?.userId
                      ? conversation?.users[1]?.petName.length > 10
                        ? `${conversation?.users[1]?.petName.slice(0, 10)}...`
                        : conversation?.users[1]?.petName
                      : conversation?.users[0]?.petName.length > 10
                      ? `${conversation?.users[0]?.petName.slice(0, 10)}...`
                      : conversation?.users[0]?.petName}
                  </p>
                  {!conversation?.isGroupChat &&
                    (conversation?.users[0]?._id === userData?.userId
                      ? onlineUsers.includes(conversation?.users[1]?._id) && (
                          <div className="size-2 rounded-full bg-green-500"></div>
                        )
                      : onlineUsers.includes(conversation?.users[0]?._id) && (
                          <div className="size-2 rounded-full bg-green-500"></div>
                        ))}
                </div>
                <div>
                  {conversation?.isGroupChat ? null : conversation?.users[0]
                      ?._id === userData?.userId ? (
                    <div className="flex items-center gap-1">
                      {" "}
                      {conversation?.users[1]?.isSupported && (
                        <Tooltip title="Woof Spot Supporter">
                          <Image
                            loading="lazy"
                            src={WoofSupporter}
                            className="size-5"
                            width={1000}
                            height={1000}
                            alt="WoofSupporter"
                          />
                        </Tooltip>
                      )}
                      {conversation?.users[1]?.isHero && (
                        <Tooltip title="Woof Spot Hero">
                          <Image
                            loading="lazy"
                            src={WoofHero}
                            className="size-5"
                            width={1000}
                            height={1000}
                            alt="WoofHero"
                          />
                        </Tooltip>
                      )}{" "}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      {" "}
                      {conversation?.users[0]?.isSupported && (
                        <Tooltip title="Woof Spot Supporter">
                          <Image
                            loading="lazy"
                            src={WoofSupporter}
                            className="size-5"
                            width={1000}
                            height={1000}
                            alt="WoofSupporter"
                          />
                        </Tooltip>
                      )}
                      {conversation?.users[0]?.isHero && (
                        <Tooltip title="Woof Spot Hero">
                          <Image
                            loading="lazy"
                            src={WoofHero}
                            className="size-5"
                            width={1000}
                            height={1000}
                            alt="WoofHero"
                          />
                        </Tooltip>
                      )}{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="text-sm">
                {conversation?.lastMessage?.text
                  ? `${conversation?.lastMessage?.text.slice(0, 10)}...`
                  : ""}
              </div>
              <div className="text-xs">
                {conversation?.lastMessage?.createdAt
                  ? formatDateTime(conversation?.lastMessage?.createdAt)
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WoofMailChatListCard;
