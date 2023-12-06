import { userRole } from "@/config/userRole";
import SupportList from "@/containers/AdminDashboard/Support/SupportList";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import { useGetSupportBackQuery } from "@/redux/feedback/feedbackApi";
import React from "react";

const Support = () => {
  const { data } = useGetSupportBackQuery();

  return <>{"admin" === userRole.ADMIN && <SupportList data={data?.data} />}</>;
};

export default Support;

Support.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
