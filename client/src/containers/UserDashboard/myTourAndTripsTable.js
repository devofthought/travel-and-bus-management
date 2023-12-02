import { Button, Modal } from "antd";
import { Rate } from "antd";
import { Radio } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetAllCompletedAndUpcomingTripForUserQuery } from "@/redux/trip/tripApi";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

const MyTourAndTripsTable = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const decodedToken = jwt.decode(accessToken);

  const {
    data: tourHistoryData,
    error,
    isLoading,
  } = useGetAllCompletedAndUpcomingTripForUserQuery({
    trip_status: "completed",
    user_id: decodedToken.id,
  });

  // console.log(tourHistoryData);
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

  // TODO: Handle feedback on submit
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
      minWidth: 200,
      render: (_text, _record, index) => {
        return `${index + 1}`;
      },
    },
    {
      title: "From",
      dataIndex: "from",
      minWidth: 200,
      render: (from) => {
        return <span className="capitalize">{from}</span>;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      minWidth: 200,
      render: (from) => {
        return <span className="capitalize">{from}</span>;
      },
    },
    {
      title: "Distance",
      dataIndex: "distance",
      minWidth: 200,
      sorter: (a, b) => a.distance - b.distance,
      render: (distance) => {
        return <p className="lowercase">{distance} Km</p>;
      },
    },
    {
      title: "Dept. Time",
      dataIndex: "departure_time",
      minWidth: 200,
      sorter: (a, b) => a.departure_time - b.departure_time,
      render: (departure_time) => {
        return (
          <>
            <p>{dayjs(departure_time).format("YYYY-MM-DD")}</p>
            <p>{dayjs(departure_time).format("hh:mm A")}</p>
          </>
        );
      },
    },
    {
      title: "Arr. Time",
      dataIndex: "arrival_time",
      minWidth: 200,
      sorter: (a, b) => a.arrival_time - b.arrival_time,
      render: (arrival_time) => {
        return (
          <>
            <p>{dayjs(arrival_time).format("YYYY-MM-DD")}</p>
            <p>{dayjs(arrival_time).format("hh:mm A")}</p>
          </>
        );
      },
    },
    {
      title: "Fare",
      dataIndex: "fare",
      minWidth: 200,
      render: (fare) => {
        return <p>&#2547;{fare}</p>;
      },
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
    departure_time,
    arrival_time,
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
      departure_time,
      arrival_time,
      fare,
      seats,
      trip_status,
      feedback,
    };
  }

  const rows =
    tourHistoryData?.data &&
    tourHistoryData?.data?.map((d, i) =>
      createData(
        i + 1,
        d?.from,
        d?.to,
        d?.distance,
        d?.departure_time,
        d?.arrival_time,
        d?.fare,
        d?.seats,
        d?.trip_status,
        d?.feedback === "done" ? (
          "✅"
        ) : (
          <span className="cursor-pointer" onClick={showModal}>
            <EditOutlined />
          </span>
        )
      )
    );

  return (
    <>
      <Table className="mt-5" columns={columns} dataSource={rows} />

      {/* // TODO: feedback form handle modal and form */}
      <Modal
        open={open}
        title="Send A Feedback"
        onCancel={handleCancel}
        footer={[
          <Button
            className="w-full primary-bg"
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
