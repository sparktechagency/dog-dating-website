"use client";
import Loader from "@/components/ui/Loader";
import {
  useGetAllLinksQuery,
  useUpdateAllLinksMutation,
} from "@/redux/api/features/adminSetting";
import { Button, Form, Input, Modal, Typography } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaRegEdit,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

const SocialLInkPage = () => {
  const { data, isFetching } = useGetAllLinksQuery();
  const [updateLink] = useUpdateAllLinksMutation();
  const socialData = data?.data;
  const socials = [
    {
      name: "Facebook",
      inputName: "facebookUrl",
      icon: <FaFacebookSquare className=" w-full h-auto text-[#0866FF]" />,
      link: socialData?.facebookUrl,
    },
    {
      name: "Instagram",
      inputName: "instagramUrl",
      icon: <FaInstagramSquare className=" w-full h-auto text-[#B9318F]" />,
      link: socialData?.instagramUrl,
    },
    {
      name: "Twitter",
      inputName: "twitterUrl",
      icon: <FaSquareXTwitter className=" w-full h-auto text-[#000000]" />,
      link: socialData?.twitterUrl,
    },

    {
      name: "Linkedin",
      inputName: "linkedinUrl",
      icon: <FaLinkedin className=" w-full h-auto text-[#0A66C2]" />,
      link: socialData?.linkedinUrl,
    },
    {
      name: "Youtube",
      inputName: "youtubeUrl",
      icon: <FaYoutube className=" w-full h-auto text-[#FF0033]" />,
      link: socialData?.youtubeUrl,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSocial, setCurrentSocial] = useState(null);
  const openModal = (name) => {
    setCurrentSocial(name);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setCurrentSocial(null);
    setIsModalOpen(false);
  };

  const handleFinish = async (values) => {
    console.log(values);
    const toastId = toast.loading("Updating...");

    try {
      const res = await updateLink(values).unwrap();

      if (res?.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
        handleClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      {isFetching ? (
        <div className="min-h-[90vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" my-10">
          <h1 className="text-[#302F51] text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-10">
            Social Links
          </h1>
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-center gap-5">
            {socials.map((social, index) => (
              <div
                key={index}
                className=" w-full p-1 border-2 border-[#F88D58] bg-[#FFFAF5] rounded-lg"
              >
                <div>
                  <FaRegEdit
                    onClick={() => openModal(social)}
                    className="text-[#F88D58] ms-auto font-bold text-2xl mt-2 me-2 cursor-pointer"
                  />

                  <Link target="_blank" href="">
                    {social.icon}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Modal centered footer={null} open={isModalOpen} onCancel={handleClose}>
        <div className="my-3">
          <h4 className="text-[#302F51] text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-5">
            {`Edit ${currentSocial?.name} Link`}
          </h4>
          <Form onFinish={handleFinish}>
            <Typography className="text-[#302F51] text-lg lg:text-xl mb-1 font-medium">
              {currentSocial?.name}
            </Typography>
            <Form.Item
              initialValue={currentSocial?.link}
              name={currentSocial?.inputName}
            >
              <Input placeholder="Enter new link" />
            </Form.Item>

            <Button
              htmlType="submit"
              className="w-full !ring-0 !outline-none !bg-[#F88D58] text-white text-lg lg:text-xl"
              type="primary"
            >
              Save
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SocialLInkPage;
