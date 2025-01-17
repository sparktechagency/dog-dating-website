"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Layout, Card, Input, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import userImage from "./asserts/user.svg";
import groupImage from "./asserts/group.svg";
import { BsEmojiSmile, BsImage, BsPaperclip } from "react-icons/bs";
import Image from "next/image";
import { FaTelegramPlane } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import AddNewChat from "./AddNewChat";
import CreateGroup from "./CreateGroup";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import {
  useGetAllChatByUserQuery,
  useGetAllMessageByChatIdQuery,
} from "@/redux/api/features/chatApi";
import { useSelector } from "react-redux";
import { getImageUrl } from "@/helpers/config/envConfig";
import { toast } from "sonner";
import { formatDateTime } from "@/helpers/date-formats";
import { SocketContext } from "@/context/SocketContextApi";
import { selectUser } from "@/redux/slices/authSlice";

const WoofMailPage = () => {
  const { socket } = useContext(SocketContext);
  const [form] = Form.useForm();
  const { Content } = Layout;

  const userData = useSelector(selectUser);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const toggleUserModal = () => setShowAddUserModal((prev) => !prev);
  const toggleGroupModal = () => setShowAddGroupModal((prev) => !prev);

  const menuRef = useRef(null);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [messages, setMessages] = useState([]);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetAllChatByUserQuery(
      { id: userData?.userId },
      {
        skip: !userData?.userId,
      }
    );

  const filteredConversations = allChatList?.data?.filter((conversation) =>
    conversation?.isGroupChat
      ? conversation?.groupName
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase())
      : conversation?.users[0]?._id === userData?.userId
      ? conversation?.users[1]?.fullName
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase())
      : conversation?.users[0]?.fullName
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase())
  );

  console.log("All Chat List:", allChatList?.data);

  const {
    data: allMessages,
    isFetching: isAllMessageFetching,
    refetch,
  } = useGetAllMessageByChatIdQuery(
    { id: selectedConversation?._id },
    {
      skip: !selectedConversation?._id,
    }
  );

  useEffect(() => {
    if (selectedConversation?._id) {
      refetch();
    }
    if (allMessages?.data) {
      setMessages(allMessages?.data);
    }
  }, [allMessages, refetch, selectedConversation?._id]);

  const imageUrl = getImageUrl();

  const SelectedmageUrlSrc = selectedConversation?.isGroupChat
    ? `${imageUrl}${selectedConversation?.groupProfilePicture}`
    : selectedConversation?.users[0]?._id === userData?.userId
    ? `${imageUrl}${selectedConversation?.users[1]?.image}`
    : `${imageUrl}${selectedConversation?.users[0]?.image}`;

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  const handleMessage = (message) => {
    console.log("check maren vai doya koirra:", message);

    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    const roomId = selectedConversation?._id;
    console.log(`Joining room: ${roomId}`);
    socket.emit("join", roomId?.toString());
    if (selectedConversation?._id && socket) {
      socket.on(
        `new-message-received::${selectedConversation?._id}`,
        handleMessage
      );
    }

    return () => {
      socket.off(`new-message-received::${selectedConversation?._id}`);
      socket.emit("leave", roomId);
    };
  }, [socket, selectedConversation?._id]);

  //* For Sending Message
  const handleMessageSend = async (values) => {
    const toastId = toast.loading("Sending Message...");

    const data = {
      chat: selectedConversation?._id,
      sender: userData?.userId,
      text: values?.message,
      senderDetails: userData,
    };

    console.log("chat data", data);

    try {
      socket.emit("send-new-message", data);
      form.resetFields();
      toast.success("Message sent successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to send message", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isAllChatFeacthing) return <div>Loading</div>;
  return (
    <div className="">
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 h-[91vh] relative">
        <div
          className={`col-span-1 overflow-y-auto px-3 ${
            selectedConversation ? "hidden lg:block" : "block lg:block"
          }`}
        >
          <div className="sticky top-0 z-20 !bg-[#FFFAF5]    py-5 mb-3 ">
            <div className=" flex justify-between items-center pe-4  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold mt-3">
              Messages
              <div ref={menuRef} className="relative">
                <div onClick={toggleMenu}>
                  <FaCirclePlus className="select-none cursor-pointer text-[#F88D58] text-4xl" />
                </div>

                {open && (
                  <div className="bg-[#F3F5FB] py-3 shadow-md absolute -left-32 top-9 rounded z-[99999] w-44 p-1">
                    <div className="flex gap-2">
                      <Image alt="profileImage" src={userImage} className="" />
                      <p
                        onClick={toggleUserModal}
                        className="text-[#302F51] text-[20px] cursor-pointer font-bold"
                      >
                        Add New
                      </p>
                    </div>
                    <div className="flex gap-2 whitespace-nowrap">
                      <Image alt="profileImage" src={groupImage} className="" />
                      <p
                        onClick={toggleGroupModal}
                        className="text-[#302F51] cursor-pointer text-[20px] font-bold"
                      >
                        Create Group
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Input
              placeholder="Search Conversations"
              prefix={<SearchOutlined />}
              className=" text-base-color mt-2 py-3 px-2 w-full"
              onChange={handleSearch}
            />
          </div>
          <div className="md:h-full h-fit mb-3">
            <div className=" text-gray-300 bg-white   ">
              {filteredConversations?.map((conversation) => {
                // Compute the image source URL
                const imageUrlSrc = conversation?.isGroupChat
                  ? `${imageUrl}${conversation?.groupProfilePicture}`
                  : conversation?.users[0]?._id === userData?.userId
                  ? `${imageUrl}${conversation?.users[1]?.image}`
                  : `${imageUrl}${conversation?.users[0]?.image}`;

                // Return the JSX
                return (
                  <div
                    key={conversation?._id}
                    onClick={() => handleConversationSelect(conversation)}
                    className={`m-1 rounded  border-b border-gray-200 bg-[#FFFAF5] text-black ${
                      conversation?._id === selectedConversation?._id
                        ? "!bg-[#F88D58] text-white"
                        : ""
                    }`}
                  >
                    <div className="py-4 px-2 cursor-pointer flex justify-between ">
                      <div className="flex items-center gap-2">
                        <Image
                          className="rounded aspect-square h-12 w-fit object-cover relative"
                          src={imageUrlSrc}
                          width={100}
                          height={100}
                          sixes="100vw"
                          alt="Profile"
                        />
                        <div>
                          <div className="flex items-center gap-1 text-xl">
                            {conversation?.isGroupChat
                              ? `${conversation?.groupName}`
                              : conversation?.users[0]?._id === userData?.userId
                              ? `${conversation?.users[1]?.fullName}`
                              : `${conversation?.users[0]?.fullName}`}
                            <div className="size-2 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-sm">
                            {conversation?.lastMessage?.text
                              ? conversation?.lastMessage?.text
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        {conversation?.lastMessage?.createdAt
                          ? formatDateTime(conversation?.lastMessage?.createdAt)
                          : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isAllMessageFetching ? (
          <div className="lg:col-span-3 xl:col-span-4  ">Loading</div>
        ) : (
          <div
            className={`lg:col-span-3 xl:col-span-4 overflow-y-auto  ${
              selectedConversation ? "block lg:block" : "hidden lg:block"
            }`}
          >
            {selectedConversation ? (
              <Layout
                className={`py-6 px-2 !bg-[#FFFAF5] lg:col-span-3 xl:col-span-4 h-full`}
              >
                {/* Header Part  */}
                <div className="!bg-[#FFFFFF] p-2 lg:p-4 border-b-2 flex ">
                  <div className="flex items-center mr-2">
                    <MdOutlineArrowBackIosNew
                      onClick={() => setSelectedConversation(null)}
                      className="text-2xl cursor-pointer text-[#F88D58] "
                    />
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      className="h-12 w-12 lg:h-12 lg:w-12 object-cover rounded-md relative"
                      src={SelectedmageUrlSrc}
                      width={100}
                      height={100}
                      alt="Profile"
                    />
                    <div>
                      <span className="font-bold text-base sm:text-lg lg:text-xl flex items-center gap-1">
                        {selectedConversation?.isGroupChat
                          ? `${selectedConversation?.groupName}`
                          : selectedConversation?.users[0]?._id ===
                            userData?.userId
                          ? `${selectedConversation?.users[1]?.fullName}`
                          : `${selectedConversation?.users[0]?.fullName}`}
                        <span className="size-2 rounded-full bg-green-500"></span>
                      </span>
                      <span className="text-xs lg:text-sm h-fit">
                        {selectedConversation?.user} is typing
                      </span>
                    </div>
                  </div>
                </div>

                {/* message Part  */}
                <Content className="bg-white flex flex-col gap-5 rounded-none relative ">
                  <div className="h-full flex flex-col justify-end">
                    <Card className="!border-0  !pb-14 overflow-y-auto border-none ">
                      {messages?.map((msg, i) => (
                        <div key={i}>
                          <div className="flex items-start gap-1">
                            <Image
                              src={SelectedmageUrlSrc}
                              width={1000}
                              height={1000}
                              alt="Profile"
                              className={`h-6 w-6 object-cover rounded-md relative mt-2 ${
                                msg?.sender?._id === userData?.userId ||
                                msg?.sender?.toString() === userData?.userId
                                  ? "order-last"
                                  : " order-first "
                              }`}
                              sizes="100vw"
                            />
                            <div
                              className={`flex items-center gap-2 w-full ${
                                msg?.sender?._id === userData?.userId ||
                                msg?.sender?.toString() === userData?.userId
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div>
                                <p
                                  className={`py-1 px-3 my-2 rounded-md ${
                                    msg?.sender?._id === userData?.userId ||
                                    msg?.sender?.toString() === userData?.userId
                                      ? "w-fit ml-auto text-right text-base-color text-white bg-[#F88D58]"
                                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                                  }`}
                                >
                                  {msg?.text}
                                </p>

                                <p
                                  className={`text-[11px] text-secondary-color ${
                                    msg?.sender?._id === userData?.userId ||
                                    msg?.sender?.toString() === userData?.userId
                                      ? "text-right"
                                      : "text-left"
                                  }`}
                                >
                                  {formatDateTime(msg?.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      ))}
                    </Card>
                  </div>

                  {selectedConversation && (
                    <div className="w-full ">
                      <Form form={form} onFinish={handleMessageSend}>
                        <div className="!bg-white  absolute -bottom-5 flex justify-center items-center w-full p-4">
                          <div className="w-full rounded-full bg-white border  px-4 py-2 flex items-center space-x-4">
                            {/* Emoji Icon */}
                            <BsEmojiSmile className="cursor-pointer text-xl text-yellow-600 mr-2" />

                            {/* Input Field */}
                            <Form.Item
                              className="w-full !p-0 !m-0"
                              name="message"
                            >
                              <Input
                                placeholder="Send your message..."
                                className="border-none focus:ring-0 outline-none !bg-transparent text-black"
                              />
                            </Form.Item>

                            {/* Image Icon */}
                            <BsImage className="cursor-pointer text-xl text-gray-500" />

                            {/* Paperclip Icon */}
                            <BsPaperclip className="cursor-pointer text-xl text-gray-500" />
                          </div>
                          <button type="submit">
                            <FaTelegramPlane className="cursor-pointer text-white bg-[#F88D58] rounded-full p-2 text-4xl ms-3" />
                          </button>
                        </div>
                      </Form>
                    </div>
                  )}
                </Content>
              </Layout>
            ) : (
              <div className="hidden  lg:col-span-3 xl:col-span-4 lg:flex justify-center items-center text-center w-full h-full  text-secondary-color">
                Select a conversation to view messages
              </div>
            )}
          </div>
        )}
      </div>

      {showAddUserModal && (
        <div className="inset-0 fixed flex justify-center items-center bg-black/20 z-50">
          <AddNewChat
            toggleUserModal={toggleUserModal}
            showAddUserModal={showAddUserModal}
            setShowAddUserModal={setShowAddUserModal}
          />
        </div>
      )}
      {showAddGroupModal && (
        <div className="inset-0 overflow-y-auto fixed  flex justify-center md:items-center items-start md:mt-0 mt-16 bg-black/20 z-50">
          <CreateGroup
            toggleGroupModal={toggleGroupModal}
            showAddGroupModal={showAddGroupModal}
            setShowAddGroupModal={setShowAddGroupModal}
          />
        </div>
      )}
    </div>
  );
};

export default WoofMailPage;
