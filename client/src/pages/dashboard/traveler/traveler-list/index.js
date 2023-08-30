import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const TravelerList = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is traveler list</h1>
        </>
      )}
    </>
  );
};

export default TravelerList;

TravelerList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
