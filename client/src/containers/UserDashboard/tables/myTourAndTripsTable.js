import { Button, Modal } from "antd";
import { Rate } from "antd";
import { Radio } from "antd";
import { Table } from "antd";
import React, { useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;

const MyTourAndTripsTable = ({ data }) => {
  // * * * * * * * * for modal * * * * * * * *
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [feedbackType, setFeedbackType] = useState("trip");
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedbackTypeChange = (e) => {
    setFeedbackType(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackTextChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Feedback Type:", feedbackType);
    console.log("Rating:", rating);
    console.log("Feedback Text:", feedbackText);

    handleCancel();
  };

  // * * * * * * * * for table * * * * * * * *
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Distance",
      dataIndex: "distance",
    },
    {
      title: "Fare",
      dataIndex: "fare",
    },
    {
      title: "Seats",
      dataIndex: "seats",
    },
    {
      title: "Trip Status",
      dataIndex: "trip_status",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
    },
  ];

  function createData(
    sr,
    from,
    to,
    distance,
    fare,
    seats,
    trip_status,
    feedback
  ) {
    return {
      sr,
      from,
      to,
      distance,
      fare,
      seats,
      trip_status,
      feedback,
    };
  }

  const rows =
    data &&
    data?.map((d, i) =>
      createData(
        i + 1,
        d?.from,
        d?.to,
        d?.distance,
        d?.fare,
        d?.seats,
        d?.trip_status,
        d?.feedback === "done" ? (
          "✅"
        ) : (
          <span className="cursor-pointer" onClick={showModal}>
            {"⁉️"}
          </span>
        )
      )
    );


  return (
    <>
      <Table className="mt-5" columns={columns} dataSource={rows} />
      <Modal
        open={open}
        title="Send A Feedback"
        onCancel={handleCancel}
        footer={[
          <Button
            className="w-full bg-[#1677ff]"
            type="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="flex justify-center">
          <Radio.Group
            value={feedbackType}
            onChange={handleFeedbackTypeChange}
            size="middle"
            buttonStyle="solid"
          >
            <Radio.Button value="trip">Trip</Radio.Button>
            <Radio.Button value="bus">Bus</Radio.Button>
            <Radio.Button value="driver">Driver</Radio.Button>
          </Radio.Group>
        </div>
        <div className="mt-10 flex justify-center">
          <Rate value={rating} onChange={handleRatingChange} />
        </div>
        <Input.TextArea
          className="mt-5"
          rows={4}
          value={feedbackText}
          onChange={handleFeedbackTextChange}
          placeholder="Tell us about your experience"
        />
      </Modal>
    </>
  );
};

export default MyTourAndTripsTable;
