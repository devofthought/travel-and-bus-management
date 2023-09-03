import { Table, Typography } from "antd";
import { useState } from "react";

const DriverTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      minWidth: 200,
      render: (link) => {
        return <Avatar src={link} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      minWidth: 200,
    },
    {
      title: "Age",
      dataIndex: "age",
      minWidth: 200,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Trip Completed",
      dataIndex: "trip_completed",
      minWidth: 200,
      sorter: (a, b) => a.trip_completed - b.trip_completed,
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
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "Years Experience",
      dataIndex: "years_experience",
      minWidth: 200,
    },
    {
      title: "Driving Status",
      dataIndex: "driving_status",
      minWidth: 200,
    },
  ];
  return (
    <span className="block w-full md:w-2/3">
      <Typography.Title level={4}>Driver</Typography.Title>
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
export default DriverTable;
