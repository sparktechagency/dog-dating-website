import { SocketContext } from "@/context/SocketContextApi";
import { useGetAllMessageByChatIdQuery } from "@/redux/api/features/chatApi";
import { setOnlineUsers } from "@/redux/slices/chatSlice";
import { Card, Dropdown, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsPersonAdd, BsThreeDotsVertical } from "react-icons/bs";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch } from "react-redux";
import LeaveConversation from "./LeaveConversation";
import WoofMailMessageCard from "./WoofMailMessageCard";
import Loader from "../ui/Loader";
import WoofMailSendMessage from "./WoofMailSendMessage";
import WoofMailSendMessageTwo from "./WoofMailSendMessageTwo";

const WoofMailMessage = ({
  selectedConversation,
  setSelectedConversation,
  imageUrl,
  userData,
  onlineUsers,
}) => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [leaveConversationModal, setLeaveConversationModal] = useState(false);

  const isAdmin = selectedConversation?.groupAdmins?.some(
    (admin) => admin?._id === userData?.userId
  );

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  });

  const menu = (
    <Menu>
      {/* {isAdmin && (
        <Menu.Item key="1">
          <div className="flex items-center gap-2 text-base">
            <BsPersonAdd className="text-[#F88D58]" />
            <span className="text-[#F88D58]">Add Member</span>
          </div>
        </Menu.Item>
      )} */}

      <Menu.Item key="2">
        <div
          onClick={() => setLeaveConversationModal(true)}
          className="flex items-center gap-2 text-base"
        >
          <HiMiniArrowLeftStartOnRectangle className="text-[#F88D58]" />
          <span className="text-[#F88D58]">Leave Conversation</span>
        </div>
      </Menu.Item>
    </Menu>
  );

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

  const handleMessage = useCallback(
    (message) => {
      setMessages((prev) => [...prev, message]);
    },
    [setMessages]
  );

  useEffect(() => {
    const roomId = selectedConversation?._id;
    socket?.emit("join", roomId?.toString());
    socket?.on("online-users-updated", (online) => {
      dispatch(setOnlineUsers(online));
    });
    if (selectedConversation?._id && socket) {
      socket?.on(
        `new-message-received::${selectedConversation?._id}`,
        handleMessage
      );
    }

    return () => {
      socket?.off(`new-message-received::${selectedConversation?._id}`);
      socket?.emit("leave", roomId);
    };
  }, [socket, selectedConversation?._id, dispatch, handleMessage]);

  return (
    <div
      className={`lg:col-span-3 xl:col-span-4 overflow-y-auto  ${
        selectedConversation ? "block lg:block" : "hidden lg:block"
      }`}
    >
      {selectedConversation ? (
        <Layout
          className={`py-6 px-2 !bg-[#FFFAF5] lg:col-span-3 xl:col-span-4 h-full`}
        >
          {/* Header Part */}
          <div className="!bg-[#FFFFFF] p-2 lg:p-4 border-b-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center mr-2">
                <MdOutlineArrowBackIosNew
                  onClick={() => setSelectedConversation(null)}
                  className="text-2xl cursor-pointer text-[#F88D58] "
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <Image
                  className="h-12 w-12 lg:h-12 lg:w-12 object-cover rounded-md relative"
                  src={
                    selectedConversation?.isGroupChat
                      ? `${imageUrl}${selectedConversation?.groupProfilePicture}`
                      : selectedConversation?.users[0]?._id === userData?.userId
                      ? `${imageUrl}${selectedConversation?.users[1]?.petImage}`
                      : `${imageUrl}${selectedConversation?.users[0]?.petImage}`
                  }
                  width={100}
                  height={100}
                  alt="Profile"
                />
                <div>
                  <span className="font-bold text-base sm:text-lg lg:text-xl flex items-center gap-1">
                    {selectedConversation?.isGroupChat
                      ? `${selectedConversation?.groupName}`
                      : selectedConversation?.users[0]?._id === userData?.userId
                      ? `${selectedConversation?.users[1]?.petName}`
                      : `${selectedConversation?.users[0]?.petName}`}

                    {!selectedConversation?.isGroupChat &&
                      (selectedConversation?.users[0]?._id === userData?.userId
                        ? onlineUsers.includes(
                            selectedConversation?.users[1]?._id
                          ) && (
                            <span className="size-2 rounded-full bg-green-500"></span>
                          )
                        : onlineUsers.includes(
                            selectedConversation?.users[0]?._id
                          ) && (
                            <span className="size-2 rounded-full bg-green-500"></span>
                          ))}
                  </span>
                  <span className="text-xs lg:text-sm h-fit">
                    {selectedConversation?.user}
                  </span>
                </div>
              </div>
            </div>
            {selectedConversation?.isGroupChat && (
              <div>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <BsThreeDotsVertical className="text-2xl cursor-pointer text-[#F88D58]" />
                </Dropdown>
              </div>
            )}
          </div>

          {/* message Part  */}
          <Content className="bg-white flex flex-col gap-5 rounded-none relative ">
            <div className="h-full flex flex-col justify-end">
              <Card
                className="!border-0 !pb-14 overflow-y-auto border-none h-full"
                ref={messagesContainerRef}
              >
                {isAllMessageFetching ? (
                  <div className="mx-auto w-[80vw] flex justify-center items-center h-full">
                    <Loader className="h-full" />
                  </div>
                ) : (
                  messages?.map((msg, i) => (
                    <WoofMailMessageCard
                      key={i}
                      msg={msg}
                      userData={userData}
                      imageUrl={imageUrl}
                    />
                  ))
                )}

                {/* Add this div for the scroll target */}
                <div ref={messagesEndRef}></div>
              </Card>
            </div>

            {selectedConversation && (
              <WoofMailSendMessage
                socket={socket}
                selectedConversation={selectedConversation}
                userData={userData}
                setMessages={setMessages}
              />
            )}
          </Content>
        </Layout>
      ) : (
        <div className="hidden  lg:col-span-3 xl:col-span-4 lg:flex justify-center items-center text-center w-full h-full  text-secondary-color">
          Select a conversation to view messages
        </div>
      )}

      {leaveConversationModal && (
        <LeaveConversation
          socket={socket}
          leaveConversationModal={leaveConversationModal}
          setSelectedConversation={setSelectedConversation}
          setLeaveConversationModal={setLeaveConversationModal}
          userData={userData}
          chatId={selectedConversation?._id}
        />
      )}
    </div>
  );
};

export default WoofMailMessage;
