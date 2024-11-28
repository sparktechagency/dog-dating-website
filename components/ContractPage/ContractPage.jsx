import React from 'react';
import img from '../../asserts/contract.png'

// const ContractPage = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default ContractPage;


// import React from 'react';
import Image from 'next/image';

const ContractPage = () => {
  return (
    <div className="bg-[#FFFAF5] my-10">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">CONTACT US</h1>
          <p className="text-xl text-gray-600 mt-4">
            information@woofspot.net
          </p>
          <p className="text-md text-gray-600 mt-2">
            If you are interested in advertising, connecting & collaborating, or sharing feedback and ideas with Woof Spot, please send us a note!
          </p>
        </div>

        {/* Form and Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div>
            <Image
              src={img}
              alt="Contact Us Dog"
              className="rounded-lg shadow-lg aspect-square object-cover"
            />
          </div>

          {/* Contact Form */}
          <div className=" p-8 rounded-lg ">
            <form action="#" method="POST" className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@company.com"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  placeholder="Tell us a little about yourself..."
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-md shadow-lg hover:bg-orange-600 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
