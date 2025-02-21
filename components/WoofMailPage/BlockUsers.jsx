"use client";

import { Button, Form, Input, Typography, Upload } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaImage, FaTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import groupProfile from "./asserts/groupDefault.png";
import { getImageUrl } from "@/helpers/config/envConfig";
import {
  useGetAllBlockUsersQuery,
  useUnBlockChatMutation,
} from "@/redux/api/features/chatApi";
import { toast } from "sonner";

export default function BlockUsersModal(props) {
  const [unblockChat] = useUnBlockChatMutation();
  const { data } = useGetAllBlockUsersQuery();
  const alllUsers = data?.data;

  const { toggleBlocUsersModal, userData, allChatList } = props;

  const containerRef = useRef(null);
  const [form] = Form.useForm();
  const imageLiveUrl = getImageUrl();

  const handleUnBlock = async (userId) => {
    const toastId = toast.loading("Unblocking...");

    const id = userId;

    try {
      const res = await unblockChat({ id }).unwrap();

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      toggleBlocUsersModal();
    } catch (err) {
      toast.error(err?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex md:flex-row flex-col-reverse  select-none max-h-[400px] overflow-y-auto lg:min-w-[500px] md:min-w-[400px] min-w-[90%]  mx-auto  bg-[#FFFAF5]   shadow-lg"
    >
      <div className="bg-white w-full p-6 rounded-tl-3xl ">
        <h1 className=" md:block  hidden text-2xl font-semibold text-center text-[#2D2B4A] mb-6">
          Blocked User
        </h1>
        <div
          onClick={toggleBlocUsersModal}
          className="cursor-pointer  md:flex justify-end top-5  z-50 absolute right-5"
        >
          <p className="md:block  hidden  text-lg font-bold ">X</p>
        </div>

        <div className="space-y-3">
          {alllUsers?.length > 0 ? (
            alllUsers?.map((user) => (
              <div
                key={user?.userId}
                className="flex items-center justify-between gap-1 p-2 rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                <div className="relative flex items-center justify-center gap-1">
                  <Image
                    loading="lazy"
                    src={imageLiveUrl + user?.petImage}
                    width={1000}
                    height={1000}
                    alt={`${user?.petName}`}
                    className="w-12 h-12 rounded-xl object-cover"
                  />{" "}
                  <span className="text-gray-700 font-medium">
                    {user?.petName}
                  </span>
                </div>
                <Button
                  onClick={() => handleUnBlock(user?.userId)}
                  className="!bg-[#F88D58] !text-white !border-none !ring-0 !outline-none"
                >
                  Unblock
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold">
              No blocked users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
