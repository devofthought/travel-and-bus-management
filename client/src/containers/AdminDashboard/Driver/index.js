import React from "react";
import DriverListTable from "./DriverList";
import { useGetAllDriverQuery } from "@/redux/driver/driverApi";

const DriverContainer = () => {
  const { data, isLoading } = useGetAllDriverQuery();
  return (
    <>
      <DriverListTable data={data?.data} loading={isLoading} />
    </>
  );
};

export default DriverContainer;
