import { formatDateTime } from "@/helpers/date-formats";
import Image from "next/image";
import React from "react";

const WoofMailMessageCard = ({ msg, userData, imageUrl }) => {
  return (
    <div>
      <div>
        <div className="flex items-start gap-1">
          <Image
            src={
              msg?.sender?.image
                ? imageUrl + msg.sender.image
                : msg?.image
                ? imageUrl + msg.image
                : "fallback-image-url"
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
          <div
            className={`flex items-center gap-2 w-full ${
              msg?.sender?._id === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WoofMailMessageCard;
