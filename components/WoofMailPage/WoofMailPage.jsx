"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/authSlice";
import { getImageUrl } from "@/helpers/config/envConfig";
import WoofMailChatList from "./WoofMailChatList";
import WoofMailMessage from "./WoofMailMessage";

const WoofMailPage = () => {
  const imageUrl = getImageUrl();

  const userData = useSelector(selectUser);
  const onlineUsers = useSelector((state) => state.chat.onlineUser);

  const [selectedConversation, setSelectedConversation] = useState(null);
  console.log("selectedConversation", selectedConversation);

  return (
    <div className="">
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 h-[91vh] relative overflow-hidden">
        <WoofMailChatList
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          userData={userData}
          imageUrl={imageUrl}
          onlineUsers={onlineUsers}
        />

        <WoofMailMessage
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          imageUrl={imageUrl}
          userData={userData}
          onlineUsers={onlineUsers}
        />
      </div>
    </div>
  );
};

export default WoofMailPage;
