import { Modal } from "antd";
import React from "react";

const MainModal = ({ isModalOpen, handleCancel, title, description }) => {
  return (
    <Modal
      className="text-2xl"
      titleFontSize={24}
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <p className="text-sm text-gray-500 font-medium">{description}</p>
    </Modal>
  );
};

export default MainModal;
