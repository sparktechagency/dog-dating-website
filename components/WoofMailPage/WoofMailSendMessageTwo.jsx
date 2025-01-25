import React, { useState, useEffect } from "react";
import { Form, Input, Upload } from "antd";
import { BsImage } from "react-icons/bs";
import { FaTelegramPlane, FaTimes } from "react-icons/fa";
import { toast } from "sonner";

const WoofMailSendMessageTwo = ({ socket, selectedConversation, userData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Reset previews and file list when the selected conversation changes
  useEffect(() => {
    setFileList([]);
    setPreviewUrls([]);
    form.resetFields();
  }, [selectedConversation]); // Dependency array includes selectedConversation

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update the file list
    generatePreviewUrls(newFileList);
  };

  const generatePreviewUrls = (files) => {
    const urls = files.map((file) => {
      if (!file.url && file.originFileObj) {
        return URL.createObjectURL(file.originFileObj);
      }
      return file.url;
    });
    setPreviewUrls(urls);
  };

  const handleDeleteImage = (indexToDelete) => {
    const newFileList = fileList.filter((_, index) => index !== indexToDelete);
    const newPreviewUrls = previewUrls.filter(
      (_, index) => index !== indexToDelete
    );
    setFileList(newFileList);
    setPreviewUrls(newPreviewUrls);
  };

  const handleMessageSend = async (values) => {
    const toastId = toast.loading("Sending Message...");
    const data = {
      chat: selectedConversation?._id,
      sender: userData?.userId,
      text: values?.message,
      senderDetails: userData,
    };

    try {
      socket.emit("send-new-message", data);
      form.resetFields();
      setFileList([]); // Clear the fileList after sending message
      setPreviewUrls([]); // Clear the previews
      toast.success("Message sent successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send message", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-full ">
      <div className="absolute bottom-10 !bg-white flex items-center gap-2">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={url}
              alt={`preview-${index}`}
              style={{ width: 70, height: 70, marginRight: 8 }}
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
          <div className="w-full rounded-full bg-white border px-4 py-2 flex items-center space-x-4">
            <Form.Item className="w-full !p-0 !m-0" name="message">
              <Input
                placeholder="Send your message..."
                className="border-none focus:ring-0 outline-none !bg-transparent text-black"
              />
            </Form.Item>
            <Upload
              fileList={fileList}
              customRequest={(options) => {
                setTimeout(() => {
                  options.onSuccess("ok");
                }, 1000);
              }}
              maxCount={4}
              multiple
              accept="image/*"
              showUploadList={false}
              onChange={handleImageChange}
            >
              <BsImage className="cursor-pointer text-xl text-gray-500" />
            </Upload>
          </div>
          <button type="submit">
            <FaTelegramPlane className="cursor-pointer text-white bg-[#F88D58] rounded-full p-2 text-4xl ms-3" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default WoofMailSendMessageTwo;
