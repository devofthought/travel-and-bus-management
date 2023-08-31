import { Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const IncidentListTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [dataSource, setDataSource] = useState(demoData);
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
    },
    {
      title: "Bus code",
      dataIndex: "bus_code",
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
      title: "Cost",
      dataIndex: "cost",
      minWidth: 200,
      render: (cost) => {
        return <p>${cost}</p>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      minWidth: 200,
    },
    {
      title: "Servicing Status",
      dataIndex: "servicing_status",
      minWidth: 200,
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
    setEditingIncident({ ...BusData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingIncident(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Incident details"
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
          {/* <UpdateTripForm editingIncident={editingIncident} /> */}
          <h1>here will be a form for edit Incident details</h1>
        </Modal>
      </header>
    </div>
  );
};

export default IncidentListTable;

const demoData = [
  {
    sr: 1,
    bus_code: "ABC123",
    seats: 30,
    cost: 150,
    description: "A comfortable bus with air conditioning",
    servicing_status: "on-servicing",
  },
  {
    sr: 2,
    bus_code: "XYZ789",
    seats: 40,
    cost: 200,
    description: "Luxury bus with reclining seats",
    servicing_status: "done",
  },
  {
    sr: 3,
    bus_code: "DEF456",
    seats: 25,
    cost: 120,
    description: "Economical bus for budget travelers",
    servicing_status: "pending",
  },
];
