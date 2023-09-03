import { Avatar, Rate, Table, Typography } from "antd";
import { useState } from "react";

const TripListContainer = () => {
  const [dataSource, setDataSource] = useState(demoData);

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
      dataIndex: "ticket_price",
      minWidth: 200,
      render: (ticket_price) => {
        return <p>${ticket_price}</p>;
      },
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

const demoData = [
  {
    key: "1",
    sr: "1",
    bus_code: "B-001",
    from: "City A",
    to: "City B",
    distance: "100 km",
    departure_time: "08:00 AM",
    arrival_time: "12:00 PM",
    Ticket_price: 50,
    trip_status: "Scheduled",
  },
  {
    key: "2",
    sr: "2",
    bus_code: "B-002",
    from: "City B",
    to: "City C",
    distance: "150 km",
    departure_time: "09:30 AM",
    arrival_time: "01:30 PM",
    Ticket_price: 65,
    trip_status: "On-going",
  },
  {
    key: "3",
    sr: "3",
    bus_code: "B-003",
    from: "City C",
    to: "City D",
    distance: "120 km",
    departure_time: "10:15 AM",
    arrival_time: "02:15 PM",
    Ticket_price: 55,
    trip_status: "Completed",
  },
];
