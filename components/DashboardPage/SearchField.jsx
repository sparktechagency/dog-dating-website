import React from 'react';
import { FiSearch } from "react-icons/fi";


const SearchField = () => {
    return (
     
<div className='flex justify-around'>

<div className="flex items-center
 border-2 border-orange-500
  w-full  rounded-xl max-w-lg py-3 ">
  <div className="p-2">
    <FiSearch className='text-xl' />
  </div>
  <input
    type="text"
    placeholder="Search"
    className="  border-none outline-none w-full "
  />
</div>

<div className='flex flex-shrink-0 text-lg items-center justify-center'>
    <span className='text-3xl text-orange-500'> +</span>
   
    Add New Dog Info
</div>
</div>

        
    );
};

export default SearchField;