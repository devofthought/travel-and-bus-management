import React from "react";
import IncidentListTable from "./IncidentList";
import { useGetAllIncidentQuery } from "@/redux/incident/incidentApi";

const BusListContainer = () => {
  const { data } = useGetAllIncidentQuery();

  return (
    <>
      <IncidentListTable data={data?.data} />
    </>
  );
};

export default BusListContainer;
