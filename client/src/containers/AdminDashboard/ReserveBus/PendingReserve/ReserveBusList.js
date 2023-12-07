import { Table, Modal } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Spinner from "@/components/Shared/Spinner";

const ReserveBusList = ({ data, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingReserveRequest, setEditingReserveRequest] = useState(null);
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
    },
    {
      title: "To",
      dataIndex: "to",
      minWidth: 200,
    },
    {
      title: "journey Date",
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
      title: "journey End",
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
      title: "Traveler name",
      dataIndex: "name",
      minWidth: 200,
    },
    {
      title: "Traveler email",
      dataIndex: "email",
      minWidth: 200,
    },
    {
      title: "Seats",
      dataIndex: "bus_seats",
      minWidth: 200,
      sorter: (a, b) => parseInt(a?.bus_seats) - parseInt(b?.bus_seats),
      render: (bus_seats) => {
        console.log(bus_seats);
        return <p>{bus_seats} Seats</p>;
      },
    },
    {
      title: "Bus Type",
      dataIndex: "bus_type",
      minWidth: 200,
      render: (bus_type) => {
        return <p>{bus_type} Bus</p>;
      },
    },
    {
      title: "reserve Booking Status",
      dataIndex: "status",
      minWidth: 200,
      render: (status) => {
        return (
          <p className="bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2">
            {status}
          </p>
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
    setEditingReserveRequest({ ...BusData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingReserveRequest(null);
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
            scroll={{ x: true }}
          ></Table>
        )}
        <Modal
          title="Edit reserve bus request details"
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
          {/* <UpdateTripForm editingReserveRequest={editingReserveRequest} /> */}
          <h1>here will be a form for edit Reserve Bus Request details</h1>
        </Modal>
      </header>
    </div>
  );
};

export default ReserveBusList;
