import React from "react";
import BusListTable from "./BusList";
import { useGetAllBusQuery } from "@/redux/bus/busApi";

const BusListContainer = () => {
  const { data, isLoading } = useGetAllBusQuery();
  return (
    <>
      <BusListTable data={data?.data} isLoading={isLoading} />
    </>
  );
};

export default BusListContainer;
