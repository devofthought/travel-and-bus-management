import React from "react";
import IncidentListTable from "./IncidentList";
import { useGetAllIncidentQuery } from "@/redux/incident/incidentApi";

const BusListContainer = () => {
  const { data, isLoading } = useGetAllIncidentQuery();

  return (
    <>
      <IncidentListTable data={data?.data} isLoading={isLoading} />
    </>
  );
};

export default BusListContainer;
