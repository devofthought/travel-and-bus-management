import { Table, Modal } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteRouteMutation } from "@/redux/route/routeApi";
import UpdateRouteForm from "./UpdateRouteFrom";

const RouteListTable = ({ data }) => {
  const [deleteRoute, { routeResponse: response, error, isLoading }] =
    useDeleteRouteMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
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
      render: (routeData) => {
        return (
          <div>
            <>
              <EditOutlined
                onClick={() => {
                  onEditTrip(routeData);
                }}
                style={{ color: "orange", marginLeft: "20px" }}
              />
              <DeleteOutlined
                onClick={() => {
                  onDeleteRoute(routeData);
                }}
                style={{ color: "red", marginLeft: 12 }}
              />
            </>
          </div>
        );
      },
    },
  ];

  const onDeleteRoute = (routeData) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this route record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteRoute(routeData._id);
      },
    });
  };

  const onEditTrip = (routeData) => {
    setIsEditing(true);
    setEditingRoute({ ...routeData });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRoute(null);
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
          <UpdateRouteForm
            editingRoute={editingRoute}
            resetEditing={resetEditing}
          ></UpdateRouteForm>
        </Modal>
      </header>
    </div>
  );
};

export default RouteListTable;
