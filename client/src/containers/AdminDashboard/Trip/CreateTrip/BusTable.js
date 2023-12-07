import Spinner from "@/components/Shared/Spinner";
import { useGetAllBusQuery } from "@/redux/bus/busApi";
import { Avatar, Table, Typography } from "antd";

const BusTable = () => {
  const { data, isLoading } = useGetAllBusQuery();

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
      title: "Brand Name",
      dataIndex: "brand_name",
      minWidth: 200,
    },
    {
      title: "Trip Complete",
      dataIndex: "trip_complete",
      minWidth: 200,
    },
    {
      title: "Image",
      dataIndex: "bus_image",
      minWidth: 200,
      render: (bus_image) => {
        return <Avatar size={16} src={bus_image?.avatar} />;
      },
    },
  ];
  return (
    <span className="block w-full md:w-1/2">
      <Typography.Title level={4}>Bus</Typography.Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={{
            pageSize: 5,
          }}
          scroll={{ x: true }}
        ></Table>
      )}
    </span>
  );
};
export default BusTable;
