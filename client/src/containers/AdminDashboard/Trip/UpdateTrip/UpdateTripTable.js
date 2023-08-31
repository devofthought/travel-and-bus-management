import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateTripForm from "./UpdateForm";

const UpdateTripTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [dataSource, setDataSource] = useState(demoData);
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
    },
    {
      title: "Bus Code",
      dataIndex: "bus_code",
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
      title: "Distance",
      dataIndex: "distance",
      minWidth: 200,
    },
    {
      title: "Dept. Time",
      dataIndex: "departure_time",
      minWidth: 200,
    },
    {
      title: "Arr. time",
      dataIndex: "arrival_time",
      minWidth: 200,
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
      dataIndex: "trip_status",
      minWidth: 200,
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
        <Table columns={columns} dataSource={dataSource}></Table>
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

const demoData = [
  {
    key: "1",
    sr: "1",
    bus_code: "B-001",
    route_code: "R-001",
    from: "City A",
    to: "City B",
    distance: "100 km",
    departure_time: "08:00 AM",
    arrival_time: "12:00 PM",
    ticket_price: 50,
    trip_status: "Scheduled",
  },
  {
    key: "2",
    sr: "2",
    bus_code: "B-002",
    route_code: "R-002",
    from: "City B",
    to: "City C",
    distance: "150 km",
    departure_time: "09:30 AM",
    arrival_time: "01:30 PM",
    ticket_price: 65,
    trip_status: "On-going",
  },
  {
    key: "3",
    sr: "3",
    bus_code: "B-003",
    route_code: "R-003",
    from: "City C",
    to: "City D",
    distance: "120 km",
    departure_time: "10:15 AM",
    arrival_time: "02:15 PM",
    ticket_price: 55,
    trip_status: "Completed",
  },
];
