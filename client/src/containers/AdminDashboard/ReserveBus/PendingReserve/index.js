import React from "react";
import ReserveBusList from "./ReserveBusList";
import { useGetAllReserveBusRequestQuery } from "@/redux/bus/busApi";

const ReserveListContainer = () => {
  const { data } = useGetAllReserveBusRequestQuery({ status: "pending" });
  return (
    <>
      <ReserveBusList data={data?.data} />
    </>
  );
};

export default ReserveListContainer;
