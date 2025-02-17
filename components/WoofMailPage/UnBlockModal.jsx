import { useUnBlockChatMutation } from "@/redux/api/features/chatApi";
import { Button, Modal } from "antd";
import { toast } from "sonner";

const UnBlockConversation = ({
  unBlockConversationModal,
  setSelectedConversation,
  setUnBlockConversationModal,
  userData,
  chat,
}) => {
  const [unblockChat] = useUnBlockChatMutation();

  const userId = chat?.users?.filter((user) => user._id !== userData?.userId);

  const handleUnBlock = async (userData) => {
    const toastId = toast.loading("Unblocking...");
    const data = {
      blockUserId: userId?.[0]?._id,
    };
    console.log(data);
    try {
      const res = await unblockChat({ id: chat?._id, data }).unwrap();

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      setSelectedConversation(null);
      setUnBlockConversationModal(false);
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
      open={unBlockConversationModal}
      onOk={() => handleUnBlock(userData)}
      onCancel={() => setUnBlockConversationModal(false)}
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
            onClick={() => setUnBlockConversationModal(false)}
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
            style={{ background: "#F88D58" }}
            onClick={() => handleUnBlock(userData)}
          >
            Unblock
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to unblock this user?
      </p>
    </Modal>
  );
};

export default UnBlockConversation;
