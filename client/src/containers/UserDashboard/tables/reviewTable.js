import { Modal } from "antd";
import { Button, Table } from "antd";
import React, { useState } from "react";

const ReviewTable = ({ data }) => {
  // * * * * * * * * for modal * * * * * * * *
  const [feedbackDetails, setFeedbackDetails] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // * * * * * * * * for table * * * * * * * *
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
    },
    {
      title: "Feedback For",
      dataIndex: "feedback_for",
    },
    {
      title: "Feedback Details",
      dataIndex: "feedback_details",
    },
    {
      title: "Stars",
      dataIndex: "stars",
    },
  ];

  function createData(sr, feedback_for, feedback_details, stars) {
    return {
      sr,
      feedback_for,
      feedback_details,
      stars,
    };
  }

  const rows =
    data &&
    data?.map((d, i) =>
      createData(
        i + 1,
        d?.feedback_for,
        <span
          onClick={() => {
            showModal();
            setFeedbackDetails(d?.feedback_details);
          }}
          className="cursor-pointer underline"
        >
          {d?.feedback_details?.length > 50
            ? d?.feedback_details?.slice(0, 50) + "..."
            : d?.feedback_details}
        </span>,
        d?.stars
      )
    );

  return (
    <>
      <Table className="mt-5" columns={columns} dataSource={rows} />
      <Modal
        open={open}
        title="Feedback"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {feedbackDetails}
      </Modal>
    </>
  );
};

export default ReviewTable;
