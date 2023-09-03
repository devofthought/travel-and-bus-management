import { userRole } from "@/config/userRole";
import CreateDriverContainer from "@/containers/AdminDashboard/Driver/CreateDriver";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";

const CreateDriver = () => {
  return <>{"admin" === userRole.ADMIN && <CreateDriverContainer />}</>;
};

export default CreateDriver;

CreateDriver.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
