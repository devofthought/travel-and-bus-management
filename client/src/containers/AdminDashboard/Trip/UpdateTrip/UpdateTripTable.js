import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateTripForm from "./UpdateForm";

const UpdateTripTable = ({ data }) => {
  console.log(data);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
      render: (text, record, index) => {
        return `${index + 1}`;
      },
    },
    {
      title: "Bus Code",
      dataIndex: "bus_code",
      minWidth: 200,
    },
    {
      title: "From",
      dataIndex: "route_id",
      minWidth: 200,
      render: (route_id) => {
        return <p className="capitalize">{route_id?.from}</p>;
      },
    },
    {
      title: "To",
      dataIndex: "route_id",
      minWidth: 200,
      render: (route_id) => {
        return <p className="capitalize">{route_id?.to}</p>;
      },
    },
    {
      title: "Distance",
      dataIndex: "route_id",
      minWidth: 200,
      render: (route_id) => {
        return <p>{route_id?.distance} Km</p>;
      },
    },
    {
      title: "Dept. Time",
      dataIndex: "departure_time",
      minWidth: 200,
      render: (departure_time) => {
        const date = new Date(departure_time);
        if (!isNaN(date)) {
          return <p>{date.toLocaleString()}</p>;
        } else {
          return <p>Invalid Date</p>;
        }
      },
    },
    {
      title: "Arr. time",
      dataIndex: "arrival_time",
      minWidth: 200,
      render: (arrival_time) => {
        const date = new Date(arrival_time);
        if (!isNaN(date)) {
          return <p>{date.toLocaleString()}</p>;
        } else {
          return <p>Invalid Date</p>;
        }
      },
    },
    {
      title: "Fare",
      dataIndex: "ticket_price",
      minWidth: 200,
      render: (ticket_price) => {
        return <p>${ticket_price}</p>;
      },
    },
    {
      title: "Trip status",
      dataIndex: "trips_status",
      minWidth: 200,
      render: (trips_status) => {
        return (
          <p
            className={
              trips_status === "pending"
                ? "bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2"
                : trips_status === "on-processing"
                ? "bg-[rgba(28,213,174,.2)] text-[#38cab3] rounded pl-2"
                : "bg-[rgba(247,79,117,.2)] text-[#f74f75] rounded pl-2"
            }
          >
            {trips_status}
          </p>
        );
      },
    },
    {
      key: "5",
      title: "Edit",
      render: (tripData) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditTrip(tripData);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteTrip(tripData);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteTrip = (tripData) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this trip?",
      okText: "Yes",
      okType: "danger",
      centered: true,
      onOk: () => {
        /* add your logic to delete a trip */
        return 0;
      },
    });
  };
  const onEditTrip = (tripData) => {
    setIsEditing(true);
    setEditingTrip({ ...tripData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTrip(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={data}></Table>
        <Modal
          title="Update a trip"
          open={isEditing}
          okText="Save"
          centered
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            /* add there your logic on edit trip */
            resetEditing();
          }}
        >
          <UpdateTripForm editingTrip={editingTrip} />
        </Modal>
      </header>
    </div>
  );
};

export default UpdateTripTable;
