import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const ReserveBus = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is Reserve Bus</h1>
        </>
      )}
    </>
  );
};

export default ReserveBus;

ReserveBus.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
