import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import productImg from "../../asserts/product.png";
import { FaExternalLinkAlt } from 'react-icons/fa';

const Product = ({product}) => {

  const {name,price ,} = product;


  return (
    <div className="max-w-[387px] rounded overflow-hidden shadow-xl bg-white">
      {/* Product Image */}
      <div className="relative">
        <Image
          src={productImg} // Replace with your actual image path
          alt="Dog Food"
          width={0}
          height={0}
          className="object-cover w-64"
        />

        {/* Black overlay on the left side */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Text and Price over the image */}
        <div className="absolute bottom-0 left-0 m-4 text-white z-10">
          <h3 className="text-[32px] font-bold">{name}</h3>
          <p className="text-[20px]">${price.toFixed(2)	}</p>
        </div>

        {/* External Link Icon */}
        <div className="absolute bottom-0 right-0 m-4 p-2  rounded-full  z-10">
        <FaExternalLinkAlt className="text-white text-2xl"  />
        </div>
      </div>
    </div>
  );
};

export default Product;
