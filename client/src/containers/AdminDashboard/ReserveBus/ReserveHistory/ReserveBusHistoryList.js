import Spinner from "@/components/Shared/Spinner";
import { Table } from "antd";
import dayjs from "dayjs";

const ReserveBusHistoryList = ({ data, isLoading }) => {
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
      render: (_text, _record, index) => {
        return `${index + 1}`;
      },
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
      title: "journey Date",
      dataIndex: "departure_time",
      minWidth: 200,
      sorter: (a, b) => a.departure_time - b.departure_time,
      render: (departure_time) => {
        return (
          <>
            <p>{dayjs(departure_time).format("YYYY-MM-DD")}</p>
            <p>{dayjs(departure_time).format("hh:mm A")}</p>
          </>
        );
      },
    },
    {
      title: "journey End",
      dataIndex: "arrival_time",
      minWidth: 200,
      sorter: (a, b) => a.arrival_time - b.arrival_time,
      render: (arrival_time) => {
        return (
          <>
            <p>{dayjs(arrival_time).format("YYYY-MM-DD")}</p>
            <p>{dayjs(arrival_time).format("hh:mm A")}</p>
          </>
        );
      },
    },
    {
      title: "Traveler name",
      dataIndex: "name",
      minWidth: 200,
    },
    {
      title: "Traveler email",
      dataIndex: "email",
      minWidth: 200,
    },
    {
      title: "fare cost",
      dataIndex: "fare_cost",
      minWidth: 200,
      render: (fare_cost) => {
        return <p>{fare_cost} Taka</p>;
      },
    },
    {
      title: "Driver code",
      dataIndex: "driver_code",
      minWidth: 200,
      render: (driver_code) => {
        return <p>{driver_code}</p>;
      },
    },
    {
      title: "Bus code",
      dataIndex: "bus_code",
      minWidth: 200,
      render: (bus_code) => {
        return <p>{bus_code}</p>;
      },
    },
    {
      title: "Seats",
      dataIndex: "bus_seats",
      minWidth: 200,
      sorter: (a, b) => parseInt(a?.bus_seats) - parseInt(b?.bus_seats),
      render: (bus_seats) => {
        return <p>{bus_seats} Seats</p>;
      },
    },
    {
      title: "Bus Type",
      dataIndex: "bus_type",
      minWidth: 200,
      render: (bus_type) => {
        return <p>{bus_type} Bus</p>;
      },
    },
    {
      title: "reserve Booking Status",
      dataIndex: "status",
      minWidth: 200,
      render: (status) => {
        return (
          <p
            className={
              status === "pending"
                ? "bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2"
                : status === "approved"
                ? "bg-[rgba(28,213,174,.2)] text-[#38cab3] rounded pl-2"
                : "bg-[rgba(247,79,117,.2)] text-[#f74f75] rounded pl-2"
            }
          >
            {status}
          </p>
        );
      },
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: true }}
          ></Table>
        )}
      </header>
    </div>
  );
};

export default ReserveBusHistoryList;
