import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload } from "antd";
import { BsImage } from "react-icons/bs";
import { FaTelegramPlane, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";

const WoofMailSendMessageTwo = ({ socket, selectedConversation, userData }) => {
  const isBlocked = selectedConversation?.blockedUsers?.some(
    (user) => user === userData?.userId
  );
  const [form] = Form.useForm();
  const [textValue, setTextValue] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // ✅ Store uploaded image URLs

  // Reset previews and file list when the selected conversation changes
  useEffect(() => {
    setFileList([]);
    setPreviewUrls([]);
    setUploadedImageUrls([]); // Reset uploaded image URLs
  }, [selectedConversation?._id]);

  useEffect(() => {
    form.setFieldValue("message", "");
  }, [selectedConversation._id]);

  // Handle file selection and preview
  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    generatePreviewUrls(newFileList);
    uploadImages(newFileList); // ✅ Upload images when selected
  };

  // Generate local preview URLs
  const generatePreviewUrls = (files) => {
    const urls = files.map((file) => {
      if (!file.url && file.originFileObj) {
        return URL.createObjectURL(file.originFileObj);
      }
      return file.url;
    });
    setPreviewUrls(urls);
  };

  // ✅ Upload images to backend and get URLs
  const uploadImages = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
      if (!file.originFileObj) continue;
      const formData = new FormData();
      formData.append("file", file.originFileObj);

      try {
        const response = await axios.post(
          "https://api.woofspot.net/api/v1/message/uploadImage",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.success) {
          uploadedUrls.push(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
    setUploadedImageUrls(uploadedUrls); // ✅ Store uploaded image URLs
  };

  // ✅ Handle image delete
  const handleDeleteImage = (indexToDelete) => {
    const newFileList = fileList.filter((_, index) => index !== indexToDelete);
    const newPreviewUrls = previewUrls.filter(
      (_, index) => index !== indexToDelete
    );
    const newUploadedUrls = uploadedImageUrls.filter(
      (_, index) => index !== indexToDelete
    );

    setFileList(newFileList);
    setPreviewUrls(newPreviewUrls);
    setUploadedImageUrls(newUploadedUrls);
  };

  // ✅ Send message with image URL
  const handleMessageSend = async (values) => {
    const toastId = toast.loading("Sending Message...");
    const data = {
      chat: selectedConversation?._id,
      sender: userData?.userId,
      text: values?.message,
      images: uploadedImageUrls, // ✅ Send uploaded image URLs
      senderDetails: userData,
    };

    try {
      socket.emit("send-new-message", data, (res) => {
        res?.success
          ? toast.success("Message sent successfully!", {
              id: toastId,
              duration: 2000,
            })
          : toast.error(res?.message, {
              id: toastId,
              duration: 2000,
            });
      });
      setFileList([]);
      setPreviewUrls([]);
      setUploadedImageUrls([]);
      form.resetFields();
      setTextValue(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send message", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const hanleTyping = async (value) => {
    const message = {
      chatId: selectedConversation?._id,
      users: selectedConversation?.users,
      status: value,
    };
    try {
      socket?.emit("typing", message, (res) => {});
    } catch (error) {}
  };

  return (
    <div>
      {selectedConversation?.blockedUsers.length !== 0 ? (
        <div className="absolute bottom-0 w-full py-5 !bg-white">
          <h1 className="text-center text-base sm:text-lg lg:text-xl font-semibold text-red-500">
            {isBlocked ? "You have been blocked" : "You blocked this user"}
          </h1>
        </div>
      ) : (
        <div className="w-full">
          <div className="absolute bottom-10 !bg-white flex items-center gap-2">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                style={{ position: "relative", display: "inline-block" }}
              >
                <Image
                  src={url}
                  alt={`preview-${index}`}
                  style={{ width: 70, height: 70, marginRight: 8 }}
                  width={500}
                  height={500}
                />
                <FaTimes
                  className="cursor-pointer text-red-600 bg-white"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 5,
                    fontSize: "20px",
                  }}
                  onClick={() => handleDeleteImage(index)}
                />
              </div>
            ))}
          </div>
          <Form form={form} onFinish={handleMessageSend}>
            <div className="!bg-white absolute -bottom-5 flex justify-center items-center w-full p-1">
              <div className="w-full rounded-full bg-white border border-[#F88D58]  px-4 py-2 flex items-center space-x-4">
                <Form.Item className="w-full !p-0 !m-0" name="message">
                  <Input
                    onFocus={() => hanleTyping(true)}
                    onBlur={() => hanleTyping(false)}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="Send your message..."
                    className="!border-none !ring-0 !outline-none  !bg-transparent text-black"
                  />
                </Form.Item>
                <Form.Item className="!p-0 !m-0" name="image">
                  <Upload
                    fileList={fileList}
                    onChange={handleImageChange}
                    customRequest={(options) => {
                      setTimeout(() => {
                        options.onSuccess("ok");
                      }, 1000);
                    }}
                    maxCount={4}
                    multiple
                    accept="image/*"
                    showUploadList={false}
                  >
                    <BsImage className="cursor-pointer text-xl text-[#F88D58] mt-1" />
                  </Upload>
                </Form.Item>
              </div>
              <button
                disabled={!textValue && fileList.length < 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                type="submit"
              >
                <FaTelegramPlane className=" text-white bg-[#F88D58] rounded-full p-2 text-4xl ms-3 " />
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default WoofMailSendMessageTwo;
