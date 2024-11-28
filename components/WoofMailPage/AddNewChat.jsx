'use client'
import { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { BsCheckCircleFill } from 'react-icons/bs'
import profileImage from './asserts/newChat.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function AddNewChat(props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const containerRef = useRef(null);
  const router = useRouter();

  

const {showAddUserModal,setShowAddUserModal,toggleUserModal}=props

useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAddUserModal &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowAddUserModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddUserModal,setShowAddUserModal]);



  // Mock user data
  const users = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: 'Larry',
    avatar: profileImage
  }))

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectedUsers=()=>{
    const userData=selectedUsers;
    setSelectedUsers([])
    console.log(userData);
    setTimeout(() => setShowAddUserModal(false), 100);


  }


  return (
    <div ref={containerRef}  className="relative select-none lg:min-w-[700px] md:min-w-[600px] min-w-[90%]  mx-auto bg-white rounded-3xl p-6 shadow-lg">
       

      <h1 className="text-2xl font-semibold text-center text-[#2D2B4A] mb-6">
        Add New Chat
      </h1> 
      <div onClick={toggleUserModal} className='cursor-pointer flex justify-end top-3  z-50 absolute right-5'>
      <p>X</p>
        </div>
      
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search members"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#FF7F57]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          aria-label="Add selected users to chat"
          onClick={handleSelectedUsers}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FF7F57] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ff6a3d] transition-colors"
        >
          Add To Chat
        </button>
        
      </div>
<p className="md:text-sm text-xs font-normal mb-4 -mt-5 ms-4">Select Users to add to the chat</p>
      
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
            onClick={() => toggleUser(user.id)}
          >
            <div className="relative flex items-center justify-center gap-2">
              {selectedUsers.includes(user.id) ? (
                <div className="">
                  <BsCheckCircleFill className="text-[#FF7F57] bg-white rounded-full" size={20} />
                </div>
              ) : (
                <div className="w-5 h-5 border-2 border-gray-200 rounded-md" />
              )}
              <Image
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="w-12 h-12 rounded-xl object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

