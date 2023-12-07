import React from "react";
import ReserveBusHistoryList from "./ReserveBusHistoryList";
import { useGetAllReserveBusRequestQuery } from "@/redux/bus/busApi";

const ReserveHistoryListContainer = () => {
  const { data, isLoading } = useGetAllReserveBusRequestQuery({
    status: "approved",
  });
  return (
    <>
      <ReserveBusHistoryList data={data?.data} isLoading={isLoading} />
    </>
  );
};

export default ReserveHistoryListContainer;
