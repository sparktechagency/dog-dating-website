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
    <div className="max-w-[387px] rounded overflow-hidden shadow-xl bg-white">
      {/* Product Image */}
      <div className="relative">
        <Image
          src={imageUrl} // Replace with your actual image path
          alt="Dog Food"
          width={0}
          height={0}
          sizes="100vw"
          className="h-96 w-full object-cover "
        />

        {/* Black overlay on the left side */}
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />

        {/* Text and Price over the image */}
        <div className="absolute bottom-0 left-0 m-4 text-white z-10">
          <h3 className="text-[32px] font-bold">{product?.title}</h3>
          <p className="text-[20px]">${product?.price?.toFixed(2)}</p>
        </div>

        {/* External Link Icon */}
        <div className="absolute bottom-0 right-0 m-4 p-2  rounded-full  z-10">
          <Link href={product?.productLink} target="_blank">
            <FaExternalLinkAlt className="text-white text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
