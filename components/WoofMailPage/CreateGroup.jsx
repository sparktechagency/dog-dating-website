"use client";

import { Button, Form, Input, Typography, Upload } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaImage, FaTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import groupProfile from "./asserts/groupDefault.png";
import profileImage from "./asserts/newChat.png";
import { getImageUrl } from "@/helpers/config/envConfig";
import { useCreateChatMutation } from "@/redux/api/features/chatApi";
import { toast } from "sonner";

export default function CreateGroup(props) {
  const {
    showAddGroupModal,
    setShowAddGroupModal,
    toggleGroupModal,
    userData,
    allChatList,
  } = props;

  const [createChat] = useCreateChatMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAddGroupModal &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowAddGroupModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddGroupModal, setShowAddGroupModal]);

  const getFilteredConversations = (allChatList) => {
    const uniqueUsers = new Set();
    const filteredConversations = [];

    allChatList?.data?.forEach((conversation) => {
      if (conversation?.isGroupChat) {
        return; // Skip group chats
      }

      // Extract user IDs from the conversation
      const userIds = conversation.users.map((user) => user._id);

      // Check for duplicate users
      const newUsers = userIds.filter((id) => !uniqueUsers.has(id));

      if (newUsers.length > 0) {
        // Add unique users to the Set
        newUsers.forEach((id) => uniqueUsers.add(id));

        // Clone the conversation and include only unique users
        const filteredConversation = {
          ...conversation,
          users: conversation.users.filter((user) =>
            newUsers.includes(user._id)
          ),
        };

        filteredConversations.push(filteredConversation);
      }
    });

    return filteredConversations;
  };

  const allUsers = getFilteredConversations(allChatList);

  const filteredConversations = allUsers?.filter((conversation) =>
    conversation?.users[0]?._id === userData?.userId
      ? conversation?.users[1]?.fullName
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase())
      : conversation?.users[0]?.fullName
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase())
  );

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const imageLiveUrl = getImageUrl();

  const [imageUrl, setImageUrl] = useState(groupProfile);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(groupProfile);
    } else {
      const file = info.file.originFileObj || info.file;
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      } else {
      }
    }
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("creatng group chat...");
    const formData = new FormData();

    const data = {
      groupAdmins: [userData?.userId],
      createdBy: userData?.userId,
      users: [userData?.userId, ...selectedUsers],
      groupName: values?.groupName,
      isGroupChat: true,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("file", values?.groupProfilePicture?.file?.originFileObj);

    try {
      const res = await createChat(formData).unwrap();
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      setSelectedUsers([]);
      setImageUrl(groupProfile);
      form.resetFields();
      toggleGroupModal();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create chat", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex md:flex-row flex-col-reverse  select-none lg:min-w-[900px] md:min-w-[800px] min-w-[90%]  mx-auto  bg-[#FFFAF5] rounded-3xl  shadow-lg"
    >
      <div className="bg-white p-6 rounded-tl-3xl rounded-es-3xl ">
        <h1 className=" md:block  hidden text-2xl font-semibold text-center text-[#2D2B4A] mb-6">
          Create Group Chat
        </h1>
        <div
          onClick={toggleGroupModal}
          className="cursor-pointer  md:flex justify-end top-5  z-50 absolute right-5"
        >
          <p className="md:block  hidden  text-lg font-bold ">X</p>
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
        </div>
        <p className="md:block  hidden md:text-sm text-xs font-normal mb-4 -mt-5 ms-4">
          Select Users to add to the chat
        </p>

        <div className="space-y-3">
          {filteredConversations?.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-1 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                toggleUser(
                  user?.users[0]?._id === userData?.userId
                    ? `${user?.users[1]?._id}`
                    : `${user?.users[0]?._id}`
                )
              }
            >
              <div className="relative flex items-center justify-center gap-1">
                {selectedUsers.includes(
                  user?.users[0]?._id === userData?.userId
                    ? `${user?.users[1]?._id}`
                    : `${user?.users[0]?._id}`
                ) ? (
                  <div className="">
                    <BsCheckCircleFill
                      className="text-[#FF7F57] bg-white rounded-full"
                      size={20}
                    />
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-md" />
                )}
                <Image
                  src={
                    user?.users[0]?._id === userData?.userId
                      ? `${imageLiveUrl}${user?.users[1]?.petImage}`
                      : `${imageLiveUrl}${user?.users[0]?.petImage}`
                  }
                  width={1000}
                  height={1000}
                  alt={`${
                    user?.users[0]?._id === userData?.userId
                      ? `${user?.users[1]?.petName}`
                      : `${user?.users[0]?.petName}`
                  }'s avatar`}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>
              <span className="text-gray-700 font-medium">
                {user?.users[0]?._id === userData?.userId
                  ? `${user?.users[1]?.petName}`
                  : `${user?.users[0]?.petName}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className=" rounded-lg  p-6  mx-auto flex-1 md:px-20">
        <div className="md:hidden block">
          <h1 className="text-2xl font-semibold text-center text-[#2D2B4A] mb-6">
            Create Group Chat
          </h1>
          <div
            onClick={toggleGroupModal}
            className="cursor-pointer flex justify-end top-6  z-50 absolute right-5 text-xl font-bold "
          >
            <p>X</p>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="relative w-fit">
            <Image
              src={imageUrl}
              alt="Group Image"
              width={0}
              height={0}
              className="w-40 h-40 rounded-full object-cover object-top border border-secondary-color"
            />
            <div
              onClick={() => setImageUrl(groupProfile)}
              className={`${
                imageUrl === groupProfile && "hidden"
              } cursor-pointer w-fit p-2 border bg-[#F88D58] border-white absolute left-28 bottom-0 bg-secondary-color rounded-full`}
            >
              {/* <AiOutlineEdit className="text-primary-color " /> */}
              <FaTrashAlt className=" text-white" />
            </div>
          </div>
          <Form.Item
            rules={[{ required: true, message: "Please upload group picture" }]}
            name="groupProfilePicture"
            className="mt-2 mb-5"
          >
            <Upload
              className="cursor-pointer"
              maxCount={1}
              showUploadList={false}
              customRequest={(options) => {
                // Handle file upload manually here

                // Example: Simulate a successful upload
                setTimeout(() => {
                  options.onSuccess("ok");
                }, 1000);
              }}
              accept="image/*"
              multiple={false}
              onChange={handleImageUpload}
            >
              <div className="flex items-center gap-2 text-[12px] border border-[#F88D58] py-3 px-3 rounded-md text-[#F88D58]">
                {" "}
                <FaImage className="text-lg" />
                Upload Group Picture
              </div>
            </Upload>
          </Form.Item>

          <Typography label={5} className="mb-1">
            Group Name
          </Typography>
          <Form.Item
            rules={[{ required: true, message: "Please enter group name" }]}
            name="groupName"
          >
            <Input placeholder="Enter Group Name " className="py-2 !text-lg" />
          </Form.Item>

          {/* <Typography label={5} className="mb-1">
            Phone Number
          </Typography> */}
          {/* <div className="flex gap-2 ">
            <Form.Item initialValue={initialValues.phoneCode} name="phoneCode">
              <Select
                className="!w-40  h-12 "
                options={countryCodes.map((country) => ({
                  label: (
                    <div className="flex items-center">
                      <Image
                        src={profileImage}
                        alt={`${country.value} Flag`}
                        className="w-5 h-3 inline-block mr-2"
                      />
                      {country.label}
                    </div>
                  ),
                  value: country.value,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                className="w-full h-12 !text-lg"
                placeholder="Enter Phone Number"
              />
            </Form.Item>
          </div> */}

          {/* <Form.Item label="Date of Birth" name="birthday">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item> */}
          <div className="">
            <Button
              className="!bg-[#F88D58] mt-4 py-3 inline-block w-fit h-fit"
              type="primary"
              block
              htmlType="submit"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
