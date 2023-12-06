import React from "react";
import ReserveBusHistoryList from "./ReserveBusHistoryList";
import { useGetAllReserveBusRequestQuery } from "@/redux/bus/busApi";

const ReserveHistoryListContainer = () => {
  const { data } = useGetAllReserveBusRequestQuery({ status: "approved" });
  return (
    <>
      <ReserveBusHistoryList data={data?.data} />
    </>
  );
};

export default ReserveHistoryListContainer;
