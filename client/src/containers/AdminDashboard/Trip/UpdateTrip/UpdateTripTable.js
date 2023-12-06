import { Table, Modal } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateTripForm from "./UpdateForm";
import { BiTrip } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import Spinner from "@/components/Shared/Spinner";

const UpdateTripTable = ({ data, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
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
      title: "Bus Code",
      dataIndex: "bus_code",
      minWidth: 200,
    },
    {
      title: "route Code",
      dataIndex: "route_id",
      minWidth: 200,
      render: (route_id) => {
        return (
          <>
            <p className="capitalize">{route_id?.route_code}</p>
            <p className="capitalize">
              <span className="flex items-center">
                <span className="pe-2">
                  <BiTrip />
                </span>
                {route_id?.from}
                <span className="ps-2 pe-2">
                  <AiOutlineArrowRight />
                </span>
                {route_id?.to}
              </span>
            </p>
          </>
        );
      },
    },
    {
      title: "Distance",
      dataIndex: "route_id",
      minWidth: 200,
      render: (route_id) => {
        return <p>{route_id?.distance} Km</p>;
      },
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
      dataIndex: "trips_status",
      minWidth: 200,
      render: (trips_status) => {
        return (
          <p
            className={
              trips_status === "pending"
                ? "bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2"
                : trips_status === "on-processing"
                ? "bg-[rgba(28,213,174,.2)] text-[#38cab3] rounded pl-2"
                : "bg-[rgba(247,79,117,.2)] text-[#f74f75] rounded pl-2"
            }
          >
            {trips_status}
          </p>
        );
      },
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
            {/* <DeleteOutlined
              onClick={() => {
                onDeleteTrip(tripData);
              }}
              style={{ color: "red", marginLeft: 12 }}
            /> */}
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
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 5,
            }}
            scroll={{ x: true }}
          ></Table>
        )}
        <Modal
          title="Update a trip"
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
          <UpdateTripForm
            editingTrip={editingTrip}
            resetEditing={resetEditing}
          />
        </Modal>
      </header>
    </div>
  );
};

export default UpdateTripTable;
