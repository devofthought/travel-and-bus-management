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
      <div className="border-2 border-dashed border-red-400 rounded-[8px] p-5 flex flex-col md:flex-row gap-10 items-center justify-around">
        <div className="flex flex-col gap-2">
          <span className="text-lg">
            If you want to upgrade day and time this whole dhruto travel
            application click this upgrade button!{" "}
          </span>
          <span className="text-lg">Note: it will be never undo!</span>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className={`main-button primary-bg w-28 py-3 text-lg text-white border-none rounded-[5px] cursor-pointer text-center transition-transform active:scale-95 hover:opacity-75 shadow`}
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
