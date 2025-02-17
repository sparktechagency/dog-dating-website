import { useBlockChatMutation } from "@/redux/api/features/chatApi";
import { Button, Modal } from "antd";
import { toast } from "sonner";

const BlockConversation = ({
  socket,
  blockConversationModal,
  setSelectedConversation,
  setBlockConversationModal,
  userData,
  chat,
}) => {
  const [blockChat] = useBlockChatMutation();

  const userId = chat?.users?.filter((user) => user._id !== userData?.userId);

  const handleBlock = async (userData) => {
    const toastId = toast.loading("Blocking...");
    const data = {
      blockUserId: userId?.[0]?._id,
    };
    console.log(data);
    try {
      const res = await blockChat({ id: chat?._id, data }).unwrap();

      //   socket.emit("send-new-message", data);

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      setSelectedConversation(null);
      setBlockConversationModal(false);
    } catch (err) {
      toast.error(err.data.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={blockConversationModal}
      onOk={() => handleBlock(userData)}
      onCancel={() => setBlockConversationModal(false)}
      okText="Leave Conversation"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <Button
            className="text-xl py-5 px-8 !text-base-color"
            type="primary"
            onClick={() => setBlockConversationModal(false)}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
              color: "black",
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#FA4A0D" }}
            onClick={() => handleBlock(userData)}
          >
            Block
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to block this user?
      </p>
    </Modal>
  );
};

export default BlockConversation;
