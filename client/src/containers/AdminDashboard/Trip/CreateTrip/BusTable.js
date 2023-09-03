import { Avatar, Rate, Table, Typography } from "antd";
import { useState } from "react";

const BusTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
    },
    {
      title: "Bus Code",
      dataIndex: "bus_code",
      minWidth: 200,
    },
    {
      title: "Availability Status",
      dataIndex: "availability_status",
      minWidth: 200,
      sorter: (a, b) => a.availability_status - b.availability_status,
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
      title: "Bus Image",
      dataIndex: "bus_image",
      minWidth: 200,
    },
  ];
  return (
    <span className="block w-full md:w-1/2">
      <Typography.Title level={4}>Bus</Typography.Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </span>
  );
};
export default BusTable;
