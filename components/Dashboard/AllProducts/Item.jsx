"use client";
import Image from "next/image";
import React, { useState } from "react";
import dogFood from "../../../asserts/dogfood.png";
import EditItem from "./EditItem";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Modal } from "antd";
import { getImageUrl } from "@/helpers/config/envConfig";
import { toast } from "sonner";
import { useDeleteProductMutation } from "@/redux/api/features/productApi";

const Item = ({ item }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (id) => {
    const toastId = toast.loading("Deleting Product...");
    try {
      const res = await deleteProduct(id).unwrap();
      if (res?.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete product", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const url = getImageUrl();
  const imageUrl = url + item?.image;

  return (
    <div
      className="w-full bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: " 0px 1px 8px rgba(0, 0, 0, 0.24)" }}
    >
      <div className="py-5 px-6">
        <div className=" flex justify-end items-end">
          <RiDeleteBin5Fill
            onClick={showModal}
            className="text-4xl text-red-500 hover:bg-red-100 rounded-full py-2 delay-100 cursor-pointer"
          />
        </div>
        <Modal
          title={`Do you want to delete ${item?.title} ?`}
          open={isModalOpen}
          onOk={() => handleOk(item.id)}
          onCancel={handleCancel}
        >
          <div className="flex justify-center flex-col items-center">
            <Image
              loading="lazy"
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              alt="Dog Food"
              className="w-40 aspect-square object-cover rounded-full"
            />
            <h2 className="text-[40px] font-bold text-[#302F51] mb-2">
              {item?.name}
            </h2>
          </div>
        </Modal>
        <div className="flex justify-center">
          <Image
            loading="lazy"
            src={imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            alt="Dog Food"
            className="w-[80%] sm:w-[60%] md:w-[60%] xl:w-[50%] mx-auto aspect-square object-cover rounded-full"
          />
        </div>
        <div className="text-start">
          <h2 className="text-[30px] font-bold text-[#302F51] my-3">
            {item?.title}
          </h2>
          <p className="text-[20px] font-semibold text-[#302F51] mb-2">
            ${item?.price}
          </p>
          <p className="text-[20px] font-semibold text-[#302F51]/50 mb-4">
            {item?.description}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="btn bg-[#F88D58] text-white hover:bg-black"
          >
            Edit
          </button>

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
              <EditItem
                item={item}
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

export default Item;
