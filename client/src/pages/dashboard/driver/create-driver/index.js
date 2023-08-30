import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CreateDriver = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is create trip</h1>
        </>
      )}
    </>
  );
};

export default CreateDriver;

CreateDriver.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
