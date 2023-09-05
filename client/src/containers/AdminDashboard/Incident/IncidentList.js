import { Table, Modal } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteIncidentMutation } from "@/redux/incident/incidentApi";
import UpdateIncidentForm from "./UpdateIncidentForm";

const incidentListTable = ({ data }) => {
  const [deleteIncident, { incidentResponse: response, error, isLoading }] =
    useDeleteIncidentMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
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
      title: "Bus code",
      dataIndex: "bus_code",
      minWidth: 200,
    },
    {
      title: "Seats",
      dataIndex: "avaliable_seats",
      minWidth: 200,
      render: (avaliable_seats) => {
        return <p>{avaliable_seats} Seats</p>;
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
      render: (incidentData) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                onEditIncident(incidentData);
              }}
              style={{ color: "orange", marginLeft: "20px" }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteIncident(incidentData);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </div>
        );
      },
    },
  ];

  const onDeleteIncident = (incidentData) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this incident record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteIncident(incidentData._id);
      },
    });
  };

  const onEditIncident = (incidentData) => {
    setIsEditing(true);
    setEditingIncident({ ...incidentData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingIncident(null);
  };
  // console.log(editingRoute);
  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={data}></Table>
        <Modal
          title="Edit route details"
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
          <UpdateIncidentForm
            editingIncident={editingIncident}
            resetEditing={resetEditing}
          ></UpdateIncidentForm>
        </Modal>
      </header>
    </div>
  );
};

export default incidentListTable;
