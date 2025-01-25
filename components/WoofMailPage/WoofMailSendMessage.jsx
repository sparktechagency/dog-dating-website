import { Form, Input } from "antd";
import { BsImage } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { toast } from "sonner";

const WoofMailSendMessage = ({
  socket,
  selectedConversation,
  userData,
  setMessages,
}) => {
  const [form] = Form.useForm();

  //* For Sending Message
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
      <Form form={form} onFinish={handleMessageSend}>
        <div className="!bg-white  absolute -bottom-5 flex justify-center items-center w-full p-4">
          <div className="w-full rounded-full bg-white border  px-4 py-2 flex items-center space-x-4">
            {/* Emoji Icon */}
            {/* <BsEmojiSmile className="cursor-pointer text-xl text-yellow-600 mr-2" /> */}

            {/* Input Field */}
            <Form.Item className="w-full !p-0 !m-0" name="message">
              <Input
                placeholder="Send your message..."
                className="border-none focus:ring-0 outline-none !bg-transparent text-black"
              />
            </Form.Item>

            {/* Image Icon */}
            <BsImage className="cursor-pointer text-xl text-gray-500" />

            {/* Paperclip Icon */}
            {/* <BsPaperclip className="cursor-pointer text-xl text-gray-500" /> */}
          </div>
          <button type="submit">
            <FaTelegramPlane className="cursor-pointer text-white bg-[#F88D58] rounded-full p-2 text-4xl ms-3" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default WoofMailSendMessage;
