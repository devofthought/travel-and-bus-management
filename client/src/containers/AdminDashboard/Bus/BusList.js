import { Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const BusListTable = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
      render: (text, record, index) => {
        // You can render a static serial number here
        return `${index + 1}`;
      },
    },
    {
      title: "Bus code",
      dataIndex: "bus_code",
      minWidth: 200,
    },
    {
      title: "Bus Model",
      dataIndex: "model",
      minWidth: 200,
    },
    {
      title: "Brand",
      dataIndex: "brand_name",
      minWidth: 200,
    },
    {
      title: "Image",
      dataIndex: "bus_image",
      minWidth: 200,
      render: (bus_image) => {
        return <Avatar shape="square" size={64} src={bus_image} />;
      },
    },
    {
      title: "inner image",
      dataIndex: "inner_image",
      minWidth: 200,
      render: (inner_image) => {
        return <Avatar shape="square" size={64} src={inner_image} />;
      },
    },
    {
      title: "Outer Image",
      dataIndex: "outer_image",
      minWidth: 200,
      render: (outer_image) => {
        return <Avatar shape="square" size={64} src={outer_image} />;
      },
    },
    {
      title: "Total Trip",
      dataIndex: "total_trip",
      minWidth: 200,
      sorter: (a, b) => a.total_trip - b.total_trip,
    },
    {
      title: "Current status",
      dataIndex: "availability_status",
      minWidth: 200,
      render: (availability_status) => {
        return (
          <p
            className={
              availability_status === "servicing"
                ? "bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2"
                : availability_status === "standBy"
                ? "bg-[rgba(28,213,174,.2)] text-[#38cab3] rounded pl-2"
                : availability_status === "transit"
                ? "bg-[#7CB9E8] text-[#0039a6] rounded pl-2"
                : availability_status === "rest"
                ? "bg-[#A3C1AD] text-[#002244] rounded pl-2"
                : "bg-[rgba(247,79,117,.2)] text-[#f74f75] rounded pl-2"
            }
          >
            {availability_status}
          </p>
        );
      },
    },
    {
      title: "Seats",
      dataIndex: "available_seats",
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
    setEditingBus({ ...BusData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingBus(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={data}></Table>
        <Modal
          title="Edit Bus details"
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
          {/* <UpdateTripForm editingBus={editingBus} /> */}
          <h1>here will be a form for edit bus details</h1>
        </Modal>
      </header>
    </div>
  );
};

export default BusListTable;

const demoData = [
  {
    key: "1",
    sr: "1",
    name: "Traveler",
    image: "https://robohash.org/hicveldicta.png",
    email: "user1@example.com",
    phone: "123-456-7890",
    experience: 10,
    license: "3487823jbh093",
    age: 28,
    total_trip: 10,
  },
  {
    key: "2",
    sr: "2",
    name: "Traveler",
    image: "https://robohash.org/doloremquesintcorrupti.png",
    email: "user2@example.com",
    experience: 3,
    license: "34h8g7893",
    phone: "987-654-3210",
    age: 35,
    total_trip: 15,
  },
  {
    key: "3",
    sr: "3",
    name: "Traveler",
    image: "https://robohash.org/consequunturautconsequatur.png",
    email: "user3@example.com",
    phone: "555-123-4567",
    experience: 15,
    license: "89h34g32h8h",
    age: 22,
    total_trip: 5,
  },
];
