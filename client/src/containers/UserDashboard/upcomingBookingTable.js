import { Table } from "antd";
import React from "react";

const UpcomingBookingTable = ({ data }) => {
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Departure Time",
      dataIndex: "departure_time",
    },
    {
      title: "Arrival Time",
      dataIndex: "arrival_time",
    },
    {
      title: "Bus Code",
      dataIndex: "bus_code",
    },
    {
      title: "Distance",
      dataIndex: "distance",
    },
    {
      title: "Fare",
      dataIndex: "fare",
    },
    {
      title: "Seats",
      dataIndex: "seats",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
    },
  ];

  function createData(
    sr,
    from,
    to,
    departure_time,
    arrival_time,
    bus_code,
    distance,
    fare,
    seats,
    payment_status
  ) {
    return {
      sr,
      from,
      to,
      departure_time,
      arrival_time,
      bus_code,
      distance,
      fare,
      seats,
      payment_status,
    };
  }

  const rows =
    data &&
    data?.map((d, i) =>
      createData(
        i + 1,
        d?.from,
        d?.to,
        new Date(d.departure_time).toLocaleTimeString("en-BD", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        new Date(d.arrival_time).toLocaleTimeString("en-BD", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        d?.bus_code,
        d?.distance,
        d?.fare,
        d?.seats,
        d?.payment_status
      )
    );

  return <Table className="mt-5" columns={columns} dataSource={rows} />;
};

export default UpcomingBookingTable;
