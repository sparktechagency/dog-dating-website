import { SocketContext } from "@/context/SocketContextApi";
import { useGetAllMessageByChatIdQuery } from "@/redux/api/features/chatApi";
import {
  selectTypingUsers,
  setOnlineUsers,
  setTypingUser,
} from "@/redux/slices/chatSlice";
import { Card, Dropdown, Layout, Menu, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import {
  MdBlockFlipped,
  MdDelete,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";
import LeaveConversation from "./LeaveConversation";
import WoofMailMessageCard from "./WoofMailMessageCard";
import Loader from "../ui/Loader";
import WoofMailSendMessageTwo from "./WoofMailSendMessageTwo";

import WoofHero from "@/asserts/woofHero.png";
import WoofSupporter from "@/asserts/woofSupporter.png";
import BlockConversation from "./BlockModal";
import UnBlockConversation from "./UnBlockModal";
import DeleteConversationModal from "./DeleteConversationModal";

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
  const [blockConversationModal, setBlockConversationModal] = useState(false);
  const [unBlockConversationModal, setUnBlockConversationModal] =
    useState(false);
  const [deleteConversationModal, setDeleteConversationModal] = useState(false);

  const isAdmin = selectedConversation?.groupAdmins?.some(
    (admin) => admin?._id === userData?.userId
  );

  const isBlocked = selectedConversation?.blockedUsers?.some(
    (user) => user === userData?.userId
  );

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  });

  const leaveMenu = (
    <Menu>
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

  const blockMenu = (
    <Menu>
      {selectedConversation?.blockedUsers.length === 0 ? (
        <Menu.Item key="1">
          <div
            onClick={() => setBlockConversationModal(true)}
            className="flex items-center gap-2 text-base"
          >
            <MdBlockFlipped className="text-[#F88D58]" />
            <span className="text-[#F88D58]">Block The User</span>
          </div>
        </Menu.Item>
      ) : isBlocked ? null : (
        <Menu.Item key="1">
          <div
            onClick={() => setUnBlockConversationModal(true)}
            className="flex items-center gap-2 text-base"
          >
            <CgUnblock className="text-[#F88D58]" />
            <span className="text-[#F88D58]">Unblock The User</span>
          </div>
        </Menu.Item>
      )}

      <Menu.Item key="2">
        <div
          onClick={() => setDeleteConversationModal(true)}
          className="flex items-center gap-2 text-base"
        >
          <MdDelete className="text-[#F88D58]" />
          <span className="text-[#F88D58]">Delete Conversation</span>
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
      socket?.on(`typing::${selectedConversation?._id}`, (typing) => {
        dispatch(setTypingUser(typing));
      });
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

  const typingUsers = useSelector(selectTypingUsers);

  return (
    <div
      className={`w-full overflow-y-auto  ${
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
                  loading="lazy"
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
                  <div className="flex justify-center gap-2">
                    <div>
                      <span className="font-bold text-base sm:text-lg lg:text-xl flex items-center gap-1">
                        {selectedConversation?.isGroupChat
                          ? `${selectedConversation?.groupName}`
                          : selectedConversation?.users[0]?._id ===
                            userData?.userId
                          ? `${selectedConversation?.users[1]?.petName}`
                          : `${selectedConversation?.users[0]?.petName}`}

                        <Tooltip title="Online">
                          {!selectedConversation?.isGroupChat &&
                            (selectedConversation?.users[0]?._id ===
                            userData?.userId
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
                        </Tooltip>
                      </span>
                      {/* {typingUser?.message} */}
                      <span className="text-xs lg:text-sm h-fit">
                        {selectedConversation?.user}
                      </span>
                    </div>

                    {selectedConversation?.isGroupChat ? null : selectedConversation
                        ?.users[0]?._id === userData?.userId ? (
                      <div className="flex items-center gap-1">
                        {" "}
                        {selectedConversation?.users[1]?.isSupported && (
                          <Tooltip title="Woof Spot Supporter">
                            <Image
                              loading="lazy"
                              src={WoofSupporter}
                              className="size-5"
                              width={1000}
                              height={1000}
                              alt="WoofSupporter"
                            />
                          </Tooltip>
                        )}
                        {selectedConversation?.users[1]?.isHero && (
                          <Tooltip title="Woof Spot Hero">
                            <Image
                              loading="lazy"
                              src={WoofHero}
                              className="size-5"
                              width={1000}
                              height={1000}
                              alt="WoofHero"
                            />
                          </Tooltip>
                        )}{" "}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {" "}
                        {selectedConversation?.users[0]?.isSupported && (
                          <Tooltip title="Woof Spot Supporter">
                            <Image
                              loading="lazy"
                              src={WoofSupporter}
                              className="size-5"
                              width={1000}
                              height={1000}
                              alt="WoofSupporter"
                            />
                          </Tooltip>
                        )}
                        {selectedConversation?.users[0]?.isHero && (
                          <Tooltip title="Woof Spot Hero">
                            <Image
                              loading="lazy"
                              src={WoofHero}
                              className="size-5"
                              width={1000}
                              height={1000}
                              alt="WoofHero"
                            />
                          </Tooltip>
                        )}{" "}
                      </div>
                    )}
                  </div>
                  <p>
                    {typingUsers?.writeId !== userData?.userId &&
                      typingUsers?.message}
                  </p>
                </div>
              </div>
            </div>

            {selectedConversation?.isGroupChat ? (
              <div>
                <Dropdown overlay={leaveMenu} trigger={["hover"]}>
                  <BsThreeDotsVertical className="text-2xl cursor-pointer text-[#F88D58]" />
                </Dropdown>
              </div>
            ) : (
              <div>
                <Dropdown overlay={blockMenu} trigger={["hover"]}>
                  <BsThreeDotsVertical className="text-2xl cursor-pointer text-[#F88D58]" />
                </Dropdown>
              </div>
            )}
          </div>

          {/* message Part  */}
          <Content className="bg-white flex flex-col gap-5 rounded-none relative ">
            <div className="h-full flex flex-col justify-end">
              <Card
                className="!border-0 !pb-14 overflow-y-auto border-none h-full overflow-x-hidden"
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
              <WoofMailSendMessageTwo
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
      {blockConversationModal && (
        <BlockConversation
          socket={socket}
          blockConversationModal={blockConversationModal}
          setSelectedConversation={setSelectedConversation}
          setBlockConversationModal={setBlockConversationModal}
          userData={userData}
          chat={selectedConversation}
        />
      )}
      {unBlockConversationModal && (
        <UnBlockConversation
          unBlockConversationModal={unBlockConversationModal}
          setSelectedConversation={setSelectedConversation}
          setUnBlockConversationModal={setUnBlockConversationModal}
          userData={userData}
          chat={selectedConversation}
        />
      )}
      {deleteConversationModal && (
        <DeleteConversationModal
          deleteConversationModal={deleteConversationModal}
          setSelectedConversation={setSelectedConversation}
          setDeleteConversationModal={setDeleteConversationModal}
          userData={userData}
          chat={selectedConversation}
        />
      )}
    </div>
  );
};

export default WoofMailMessage;
