import { Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const RouteListTable = ({ data }) => {
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
      title: "Route Code",
      dataIndex: "route_code",
      minWidth: 200,
    },
    {
      title: "From",
      dataIndex: "from",
      minWidth: 200,
      render: (from) => {
        return <p className="capitalize">{from}</p>;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      minWidth: 200,
      render: (to) => {
        return <p className="capitalize">{to}</p>;
      },
    },
    {
      title: "Distance",
      dataIndex: "distance",
      minWidth: 200,
      sorter: (a, b) => a.distance - b.distance,
      render: (distance) => {
        return <p className="lowercase">{distance} Km</p>;
      },
    },
    {
      title: "Create time",
      dataIndex: "createdAt",
      minWidth: 200,
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: (createdAt) => {
        return <p>{new Date(createdAt).toDateString()}</p>;
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

export default RouteListTable;
