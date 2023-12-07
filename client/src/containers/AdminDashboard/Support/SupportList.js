import { Modal, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import Spinner from "@/components/Shared/Spinner";

const SupportList = ({ data, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSupportRequest, setEditingSupportRequest] = useState(null);

  const [messageModal, SetMessageModal] = useState(false);
  const [message, SetMessage] = useState("");
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
      title: "Name",
      dataIndex: "first_name",
      minWidth: 200,
      render: (first_name) => {
        return <p className="capitalize">{first_name}</p>;
      },
    },
    {
      title: "email",
      dataIndex: "email",
      minWidth: 200,
    },
    {
      title: "phone",
      dataIndex: "phone",
      minWidth: 200,
    },
    {
      title: "Created Date",
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
      title: "subject",
      dataIndex: "subject",
      minWidth: 200,
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (message) => {
        return (
          <span
            onClick={() => {
              onEditDriver(message);
            }}
            className="cursor-pointer underline"
          >
            {message?.length > 50 ? message?.slice(0, 50) + "..." : message}
          </span>
        );
      },
    },
    {
      key: "5",
      title: "Edit details",
      render: (BusData) => {
        return (
          <div style={{ color: "red", marginLeft: "20px" }}>
            <EditOutlined
              onClick={() => {
                onEditTrip(BusData);
              }}
            />
          </div>
        );
      },
    },
  ];

  const onEditTrip = (BusData) => {
    setIsEditing(true);
    setEditingSupportRequest({ ...BusData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingSupportRequest(null);
  };

  const onEditDriver = (feedbackDetails) => {
    SetMessageModal(true);
    SetMessage(feedbackDetails);
  };
  const resetModelOpen = () => {
    SetMessageModal(false);
    SetMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 5,
            }}
            scroll={{ x: true }}
          ></Table>
        )}
      </header>
      <Modal
        title="Edit support request details"
        open={isEditing}
        okText="Save"
        centered
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          resetEditing();
        }}
      >
        <h1>here will be a form for edit support request</h1>
      </Modal>

      <Modal
        title="Message Details"
        open={messageModal}
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
        <p className="capitalize">{message}</p>
      </Modal>
    </div>
  );
};

export default SupportList;
