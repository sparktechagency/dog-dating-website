import Image from 'next/image';
import React from 'react';
import dogFood from '../../../asserts/dogfood.png'

const Food = () => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
        <div className="flex justify-center">
          <Image src={dogFood} alt="Dog Food" className="w-32 h-32 object-cover rounded-full" />
        </div>
          <div className="text-start">
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">Dog Food</h2>
            <p className="text-2xl font-semibold text-gray-700 mb-4">$160.00</p>
          </div>
          <ul className="text-sm text-gray-600 mb-4">
            <li className="mb-2">
              • A must-have for dog training: a clip-on dog treat pouch that allows for easy access to rewards during training sessions.
            </li>
            <li>
              • Practical and durable design: made with heavy-duty pack-cloth material that is water-resistant and reinforced with a rip-stop liner, this dog training treat pouch is built to last.
            </li>
          </ul>
          <div className="flex justify-end">
            <button className="btn bg-[#F88D58] text-white">
              Edit 
            </button>
            
          </div>
        </div>
      </div>
    );
};

export default Food;