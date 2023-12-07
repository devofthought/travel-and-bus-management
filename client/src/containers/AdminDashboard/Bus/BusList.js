import { Table, Modal, Avatar } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import UpdateBusForm from "./UpdateBusFrom";
import UpdateImage from "./UpdateBusImage";
import Spinner from "@/components/Shared/Spinner";

const BusListTable = ({ data, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

  /* bus image show and update modal  */
  const [isImageModal, setIsImageModal] = useState(false);
  const [ImageUpdate, setImageUpdate] = useState(null);

  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
      render: (_text, _record, index) => {
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
      render: (bus_image, BusData) => {
        return (
          <Avatar
            shape="square"
            size={64}
            src={bus_image?.avatar}
            className="cursor-pointer"
            onClick={() => {
              onImageSelect("bus_image", bus_image?.avatar, BusData._id);
            }}
          />
        );
      },
    },
    {
      title: "inner image",
      dataIndex: "inner_image",
      minWidth: 200,
      render: (inner_image, BusData) => {
        return (
          <Avatar
            shape="square"
            size={64}
            src={inner_image?.avatar}
            className="cursor-pointer"
            onClick={() => {
              onImageSelect("inner_image", inner_image?.avatar, BusData._id);
            }}
          />
        );
      },
    },
    {
      title: "Outer Image",
      dataIndex: "outer_image",
      minWidth: 200,
      render: (outer_image, BusData) => {
        return (
          <Avatar
            shape="square"
            size={64}
            src={outer_image?.avatar}
            className="cursor-pointer"
            onClick={() => {
              onImageSelect("outer_image", outer_image?.avatar, BusData._id);
            }}
          />
        );
      },
    },
    {
      title: "Total Trip",
      dataIndex: "availability_status",
      minWidth: 200,
      render: (availability_status) => {
        return <p>{availability_status?.length}</p>;
      },
    },
    /* // TODO: trip history show in a table */
    // {
    //   title: "Current status",
    //   dataIndex: "availability_status",
    //   minWidth: 200,
    //   render: (availability_status) => {
    //     return (
    //       <p
    //         className={
    //           availability_status === "servicing"
    //             ? "bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2"
    //             : availability_status === "standBy"
    //             ? "bg-[rgba(28,213,174,.2)] text-[#38cab3] rounded pl-2"
    //             : availability_status === "transit"
    //             ? "bg-[#7CB9E8] text-[#0039a6] rounded pl-2"
    //             : availability_status === "rest"
    //             ? "bg-[#A3C1AD] text-[#002244] rounded pl-2"
    //             : "bg-[rgba(247,79,117,.2)] text-[#f74f75] rounded pl-2"
    //         }
    //       >
    //         {availability_status}
    //       </p>
    //     );
    //   },
    // },
    {
      title: "Seats",
      dataIndex: "total_seats",
      minWidth: 200,
      render: (total_seats) => {
        console.log(total_seats);
        return <p>{total_seats[0]} Seats</p>;
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

  /* image show and upload */
  const onImageSelect = (image_name, url, Bus_id) => {
    setIsImageModal(true);
    setImageUpdate({ image_name, url, Bus_id });
  };

  const resetImageSelect = () => {
    setIsImageModal(false);
    setImageUpdate(null);
  };
  /* updating bus info */
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
          footer={null}
        >
          <UpdateBusForm
            editingBus={editingBus}
            resetEditing={resetEditing}
          ></UpdateBusForm>
        </Modal>

        {/* Update bus images */}
        <Modal
          title="Edit Bus Image"
          open={isImageModal}
          okText="Save"
          centered
          onCancel={() => {
            resetImageSelect();
          }}
          onOk={() => {
            resetImageSelect();
          }}
          width={330}
          footer={null}
        >
          <UpdateImage
            ImageUpdate={ImageUpdate}
            resetImageSelect={resetImageSelect}
          ></UpdateImage>
        </Modal>
      </header>
    </div>
  );
};

export default BusListTable;
