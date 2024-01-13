import { Modal } from "antd";
import React, { useState } from "react";
import UpgradeForm from "./updgradeForm";

const SystemTime = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="border border-5 border-red-400 rounded-[5px] p-5 flex flex-col md:flex-row gap-10 items-center justify-center">
        <div className="flex flex-col gap-2">
          <span className="text-md">
            if you want to upgrade day and time this whole dhruto travel
            application click this upgrade button!{" "}
          </span>
          <span className="text-md">Note: it will be never undo!</span>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className={`main-button primary-bg w-28 py-3 text-white border-none rounded-[5px] cursor-pointer text-center transition-transform active:scale-95 hover:opacity-75 shadow`}
        >
          Upgrade
        </button>
      </div>
      <Modal
        title="confirm upgrade"
        open={isOpen}
        okText="Save"
        centered
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={() => {
          setIsOpen(false);
        }}
        footer={null}
      >
        <UpgradeForm modalCancel={modalCancel}></UpgradeForm>
      </Modal>
    </>
  );
};

export default SystemTime;
