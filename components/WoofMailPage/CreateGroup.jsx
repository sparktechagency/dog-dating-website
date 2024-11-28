"use client";

import {
    Form,
    Input,
    Upload
} from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaImage, FaTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import groupProfile from "./asserts/groupProfile.png";
import profileImage from "./asserts/newChat.png";


export default function CreateGroup(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const containerRef = useRef(null);

  const [form] = Form.useForm();

  const { showAddGroupModal, setShowAddGroupModal, toggleGroupModal } = props;

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

  // Mock user data
  const users = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: "Larry",
    avatar: profileImage,
  }));

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const [imageUrl, setImageUrl] = useState(groupProfile);

  //   const countryCodes = [
  //     { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
  //     { label: "+1", value: "CA", flag: "https://flagcdn.com/w320/ca.png" },
  //     { label: "+7", value: "RU", flag: "https://flagcdn.com/w320/ru.png" },
  //     { label: "+20", value: "EG", flag: "https://flagcdn.com/w320/eg.png" },
  //     { label: "+27", value: "ZA", flag: "https://flagcdn.com/w320/za.png" },
  //     { label: "+30", value: "GR", flag: "https://flagcdn.com/w320/gr.png" },
  //     { label: "+31", value: "NL", flag: "https://flagcdn.com/w320/nl.png" },
  //     { label: "+32", value: "BE", flag: "https://flagcdn.com/w320/be.png" },
  //     { label: "+33", value: "FR", flag: "https://flagcdn.com/w320/fr.png" },
  //     { label: "+34", value: "ES", flag: "https://flagcdn.com/w320/es.png" },
  //     { label: "+36", value: "HU", flag: "https://flagcdn.com/w320/hu.png" },
  //     { label: "+39", value: "IT", flag: "https://flagcdn.com/w320/it.png" },
  //     { label: "+40", value: "RO", flag: "https://flagcdn.com/w320/ro.png" },
  //     { label: "+41", value: "CH", flag: "https://flagcdn.com/w320/ch.png" },
  //     { label: "+44", value: "GB", flag: "https://flagcdn.com/w320/gb.png" },
  //     { label: "+45", value: "DK", flag: "https://flagcdn.com/w320/dk.png" },
  //     { label: "+46", value: "SE", flag: "https://flagcdn.com/w320/se.png" },
  //     { label: "+47", value: "NO", flag: "https://flagcdn.com/w320/no.png" },
  //     { label: "+48", value: "PL", flag: "https://flagcdn.com/w320/pl.png" },
  //     { label: "+49", value: "DE", flag: "https://flagcdn.com/w320/de.png" },
  //     { label: "+51", value: "PE", flag: "https://flagcdn.com/w320/pe.png" },
  //     { label: "+52", value: "MX", flag: "https://flagcdn.com/w320/mx.png" },
  //     { label: "+53", value: "CU", flag: "https://flagcdn.com/w320/cu.png" },
  //     { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" },
  //     { label: "+55", value: "BR", flag: "https://flagcdn.com/w320/br.png" },
  //     { label: "+56", value: "CL", flag: "https://flagcdn.com/w320/cl.png" },
  //     { label: "+57", value: "CO", flag: "https://flagcdn.com/w320/co.png" },
  //     { label: "+58", value: "VE", flag: "https://flagcdn.com/w320/ve.png" },
  //     { label: "+60", value: "MY", flag: "https://flagcdn.com/w320/my.png" },
  //     { label: "+61", value: "AU", flag: "https://flagcdn.com/w320/au.png" },
  //     { label: "+62", value: "ID", flag: "https://flagcdn.com/w320/id.png" },
  //     { label: "+63", value: "PH", flag: "https://flagcdn.com/w320/ph.png" },
  //     { label: "+64", value: "NZ", flag: "https://flagcdn.com/w320/nz.png" },
  //     { label: "+65", value: "SG", flag: "https://flagcdn.com/w320/sg.png" },
  //     { label: "+66", value: "TH", flag: "https://flagcdn.com/w320/th.png" },
  //     { label: "+81", value: "JP", flag: "https://flagcdn.com/w320/jp.png" },
  //     { label: "+82", value: "KR", flag: "https://flagcdn.com/w320/kr.png" },
  //     { label: "+84", value: "VN", flag: "https://flagcdn.com/w320/vn.png" },
  //     { label: "+86", value: "CN", flag: "https://flagcdn.com/w320/cn.png" },
  //     { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" }, // Bangladesh
  //     { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" },
  //     { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
  //     { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" },
  //     { label: "+93", value: "AF", flag: "https://flagcdn.com/w320/af.png" },
  //     { label: "+94", value: "LK", flag: "https://flagcdn.com/w320/lk.png" },
  //     { label: "+95", value: "MM", flag: "https://flagcdn.com/w320/mm.png" },
  //     { label: "+98", value: "IR", flag: "https://flagcdn.com/w320/ir.png" },
  //     { label: "+211", value: "SS", flag: "https://flagcdn.com/w320/ss.png" },
  //     { label: "+212", value: "MA", flag: "https://flagcdn.com/w320/ma.png" },
  //     { label: "+213", value: "DZ", flag: "https://flagcdn.com/w320/dz.png" },
  //     { label: "+216", value: "TN", flag: "https://flagcdn.com/w320/tn.png" },
  //     { label: "+218", value: "LY", flag: "https://flagcdn.com/w320/ly.png" },
  //     { label: "+220", value: "GM", flag: "https://flagcdn.com/w320/gm.png" },
  //     { label: "+221", value: "SN", flag: "https://flagcdn.com/w320/sn.png" },
  //     { label: "+222", value: "MR", flag: "https://flagcdn.com/w320/mr.png" },
  //     { label: "+223", value: "ML", flag: "https://flagcdn.com/w320/ml.png" },
  //     { label: "+224", value: "GN", flag: "https://flagcdn.com/w320/gn.png" },
  //     { label: "+225", value: "CI", flag: "https://flagcdn.com/w320/ci.png" },
  //     { label: "+226", value: "BF", flag: "https://flagcdn.com/w320/bf.png" },
  //     { label: "+227", value: "NE", flag: "https://flagcdn.com/w320/ne.png" },
  //     { label: "+228", value: "TG", flag: "https://flagcdn.com/w320/tg.png" },
  //     { label: "+229", value: "BJ", flag: "https://flagcdn.com/w320/bj.png" },
  //     { label: "+230", value: "MU", flag: "https://flagcdn.com/w320/mu.png" },
  //     { label: "+231", value: "LR", flag: "https://flagcdn.com/w320/lr.png" },
  //     { label: "+232", value: "SL", flag: "https://flagcdn.com/w320/sl.png" },
  //     { label: "+233", value: "GH", flag: "https://flagcdn.com/w320/gh.png" },
  //     { label: "+234", value: "NG", flag: "https://flagcdn.com/w320/ng.png" },
  //     { label: "+235", value: "TD", flag: "https://flagcdn.com/w320/td.png" },
  //     { label: "+236", value: "CF", flag: "https://flagcdn.com/w320/cf.png" },
  //     { label: "+237", value: "CM", flag: "https://flagcdn.com/w320/cm.png" },
  //     { label: "+238", value: "CV", flag: "https://flagcdn.com/w320/cv.png" },
  //     { label: "+239", value: "ST", flag: "https://flagcdn.com/w320/st.png" },
  //     { label: "+240", value: "GQ", flag: "https://flagcdn.com/w320/gq.png" },
  //     { label: "+241", value: "GA", flag: "https://flagcdn.com/w320/ga.png" },
  //     { label: "+242", value: "CG", flag: "https://flagcdn.com/w320/cg.png" },
  //     { label: "+243", value: "CD", flag: "https://flagcdn.com/w320/cd.png" },
  //     { label: "+244", value: "AO", flag: "https://flagcdn.com/w320/ao.png" },
  //     { label: "+248", value: "SC", flag: "https://flagcdn.com/w320/sc.png" },
  //     { label: "+249", value: "SD", flag: "https://flagcdn.com/w320/sd.png" },
  //     { label: "+250", value: "RW", flag: "https://flagcdn.com/w320/rw.png" },
  //     { label: "+251", value: "ET", flag: "https://flagcdn.com/w320/et.png" },
  //     { label: "+252", value: "SO", flag: "https://flagcdn.com/w320/so.png" },
  //     { label: "+253", value: "DJ", flag: "https://flagcdn.com/w320/dj.png" },
  //     { label: "+254", value: "KE", flag: "https://flagcdn.com/w320/ke.png" },
  //     { label: "+255", value: "TZ", flag: "https://flagcdn.com/w320/tz.png" },
  //     { label: "+256", value: "UG", flag: "https://flagcdn.com/w320/ug.png" },
  //     { label: "+260", value: "ZM", flag: "https://flagcdn.com/w320/zm.png" },
  //     { label: "+263", value: "ZW", flag: "https://flagcdn.com/w320/zw.png" },
  //     { label: "+264", value: "NA", flag: "https://flagcdn.com/w320/na.png" },
  //     { label: "+265", value: "MW", flag: "https://flagcdn.com/w320/mw.png" },
  //   ];

  const handleImageUpload = (info) => {


    if (info.file.status === "removed") {
      setImageUrl(groupProfile);
    } else {
      const file = info.file.originFileObj || info.file;
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = (values) => {
    const fromValues = { ...values, picture: imageUrl,selectedUsers };
    setSelectedUsers([])
    setImageUrl(groupProfile)
    form.resetFields();
    console.log("Success:", fromValues);
    setTimeout(() => setShowAddGroupModal(false), 100);


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
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleUser(user.id)}
            >
              <div className="relative flex items-center justify-center gap-2">
                {selectedUsers.includes(user.id) ? (
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
                <div onClick={()=>setImageUrl(groupProfile)} className={`${imageUrl === groupProfile && "hidden"} cursor-pointer w-fit p-2 border bg-[#F88D58] border-white absolute left-28 bottom-0 bg-secondary-color rounded-full`}>
                  {/* <AiOutlineEdit className="text-primary-color " /> */}
                  <FaTrashAlt className=" text-white"/>

                </div>

          </div>
          <Form.Item label="Full Name" name="fullName">
            <Input placeholder="Enter Full Name " className="py-2 !text-lg" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Please enter a valid email!" }]}
          >
            <Input placeholder="Enter Email" className="py-2 !text-lg" />
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
          <div className="flex justify-between gap-3">
            <Upload
            name="picture"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
              accept="image/*"
              multiple={false}
              onChange={handleImageUpload}
            >
              <div className="flex items-center gap-2 text-[14px] bg-[#F88D58] py-3 px-3 rounded-md text-white">
                {" "}
                <FaImage className="text-lg" />
                Upload Group Picture
              </div>
            </Upload>

            <button
              htmlType="submit"
              className="flex items-center text-[14px] bg-[#F88D58] py-3 px-3 rounded-md text-white"
            >
              {" "}
              Save Changes
            </button>

            {/* <Button
            className="!bg-[#2B4257] mt-4 py-5"
            type="primary"
            block
            htmlType="submit"
          >
            Save Changes
          </Button>            */}
          </div>
        </Form>
      </div>
    </div>
  );
}
