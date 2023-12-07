import { Button, Modal } from "antd";
import { Rate } from "antd";
import { Radio } from "antd";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetAllCompletedAndUpcomingTripForUserQuery } from "@/redux/trip/tripApi";
import dayjs from "dayjs";
import { useAddFeedBackMutation } from "@/redux/feedback/feedbackApi";
import Swal from "sweetalert2";
import Spinner from "@/components/Shared/Spinner";

const MyTourHistoryTable = () => {
  const {
    data: tourHistoryData,
    error,
    isLoading,
  } = useGetAllCompletedAndUpcomingTripForUserQuery({
    trip_status: "completed",
  });

  const [
    AddFeedback,
    { data: addResponse, error: addError, isLoading: addIsLoading },
  ] = useAddFeedBackMutation();

  // * * * * * * * * for modal * * * * * * * *
  const [open, setOpen] = useState(false);
  const [tripID, setTripID] = useState("");
  const showModal = ({ id }) => {
    setTripID(id);
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

    const feedbackReq = {
      feedback_for: feedbackType,
      trip_id: tripID,
      feedback: feedbackText,
      rating: parseInt(rating),
    };

    AddFeedback(feedbackReq);
  };

  useEffect(() => {
    if (addResponse?.statusCode === 200 || addResponse?.statusCode === 202) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${addResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      handleCancel();
    } else if (addError?.status === 404 || addError?.status === 406) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${addError?.data?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [addResponse, addError]);

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
      render: (feedback, id) => {
        return (
          <span>
            {feedback === "done" ? (
              "✅"
            ) : (
              <span
                onClick={() => showModal(id)}
                className="cursor-pointer underline"
              >
                <EditOutlined />
              </span>
            )}
          </span>
        );
      },
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="responsive-table-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <Table
              columns={columns}
              dataSource={tourHistoryData?.data}
              pagination={{
                pageSize: 5,
              }}
              scroll={{ x: true }}
            ></Table>
          )}
        </div>
        <Modal
          open={open}
          title="Send A Feedback"
          onCancel={handleCancel}
          centered
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
      </header>
    </div>
  );
};

export default MyTourHistoryTable;
