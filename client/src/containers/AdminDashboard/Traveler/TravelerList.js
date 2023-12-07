import { Button, Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const TravelerList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTraveler, setEditingTraveler] = useState(null);
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
      title: "Total Trip",
      dataIndex: "total_trip",
      minWidth: 200,
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
    setEditingTraveler({ ...TravelerData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTraveler(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: true }}
        ></Table>
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
          {/* <UpdateTripForm editingTraveler={editingTraveler} /> */}
          <h1>here will be a form for edit user info</h1>
        </Modal>
      </header>
    </div>
  );
};

export default TravelerList;

const demoData = [
  {
    key: "1",
    sr: "1",
    name: "Traveler",
    image: "https://robohash.org/hicveldicta.png",
    email: "user1@example.com",
    phone: "123-456-7890",
    age: 28,
    total_trip: 10,
  },
  {
    key: "2",
    sr: "2",
    name: "Traveler",
    image: "https://robohash.org/doloremquesintcorrupti.png",
    email: "user2@example.com",
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
    age: 22,
    total_trip: 5,
  },
];
