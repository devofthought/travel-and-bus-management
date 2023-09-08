import React from "react";
import UpdateTripTable from "./UpdateTripTable";
import CreateTripModal from "./CreateTripModal";
import { useGetAllUpdateAbleTripQuery } from "@/redux/trip/tripApi";

const UpdateTripContainer = () => {
  const { data } = useGetAllUpdateAbleTripQuery({
    status: "pending",
    statusTwo: "on-processing",
  });
  return (
    <>
      {/* <CreateTripModal /> */}
      <UpdateTripTable data={data?.data} />
    </>
  );
};

export default UpdateTripContainer;
