import { Avatar, Rate, Table, Typography } from "antd";
import { useState } from "react";

const TripListContainer = () => {
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
      title: "From",
      dataIndex: "from",
      minWidth: 200,
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
    {
      title: "Dept. Time",
      dataIndex: "departure_time",
      minWidth: 200,
    },
    {
      title: "Arr. time",
      dataIndex: "arrival_time",
      minWidth: 200,
    },
    {
      title: "Fare",
      dataIndex: "Ticket_price",
      minWidth: 200,
    },
    {
      title: "Trip status",
      dataIndex: "trip_status",
      minWidth: 200,
    },
  ];
  return (
    <span className="block w-full">
      <Typography.Title level={4}>Today Total Trip</Typography.Title>
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
export default TripListContainer;
