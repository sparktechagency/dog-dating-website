"use client"
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import img1 from '../../asserts/fp1.png';
import img2 from '../../asserts/fp2.png';
import img3 from '../../asserts/fp3.png';
import img4 from '../../asserts/fp4.png';
import img5 from '../../asserts/fp5.png';
import img6 from '../../asserts/fp6.png';
import img7 from '../../asserts/fp7.png';
import img8 from '../../asserts/fp8.png';
import img9 from '../../asserts/fp9.png';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { useState } from 'react';
import DonateNow from './DonateNow/DonateNow';
import Link from 'next/link';
import DonateSuccess from './DonateNow/DonateSuccess';

const FeaturedPups = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null)

  const openModal = (id) =>{
    setId(id)
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  const shelters = [
    { id: 1, name: 'ABC Shelter', image: img1 },
    { id: 2, name: 'ABC Shelter', image: img2 },
    { id: 3, name: 'ABC Shelter', image: img3 },
    { id: 4, name: 'ABC Shelter', image: img4 },
    { id: 5, name: 'ABC Shelter', image: img5 },
    { id: 6, name: 'ABC Shelter', image: img6 },
    { id: 7, name: 'ABC Shelter', image: img7 },
    { id: 8, name: 'ABC Shelter', image: img8 },
    { id: 9, name: 'ABC Shelter', image: img9 },
  ];


  return (
    <div className="bg-[#FFFAF5] ">
      {/* Hero Section */}
      <div className="relative w-full md:h-[35vw]  h-[40vh]  bg-cover bg-no-repeat bg-right-top md:-mt-10 mt-16" style={{ backgroundImage: 'url(/fpb.png)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-white absolute lg:left-36 md:left-16 lg:top-1/4 md:top-10 text-center ">
            <h1 className="lg:text-[3.75vw] md:text-[36px] text-[22px] font-bold " >COMMUNITY SUPPORT</h1>
            <p className="md:mt-2 lg:text-[1.25vw] md:text-[16px] text-[9px] md:w-[45vw] w-[70vw] ms-0 md:ms-3">
              Meet your future best friend! We spotlight local shelter dogs waiting for their forever homes.
              From tail-waggers to belly-rub lovers, each pup is ready to be part of your family and rescue
              you right back. Every wag deserves a home!
            </p>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="py-[50px] bg-[#FFFAF5]">
        <h2 className="lg:text-[2.083vw] text-[2em] text-center font-bold mb-8">Meet our Featured Shelter Pups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[100px] gap-x-[24px] mx-[7.8125vw]">
          {shelters.map((shelter) => (
            // <Link href={`fearured-pups/${shelter?.id}`} key={shelter?.id} className='cursor-pointer'>
            <div
            onClick={()=>openModal(shelter?.id)}
            key={shelter?.id} 
              className="cursor-pointer relative bg-white shadow-lg rounded-lg overflow-hidden   min-h-[74.3321vh] flex flex-col justify-end items-center"
            >
              {/* Image Section with Full Width and Height */}
              <div className="absolute inset-0">
                <Image
                  src={shelter?.image}
                  alt={shelter?.name}
                  layout="fill"
                  objectFit="cover"
                  className="  object-top"
                />
              </div>

              {/* Black overlay on the left side */}
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              {/* Text and Icon Overlay */}
              <div className="relative z-10 text-white p-4 flex justify-between items-center w-full">
                <span className="lg:text-[2.0833vw] text-[18px] font-semibold">{shelter?.name}</span>
                <FiExternalLink className="lg:text-[2.0833vw] text-[18px]" />
              </div>

            </div>
            // </Link>

          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#FFFAF5] py-[50px] xl:px-[420px] text-center ">
        <p className="xl:text-[1.2vw] lg:text-[20px] text-[18px] mb-4 lg:mx-0 mx-3">
          Your donation helps give shelter dogs the care and love they need while
          waiting for their forever homes. Every contribution makes a tail wag and a heart hopeful. Click below to make a difference today!
        </p>
        <button   className="md:mt-[50] mt-5 text-white no-underline bg-[#F88D58] hover:bg-black 
                 xl:px-[48px] xl:py-[20px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] 
                 px-[48px] py-[20px] md:mb-0 mb-4 md:text-fluid-button text-[18px] flex justify-center 
                 items-center gap-[16px] rounded-lg mx-auto">
          Donate Now <MdOutlineArrowOutward />
        </button>
        {
isOpen &&
<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50'>

  <DonateNow closeModal={closeModal} setOpen={setOpen} setIsOpen={setIsOpen} isOpen={isOpen}  id={id} />
</div>
       }

{open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
          <DonateSuccess setOpen={setOpen} open={open} id={id} />
        </div>
      )}


      </div>
    </div>
  );
};

export default FeaturedPups;
