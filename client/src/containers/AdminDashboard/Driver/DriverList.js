import { Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const DriverList = ({ data }) => {
  console.log(data);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
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
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "License",
      dataIndex: "driving_license",
      minWidth: 200,
    },
    {
      title: "Experience",
      dataIndex: "years_experience",
      minWidth: 200,
      sorter: (a, b) => a.years_experience - b.years_experience,
      render: (years_experience) => {
        return <p>{years_experience} years</p>;
      },
    },
    {
      title: "Total Trip",
      dataIndex: "total_trip",
      minWidth: 200,
      sorter: (a, b) => a.total_trip - b.total_trip,
    },
    {
      title: "Joining Date",
      dataIndex: "joining_date",
      minWidth: 200,
      sorter: (a, b) => a.joining_date - b.joining_date,
      render: (joining_date) => {
        return <p>{new Date(joining_date).toDateString()}</p>;
      },
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
        <Table columns={columns} dataSource={data}></Table>
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
