"use client";
import { useEffect, useRef, useState } from "react";

import { Layout, Card, Input } from "antd";
import { FaCirclePlus, FaTelegramPlane } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Image from "next/image";
import profileImage from "../../asserts/ced.png";
import { io } from "socket.io-client";

const { Content } = Layout;

const WoofMailPageTwo = () => {
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: "Alice",
      lastMessageTime: "10:30 AM",
      senderRole: "user",
      messages: [],
    },
    {
      id: 2,
      user: "Bob",
      lastMessageTime: "11:15 AM",
      senderRole: "user",
      messages: [],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState("");

  // Connect to socket server
  useEffect(() => {
    const socketIo = io("http://10.0.70.42:8001");

    socketIo.on("connect", () => {});

    // Listen for incoming messages
    socketIo.on("new-message-received", (message) => {
      const { chatId, text, sender } = message;
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === chatId
            ? {
                ...conv,
                messages: [...conv.messages, { text, sender }],
              }
            : conv
        )
      );
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  // Handle sending messages
  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversation || !socket) return;

    const message = {
      chatId: selectedConversation.id,
      text: messageText,
      sender: "You",
    };

    // Emit message to the server
    socket.emit("send-new-message", message);

    // Update UI immediately
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
            }
          : conv
      )
    );

    setMessageText(""); // Clear input
  };

  return (
    <div className="h-[91vh] grid lg:grid-cols-4 xl:grid-cols-5 relative">
      {/* Sidebar */}
      <div
        className={`col-span-1 overflow-y-auto px-3 ${
          selectedConversation ? "hidden lg:block" : "block lg:block"
        }`}
      >
        <div className="sticky top-0 py-5 mb-3 bg-[#FFFAF5] z-20">
          <div className="flex justify-between items-center text-lg font-bold text-secondary-color">
            Messages
            <FaCirclePlus className="text-[#F88D58] text-4xl cursor-pointer" />
          </div>
          <Input
            placeholder="Search Conversations"
            className="mt-3 py-3 px-2"
          />
        </div>
        <div>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b cursor-pointer ${
                selectedConversation?.id === conversation.id
                  ? "bg-[#F88D58] text-white"
                  : "bg-[#FFFAF5]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">{conversation.user}</p>
                  <p className="text-sm">{conversation.lastMessageTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`lg:col-span-3 xl:col-span-4 ${
          selectedConversation ? "block" : "hidden"
        }`}
      >
        <Layout className="h-full bg-[#FFFAF5]">
          {/* Chat Header */}
          <div className="flex items-center p-4 bg-white border-b">
            <MdOutlineArrowBackIosNew
              className="text-2xl text-[#F88D58] cursor-pointer"
              onClick={() => setSelectedConversation(null)}
            />
            <div className="flex items-center gap-3">
              <Image
                src={profileImage}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-bold">{selectedConversation?.user}</p>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <Content className="p-4 flex flex-col gap-2 bg-white">
            <div className="flex-1 overflow-y-auto">
              {selectedConversation?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-md w-fit ${
                    msg.sender === "You"
                      ? "ml-auto bg-[#F88D58] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </Content>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <FaTelegramPlane
              className="text-[#F88D58] text-3xl cursor-pointer"
              onClick={sendMessage}
            />
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default WoofMailPageTwo;
