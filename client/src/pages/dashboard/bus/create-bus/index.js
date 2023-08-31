import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CreateBus = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <>
          <h1>this is create bus</h1>
        </>
      )}
    </>
  );
};

export default CreateBus;

CreateBus.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
