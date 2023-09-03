import React from "react";
import RouteListTable from "./RouteList";
import { useGetAllRouteQuery } from "@/redux/route/routeApi";

const RouteListContainer = () => {
  const { data } = useGetAllRouteQuery();
  return (
    <>
      <RouteListTable data={data?.data} />
    </>
  );
};

export default RouteListContainer;
