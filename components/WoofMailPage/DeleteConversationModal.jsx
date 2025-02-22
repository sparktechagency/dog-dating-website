import {
  useDeleteChatMutation,
  useUnBlockChatMutation,
} from "@/redux/api/features/chatApi";
import { Button, Modal } from "antd";
import { toast } from "sonner";

const DeleteConversationModal = ({
  deleteConversationModal,
  setSelectedConversation,
  setDeleteConversationModal,
  userData,
  chat,
}) => {
  const [deleteChat] = useDeleteChatMutation();

  const userId = chat?.users?.filter((user) => user._id !== userData?.userId);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting Conversation...");

    try {
      const res = await deleteChat({ id: chat?._id }).unwrap();

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      setSelectedConversation(null);
      setDeleteConversationModal(false);
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
      open={deleteConversationModal}
      onOk={() => handleUnBlock(userData)}
      onCancel={() => setDeleteConversationModal(false)}
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
            onClick={() => setDeleteConversationModal(false)}
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to Delete this conversation?
      </p>
    </Modal>
  );
};

export default DeleteConversationModal;
