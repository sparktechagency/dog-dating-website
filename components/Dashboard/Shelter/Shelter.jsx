"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import shelterImg from '../../../asserts/fp2.png'
import EditSelter from './EditSelter';

const Shelter = ({shelter}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
      };

      return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-4">
        <div className="flex justify-center">
          <Image src={shelterImg} alt="Dog Food" className="w-40 aspect-square object-cover rounded-full" />
        </div>
          <div className="text-start">
            <h2 className="text-[40px] font-bold text-[#302F51] mb-2">{shelter?.name}</h2>
        <p className="text-[24px] font-semibold text-[#302F51] mb-4">Age: {shelter?.age}</p>
          </div>
          <ul className="text-sm text-gray-600 mb-4">
            {
                shelter?.description.map((des,index)=>{
                    return <li key={index} className="mb-2 text-[12px] text-[#302F51] ">
                        •{des}
                    </li>
                })
            }
            <li className="mb-2">
              {/* • {description[0]} */}
            </li>
            <li>
              {/* • {description[1]} */}
            </li>
          </ul>
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="btn bg-[#F88D58] text-white hover:bg-black">
              Edit 
            </button>

            {
                isOpen && 
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
                <EditSelter shelter={shelter} setIsOpen={setIsOpen} isOpen={isOpen} toggleMenu={toggleMenu} />
                </div>
            }
            

          </div>
        </div>
      </div>
    );
};


export default Shelter;