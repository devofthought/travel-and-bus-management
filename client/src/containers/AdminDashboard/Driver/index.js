import React from "react";
import DriverListTable from "./DriverList";
import { useGetAllDriverQuery } from "@/redux/driver/driverApi";

const DriverContainer = () => {
  const { data } = useGetAllDriverQuery();
  return (
    <>
      <DriverListTable data={data?.data} />
    </>
  );
};

export default DriverContainer;
