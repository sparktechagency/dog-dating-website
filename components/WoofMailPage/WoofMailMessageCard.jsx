import { formatDateTime } from "@/helpers/date-formats";
import Image from "next/image";
import React from "react";
import ImagePreviewer from "./ImagePreviewer";

const WoofMailMessageCard = ({ msg, userData, imageUrl }) => {
  return (
    <div>
      <div>
        <div className="flex items-start gap-1">
          {msg?.sender !== null && (
            <Image
              loading="lazy"
              src={
                msg?.sender?.petImage
                  ? imageUrl + msg.sender.petImage
                  : msg?.image
                  ? imageUrl + msg.image
                  : "/assets/images/user.png"
              }
              width={1000}
              height={1000}
              alt="Profile"
              className={`h-6 w-6 object-cover rounded-md relative mt-2 ${
                msg?.sender?._id === userData?.userId ||
                msg?.sender?.toString() === userData?.userId
                  ? "order-last"
                  : "order-first"
              }`}
              sizes="100vw"
            />
          )}
          <div
            className={`flex items-center gap-2 w-full ${
              msg?.sender?._id === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "justify-end"
                : msg?.sender !== null
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div>
              {msg?.images?.length > 0 && (
                <div
                  className={`grid grid-cols-1 gap-2.5 ${
                    msg?.images?.length > 2 ? " md:grid-cols-2" : "grid-cols-1"
                  } py-1 px-3 my-2 rounded-md ${
                    msg?.sender?._id === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "w-fit ml-auto text-right text-base-color text-white bg-[#F88D58]/10"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.images?.map((image, index) => (
                    <ImagePreviewer
                      msg={msg}
                      imageUrl={imageUrl}
                      image={image}
                      userData={userData}
                      key={index}
                    />
                  ))}
                </div>
              )}
              {msg?.text?.length > 0 && (
                <p
                  className={`py-1 px-3 my-2 rounded-md ${
                    msg?.sender?._id === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "w-fit ml-auto text-right text-base-color text-white bg-[#F88D58]"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.text}
                </p>
              )}

              {msg?.sender !== null && (
                <p
                  className={`text-[11px] text-secondary-color ${
                    msg?.sender?._id === userData?.userId ||
                    msg?.sender?.toString() === userData?.userId
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {formatDateTime(msg?.createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WoofMailMessageCard;
