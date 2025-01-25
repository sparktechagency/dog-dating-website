import { Button, Modal } from "antd";

const LeaveConversation = ({
  leaveConversationModal,
  setLeaveConversationModal,
  userData,
}) => {
  const handleLeaveConversation = async (userData) => {
    setLeaveConversationModal(false);
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={leaveConversationModal}
      onOk={() => handleLeaveConversation(userData)}
      onCancel={() => setLeaveConversationModal(false)}
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
            onClick={() => setLeaveConversationModal(false)}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#F88D58" }}
            onClick={() => handleLeaveConversation(userData)}
          >
            Leave
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to leave from this conversation?
      </p>
    </Modal>
  );
};

export default LeaveConversation;
