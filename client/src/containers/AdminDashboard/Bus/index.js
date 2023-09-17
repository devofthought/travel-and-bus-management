import React from "react";
import BusListTable from "./BusList";
import { useGetAllBusQuery } from "@/redux/bus/busApi";

const BusListContainer = () => {
  const { data } = useGetAllBusQuery();
  return (
    <>
      <BusListTable data={data?.data} />
    </>
  );
};

export default BusListContainer;
