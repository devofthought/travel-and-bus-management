import PageTitle from "@/components/Shared/PageTitle";
import RootLayout from "@/layouts/RootLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
// import withAuth from "@/utils/withAuth";
// import dynamic from "next/dynamic";

const UserDashboard = () => {
  return (
    <div>
      <PageTitle title={"User Dashboard"} />
      <UserDashboardLayout />
    </div>
  );
};

export default UserDashboard;
// export default withAuth(UserDashboard, ["traveler"]);
// export default dynamic(() => Promise.resolve(withAuth(UserDashboard, ["traveler"])), { ssr: true });

UserDashboard.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
