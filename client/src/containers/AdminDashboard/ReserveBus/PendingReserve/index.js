import React from "react";
import ReserveBusList from "./ReserveBusList";
import { useGetAllReserveBusRequestQuery } from "@/redux/bus/busApi";

const ReserveListContainer = () => {
  const { data, isLoading } = useGetAllReserveBusRequestQuery({
    status: "pending",
  });
  return (
    <>
      <ReserveBusList data={data?.data} isLoading={isLoading} />
    </>
  );
};

export default ReserveListContainer;
