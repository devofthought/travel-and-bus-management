import { Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const ReserveBusList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingReserveRequest, setEditingReserveRequest] = useState(null);
  const [dataSource, setDataSource] = useState(demoData);
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
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
      title: "Start time",
      dataIndex: "start_time",
      minWidth: 200,
    },
    {
      title: "Traveler",
      dataIndex: "traveler_name",
      minWidth: 200,
    },
    {
      title: "Seats",
      dataIndex: "seats",
      minWidth: 200,
      render: (seats) => {
        return <p>{seats} Seats</p>;
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
        <Table columns={columns} dataSource={dataSource}></Table>
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

const demoData = [
  {
    sr: 1,
    from: "City A",
    to: "City B",
    start_time: "09:00 AM",
    traveler_name: "John Doe",
    seats: 2,
  },
  {
    sr: 2,
    from: "City C",
    to: "City D",
    start_time: "11:30 AM",
    traveler_name: "Jane Smith",
    seats: 3,
  },
  {
    sr: 3,
    from: "City E",
    to: "City F",
    start_time: "01:15 PM",
    traveler_name: "Alice Johnson",
    seats: 1,
  },
];
