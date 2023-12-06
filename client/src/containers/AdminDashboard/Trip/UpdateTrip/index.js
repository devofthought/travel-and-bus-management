import React from "react";
import UpdateTripTable from "./UpdateTripTable";
import { useGetAllUpdateAbleTripQuery } from "@/redux/trip/tripApi";

const UpdateTripContainer = () => {
  const { data } = useGetAllUpdateAbleTripQuery({ limit: 10, page: 1 });
  return (
    <>
      <UpdateTripTable data={data?.data} />
    </>
  );
};

export default UpdateTripContainer;
