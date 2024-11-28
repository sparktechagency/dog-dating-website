import Image from 'next/image';
import banner from '../../asserts/fw1.png';
const FetchWorthyFindsBanner = () => {
    return ( 
<div className="relative flex md:flex-row flex-col items-center justify-around
 bg-[#696969] lg:h-[280px] md:h-[200px] h-full  md:px-[150px] gap-[12] ">
      {/* Left side image */}
      <div className="h-full lg:w-[512px] md:w-[300px] w-full ">
        <Image
          src={banner} 
          alt="Cozy dog"
          className="md:rounded-lg shadow-lg object-cover w-full h-full "
        />
      </div>

      {/* Right side with text */}
      <div className="md:ml-8 text-white flex-1 md:pb-0 pb-5">
        <h1 className=" xl:text-[3.1666vw] text-[44px] font-medium text-center">FAVORITE THINGS</h1>
        <p className=" xl:text-[1.25vw] text-[16px] font-medium mt-[20px] text-center mx-2 md:mx-0">
          From cozy to practical, these are a few of our favorite things right now.
          We hope that you and your pup will love them, too.
        </p>
      
      </div>


    </div>
  );
};

export default FetchWorthyFindsBanner;