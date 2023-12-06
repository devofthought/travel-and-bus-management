import React from "react";
import UpdateTripTable from "./UpdateTripTable";
import { useGetAllUpdateAbleTripQuery } from "@/redux/trip/tripApi";

const UpdateTripContainer = () => {
  const { data, isLoading } = useGetAllUpdateAbleTripQuery({
    limit: 10,
    page: 1,
  });
  return (
    <>
      <UpdateTripTable data={data?.data} isLoading={isLoading} />
    </>
  );
};

export default UpdateTripContainer;
