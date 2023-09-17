import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <h2 className="text-3xl font-bold text-red-500">404 Not Found</h2>
    </div>
  );
};

export default NotFoundPage;

NotFoundPage.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
