

import React from 'react';
import Image from 'next/image';
import { FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social media icons
import ceo from '../../asserts/ceo.png'
import ced from '../../asserts/ced.png'


const OurPackPage = () => {
  return (
    <div className="bg-[#FFFAF5] py-12 ">
      <h1 className="text-center text-[62px] font-bold mb-2 text-[#302F51]">Our Pack</h1>
      <p className="text-center text-[40px] text-[#302F51] mb-8">Who we are</p>

      <div className="container mx-auto lg:py-[100px]  grid grid-cols-1  gap-8">
        {/* Team Member Cards */}
        <TeamMemberCard
          name="Sara Sowa"
          title="Founder & CEO"
          description="Lifelong Dog Lover, Recently Escaped The Corporate World To Make The Bigger World Better."
          email="information@woofspot.net"
          imageSrc={ceo}
          socialLink="https://linkedin.com"
          socialIcon={<FaLinkedin className="text-blue-600 text-5xl" />}
          direction='md:flex-row'
 
        />

        <TeamMemberCard
          name="Murphy Bear"
          title="Chief Executive Dog, CED"
          description="Lover Of All Things, But Especially Treatos. My Mission Is Making The World Better One Fetch, Chase, Pet, And Snack At A Time."
          email="information@woofspot.net"
          imageSrc={ced}
          socialLink="https://instagram.com"
          socialIcon={<FaInstagram className="text-pink-500 text-5xl" />}
           direction='md:flex-row-reverse'
        />
      </div>
    </div>
  );
};

export default OurPackPage;




const TeamMemberCard = ({ name, title, description, email, imageSrc, socialLink, socialIcon,direction}) => {
    return (
    //   <div className="flex flex-col md:flex-row items-center md:items-start justify-center p-6">
      <div className={`flex  justify-between items-center flex-col  ${direction} `}  >


        {/* Image */}
        <div className=" rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6  h-full  flex-1  flex justify-center">
          <Image src={imageSrc} alt={name} className="p-10 aspect-square object-cover rounded-xl" />
        </div>
  
        {/* Info */}
        <div className="text-center md:w-1/2 ">
          <h2 className="text-[38px] font-bold text-[#302F51]">{name}</h2>
          <p className="text-[16px] text-[#656565]">{title}</p>
          <p className="mt-2 text-[16px] font-bold text-[#656565]">{description}</p>
          <p className="mt-2 text-[16px]  font-semibold">{email}</p>
  
          {/* Social Media Icon */}
          <div className="mt-4 ">
            <a href={socialLink} target="_blank" rel="noopener noreferrer" className="inline-block ">
              {socialIcon}
            </a>
          </div>
        </div>


      </div>
    );
  };