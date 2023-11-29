import { Table, Typography } from "antd";
import { useState } from "react";

const CompleteTripTable = () => {
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
      <Typography.Title level={4}>Trip History</Typography.Title>
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
export default CompleteTripTable;

const demoData = [
  {
    bus_id: "6565833f56baa686a7cc31ce",
    bus_model: "B5KH",
    bus_code: "B-0002",
    driver_id: "65657d35817edc2ee5d71fe8",
    driver_code: "D-0002",
    traveling_date: "2023-11-28T06:12:34.472Z",
    departure_time: "2023-11-28T11:11:57.5757",
    arrival_time: "2023-11-28T14:14:18.1818",
    from: "dhaka",
    to: "sylhet",
    distance: 330,
    fare: 400,
    available_seat: null,
    booked_seats_list: [],
    total_seat: ["40"],
  },
  {
    bus_id: "6565832356baa686a7cc31cb",
    bus_model: "B5LH ",
    bus_code: "B-0001",
    driver_id: "65657d29817edc2ee5d71fe1",
    driver_code: "D-0001",
    traveling_date: "2023-11-28T06:06:49.487Z",
    departure_time: "2023-11-28T12:58:42.4242",
    arrival_time: "2023-11-29T04:04:10.1010",
    from: "dhaka",
    to: "bogora",
    distance: 500,
    fare: 300,
    available_seat: null,
    booked_seats_list: [],
    total_seat: ["40"],
  },
];
