"use client";
import Image from "next/image";
import React, { useState } from "react";
import shelterImg from "../../../asserts/fp2.png";
import EditSelter from "./EditSelter";
import { Modal } from "antd";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { getImageUrl } from "@/helpers/config/envConfig";
import { toast } from "sonner";
import { useDeleteShelterMutation } from "@/redux/api/features/shelterApi";

const Shelter = ({ shelter }) => {
  const [deleteShelter] = useDeleteShelterMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (id) => {
    const toastId = toast.loading("Deleting Shelter...");
    try {
      const res = await deleteShelter(id).unwrap();
      if (res?.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete shelter", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const url = getImageUrl();
  const imageUrl = url + shelter?.image;

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-4">
        <div className=" flex justify-end items-end">
          <RiDeleteBin5Fill
            onClick={showModal}
            className="text-4xl text-red-500 hover:bg-red-100 rounded-full py-2 delay-100 cursor-pointer"
          />
        </div>
        <Modal
          title={`Do you want to delete ${shelter?.name} ?`}
          open={isModalOpen}
          onOk={() => handleOk(shelter?.id)}
          onCancel={handleCancel}
        >
          <div className="flex justify-center flex-col items-center">
            <Image
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              alt="shelter name"
              className="w-40 aspect-square object-cover rounded-full"
            />
            <h2 className="text-[40px] font-bold text-[#302F51] mb-2">
              {shelter?.name}
            </h2>
          </div>
        </Modal>

        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt="shelter name"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[80%] sm:w-[60%] md:w-[60%] xl:w-[50%] mx-auto aspect-square object-cover rounded-full"
          />
        </div>
        <div className="text-start">
          <h2 className="text-[40px] font-bold text-[#302F51] mb-2">
            {shelter?.name}
          </h2>
          <p className="text-[24px] font-semibold text-[#302F51] mb-4">
            Age: {shelter?.age}
          </p>
        </div>
        <div className="text-sm text-gray-600 mb-4">{shelter?.description}</div>
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="btn bg-[#F88D58] text-white hover:bg-black"
          >
            Edit
          </button>

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
              <EditSelter
                shelter={shelter}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shelter;
