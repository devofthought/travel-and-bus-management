import { Table, Typography } from "antd";
import { useState } from "react";

const RouteTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      width: 200,
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
      sorter: (a, b) => a.availability_status - b.availability_status,
    },
    {
      title: "To",
      dataIndex: "to",
      minWidth: 200,
    },
    {
      title: "Distance",
      dataIndex: "distance",
      minWidth: 200,
    },
  ];
  return (
    <span className="block w-full md:w-1/2">
      <Typography.Title level={4}>Route</Typography.Title>
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
export default RouteTable;
