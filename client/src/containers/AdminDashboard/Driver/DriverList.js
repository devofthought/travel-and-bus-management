import { Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const DriverList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [dataSource, setDataSource] = useState(demoData);
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
    },
    {
      title: "Image",
      dataIndex: "image",
      minWidth: 200,
      render: (image) => {
        return <Avatar src={image} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      minWidth: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      minWidth: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      minWidth: 200,
    },
    {
      title: "Age",
      dataIndex: "age",
      minWidth: 200,
    },
    {
      title: "License",
      dataIndex: "license",
      minWidth: 200,
    },
    {
      title: "Experience",
      dataIndex: "experience",
      minWidth: 200,
      render: (experience) => {
        return <p>{experience} years</p>;
      },
    },
    {
      title: "Total Trip",
      dataIndex: "total_trip",
      minWidth: 200,
      sorter: (a, b) => a.total_trip - b.total_trip,
    },
    {
      key: "5",
      title: "Update Info",
      render: (TravelerData) => {
        return (
          <div style={{ color: "red", marginLeft: "20px" }}>
            <EditOutlined
              onClick={() => {
                onEditTrip(TravelerData);
              }}
            />
          </div>
        );
      },
    },
  ];

  const onEditTrip = (TravelerData) => {
    setIsEditing(true);
    setEditingDriver({ ...TravelerData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingDriver(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit driver information"
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
          {/* <UpdateTripForm editingDriver={editingDriver} /> */}
          <h1>here will be a form for edit Driver info</h1>
        </Modal>
      </header>
    </div>
  );
};

export default DriverList;

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
