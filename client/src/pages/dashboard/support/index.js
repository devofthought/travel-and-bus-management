import SupportList from "@/containers/AdminDashboard/Support/SupportList";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import { useGetSupportBackQuery } from "@/redux/feedback/feedbackApi";

const Support = () => {
  const { data, isLoading } = useGetSupportBackQuery();

  return <SupportList data={data?.data} isLoading={isLoading} />;
};

export default Support;

Support.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
