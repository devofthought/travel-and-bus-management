import React from "react";
import RouteListTable from "./RouteList";
import { useGetAllRouteQuery } from "@/redux/route/routeApi";

const RouteListContainer = () => {
  const { data, isLoading } = useGetAllRouteQuery();
  return (
    <>
      <RouteListTable data={data?.data} isLoading={isLoading} />
    </>
  );
};

export default RouteListContainer;
