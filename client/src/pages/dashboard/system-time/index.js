import SystemTime from "@/containers/AdminDashboard/SystemTime";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";

const Support = () => {
  return <SystemTime />;
};

export default Support;

Support.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
