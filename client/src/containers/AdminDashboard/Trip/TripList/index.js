"use client";
import Spinner from "@/components/Shared/Spinner";
import { useGetAllTripQuery } from "@/redux/trip/tripApi";
import { Table, Typography } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const TripListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);

  const { data, isLoading } = useGetAllTripQuery({
    limit: currentLimit,
    page: currentPage,
    trips_status: "pending",
  });

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
      title: "Bus Code",
      dataIndex: "bus_code",
      minWidth: 200,
    },
    {
      title: "Driver Code",
      dataIndex: "driver_code",
      minWidth: 200,
    },
    {
      title: "From",
      dataIndex: "from",
      minWidth: 200,
      render: (from) => {
        return <span className="capitalize">{from}</span>;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      minWidth: 200,
      render: (from) => {
        return <span className="capitalize">{from}</span>;
      },
    },
    {
      title: "Distance",
      dataIndex: "distance",
      minWidth: 200,
      sorter: (a, b) => a.distance - b.distance,
      render: (distance) => {
        return <p className="lowercase">{distance} Km</p>;
      },
    },
    {
      title: "Dept. Date",
      dataIndex: "departure_time",
      minWidth: 200,
      sorter: (a, b) => a.departure_time - b.departure_time,
      render: (departure_time) => {
        return <span>{dayjs(departure_time).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "Dept. Time",
      dataIndex: "departure_time",
      minWidth: 200,
      sorter: (a, b) => a.departure_time - b.departure_time,
      render: (departure_time) => {
        return <span>{dayjs(departure_time).format("hh:mm A")}</span>;
      },
    },
    {
      title: "Arr. Time",
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
      title: "Fare",
      dataIndex: "fare",
      minWidth: 200,
      render: (fare) => {
        return <p>${fare}</p>;
      },
    },
    {
      title: "Trip status",
      dataIndex: "trips_status",
      minWidth: 200,
      render: (trips_status) => {
        return (
          <p
            className={
              trips_status === "pending"
                ? "bg-[rgba(255,189,90,.2)] text-[#ffc107] rounded pl-2"
                : trips_status === "on-processing"
                ? "bg-[rgba(28,213,174,.2)] text-[#38cab3] rounded pl-2"
                : "bg-[rgba(247,79,117,.2)] text-[#f74f75] rounded pl-2"
            }
          >
            {trips_status}
          </p>
        );
      },
    },
  ];
  return (
    <span className="block w-full">
      <Typography.Title level={4}>Today Total Trip</Typography.Title>
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{
          current: currentPage,
          pageSize: currentLimit,
          total: data?.meta?.total,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setCurrentLimit(pageSize);
          },
        }}
        scroll={{ x: true }}
        loading={isLoading && { indicator: <Spinner /> }}
      ></Table>
    </span>
  );
};
export default TripListContainer;
