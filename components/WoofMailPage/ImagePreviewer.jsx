import Image from "next/image";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ImagePreviewer = ({ imageUrl, image, msg, userData, imgHeight }) => {
  return (
    <PhotoProvider>
      <div className={`w-32 ${imgHeight ? `h-[${imgHeight}px]` : "h-auto"}`}>
        <PhotoView
          speed={() => 1000}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
          maskOpacity={0.3} // ✅ Set mask opacity to 0.3
          src={imageUrl + image}
        >
          <Image
            loading="lazy"
            src={imageUrl + image}
            alt="Profile"
            height={500}
            width={500}
            className={`cursor-pointer h-32 object-cover object-top rounded-md relative border border-[#FF6740] ${
              msg?.sender?._id === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "order-last"
                : "order-first"
            }`}
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
};

export default ImagePreviewer;
