import React, { useState } from "react";
import { Button, Modal } from "antd";
import CreateTripForm from "../CreateTrip/CreateForm";

const CreateTripModal = () => {
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <>
      <div className="w-full d-flex justify-between mr-auto mb-5">
        <Button type="primary" className="" onClick={() => setModal2Open(true)}>
          Add Trip
        </Button>
      </div>
      <Modal
        title="Add a new trip"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <CreateTripForm />
      </Modal>
    </>
  );
};

export default CreateTripModal;
