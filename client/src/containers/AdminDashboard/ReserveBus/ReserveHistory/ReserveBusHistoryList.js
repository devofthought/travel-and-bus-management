import { Table, Modal, Avatar } from "antd";
import { useState } from "react";

const ReserveBusHistoryList = () => {
  const [dataSource, setDataSource] = useState(demoData);
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
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
      title: "Start time",
      dataIndex: "start_time",
      minWidth: 200,
    },
    {
      title: "end time",
      dataIndex: "end_time",
      minWidth: 200,
    },
    {
      title: "Traveler",
      dataIndex: "traveler_name",
      minWidth: 200,
    },
    {
      title: "total_price",
      dataIndex: "total_price",
      minWidth: 200,
      render: (total_price) => {
        return <p>${total_price}</p>;
      },
    },
    {
      title: "bus_code",
      dataIndex: "bus_code",
      minWidth: 200,
    },
    {
      title: "status",
      dataIndex: "status",
      minWidth: 200,
      render: (status) => {
        return (
          <p
            className={
              status === "Booked"
                ? "bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2"
                : status === "Confirmed"
                ? "bg-[rgba(28,213,174,.2)] text-[#38cab3] rounded pl-2"
                : "bg-[rgba(247,79,117,.2)] text-[#f74f75] rounded pl-2"
            }
          >
            {status}
          </p>
        );
      },
    },
    {
      title: "confirm by ",
      dataIndex: "confirm_by_admin",
      minWidth: 200,
    },
    {
      title: "Seats",
      dataIndex: "seats",
      minWidth: 200,
      render: (seats) => {
        return <p>{seats} Seats</p>;
      },
    },
    {
      title: "driver ",
      dataIndex: "driver_code",
      minWidth: 200,
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={dataSource}></Table>
      </header>
    </div>
  );
};

export default ReserveBusHistoryList;

const demoData = [
  {
    sr: 1,
    from: "City A",
    to: "City B",
    start_time: "09:00 AM",
    end_time: "02:00 PM",
    traveler_name: "John Doe",
    total_price: 50,
    bus_code: "ABC123",
    status: "Booked",
    confirm_by_admin: "Admin A",
    seats: 2,
    driver_code: "D123",
  },
  {
    sr: 2,
    from: "City C",
    to: "City D",
    start_time: "11:30 AM",
    end_time: "05:30 PM",
    traveler_name: "Jane Smith",
    total_price: 75,
    bus_code: "XYZ789",
    status: "Confirmed",
    confirm_by_admin: "Admin B",
    seats: 3,
    driver_code: "D456",
  },
  {
    sr: 3,
    from: "City E",
    to: "City F",
    start_time: "01:15 PM",
    end_time: "06:45 PM",
    traveler_name: "Alice Johnson",
    total_price: 40,
    bus_code: "DEF456",
    status: "Cancelled",
    confirm_by_admin: "Admin C",
    seats: 1,
    driver_code: "D789",
  },
  // Add more data entries as needed
];
