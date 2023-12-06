import { Table, Modal, Rate } from "antd";
import { useState } from "react";
import { BiTrip } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetFeedBackQuery } from "@/redux/feedback/feedbackApi";
import dayjs from "dayjs";
import Spinner from "@/components/Shared/Spinner";

const ReviewTable = () => {
  const { data: feedBackData, isLoading } = useGetFeedBackQuery();

  const [feedbackDetailsModelOpen, setFeedbackDetailsModelOpen] =
    useState(false);
  const [feedDetailsContent, setFeedDetailsContent] = useState("");
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
      title: "Dept. to Arr.",
      dataIndex: "trip_id",
      minWidth: 200,
      render: (trip_id) => {
        return (
          <span className="flex items-center">
            <span className="ps-2 pe-2">
              <BiTrip />
            </span>
            {trip_id?.route_id?.from}
            <span className="ps-3 pe-3">
              <AiOutlineArrowRight />
            </span>
            {trip_id?.route_id?.to}
          </span>
        );
      },
    },
    {
      title: "Dept. Time",
      dataIndex: "trip_id",
      minWidth: 200,
      sorter: (a, b) => a.trip_id?.departure_time - b.trip_id?.departure_time,
      render: (trip_id) => {
        return (
          <>
            <p>{dayjs(trip_id?.departure_time)?.format("YYYY-MM-DD")}</p>
            <p>{dayjs(trip_id?.departure_time)?.format("hh:mm A")}</p>
          </>
        );
      },
    },
    {
      title: "Feedback For",
      dataIndex: "feedback_for",
      render: (feedback_for) => {
        return <span className="capitalize">{feedback_for}</span>;
      },
    },
    {
      title: "Feedback Details",
      dataIndex: "feedback",
      render: (feedback) => {
        return (
          <span
            onClick={() => {
              onEditDriver(feedback);
            }}
            className="cursor-pointer underline"
          >
            {feedback?.length > 50 ? feedback?.slice(0, 50) + "..." : feedback}
          </span>
        );
      },
    },
    {
      title: "Stars",
      dataIndex: "rating",
      render: (rating) => {
        return (
          <div className="flex items-center">
            <span>({rating})</span>
            <Rate
              className="custom-rate-feedback flex ms-1"
              style={{ fontSize: 14 }}
              value={rating}
              disabled
            />
          </div>
        );
      },
    },
  ];

  const onEditDriver = (feedbackDetails) => {
    setFeedbackDetailsModelOpen(true);
    setFeedDetailsContent(feedbackDetails);
  };
  const resetModelOpen = () => {
    setFeedbackDetailsModelOpen(false);
    setFeedDetailsContent("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="responsive-table-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <Table
              columns={columns}
              dataSource={feedBackData?.data}
              pagination={{
                pageSize: 5,
              }}
              scroll={{ x: true }}
            ></Table>
          )}
        </div>
        <Modal
          title="Feedback Details"
          open={feedbackDetailsModelOpen}
          okText="Save"
          centered
          onCancel={() => {
            resetModelOpen();
          }}
          onOk={() => {
            resetModelOpen();
          }}
          footer={null}
        >
          <p>{feedDetailsContent}</p>
        </Modal>
      </header>
    </div>
  );
};

export default ReviewTable;
