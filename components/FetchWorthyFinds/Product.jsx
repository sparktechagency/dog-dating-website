import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import productImg from "../../asserts/product.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getImageUrl } from "@/helpers/config/envConfig";
import Link from "next/link";

const Product = ({ product }) => {
  const url = getImageUrl();
  const imageUrl = url + product?.image;
  return (
    <div className="rounded overflow-hidden shadow-xl bg-white">
      {/* Product Image */}
      <div className="relative">
        <Image
          loading="lazy"
          src={imageUrl} // Replace with your actual image path
          alt="Dog Food"
          width={0}
          height={0}
          sizes="100vw"
          className="h-[450px] w-full object-cover "
        />

        {/* Black overlay on the left side */}
        <div className="absolute bottom-0 left-0 w-full h-[450px] bg-gradient-to-t from-black/80 via-black/60 to-black/40" />

        {/* Text and Price over the image */}
        <div className="absolute bottom-0 left-0 m-4 text-white z-10">
          <div className="flex gap-2 items-center">
            <h3 className="text-[32px] font-bold">{product?.title}</h3>{" "}
            <Link href={product?.productLink} target="_blank">
              <FaExternalLinkAlt className="text-white text-2xl" />
            </Link>
          </div>
          <p className="text-[20px]">${product?.price?.toFixed(2)}</p>
          <p className="text-[20px]">{product?.description}</p>
        </div>

        {/* External Link Icon */}
        <div className="absolute bottom-0 right-0 m-4 p-2  rounded-full  z-10"></div>
      </div>
    </div>
  );
};

export default Product;
