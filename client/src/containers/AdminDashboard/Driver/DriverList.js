import { Table, Modal, Avatar } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateDriverForm from "./UpdateDriverForm";
import { useDeleteDriverMutation } from "@/redux/driver/driverApi";
import Swal from "sweetalert2";
import Spinner from "@/components/Shared/Spinner";

const DriverList = ({ data, loading }) => {
  const [deleteDriver, { data: response, error, isLoading }] =
    useDeleteDriverMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
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
      render: (travelerData) => {
        return (
          <div style={{ color: "red", marginLeft: "20px" }}>
            <EditOutlined
              onClick={() => {
                onEditDriver(travelerData);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteDriver(travelerData);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </div>
        );
      },
    },
  ];

  const onDeleteDriver = (travelerData) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this driver record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteDriver(travelerData._id);
      },
    });
  };

  const onEditDriver = (travelerData) => {
    console.log(travelerData);
    setIsEditing(true);
    setEditingDriver({ ...travelerData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingDriver(null);
  };

  useEffect(() => {
    if (response?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${response?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error?.status === 400) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [response, error]);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: true }}
          ></Table>
        )}
        <Modal
          title="Edit driver information"
          open={isEditing}
          okText="Save"
          centered
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            resetEditing();
          }}
          footer={null}
        >
          <UpdateDriverForm
            editingDriver={editingDriver}
            resetEditing={resetEditing}
          ></UpdateDriverForm>
        </Modal>
      </header>
    </div>
  );
};

export default DriverList;
