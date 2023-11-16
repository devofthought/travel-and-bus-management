import BusChart from "@/components/Charts/BusChart";
import DriversChart from "@/components/Charts/DriversChart";
import RoadChart from "@/components/Charts/RoadChart";
import SellChart from "@/components/Charts/SellChart";
import SellChartRightSide from "@/components/Charts/SellChartRightSide";
import UserChart from "@/components/Charts/UserChart";
import { userRole } from "@/config/userRole";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";

const Dashboard = () => {
  return (
    <>
      {"admin" === userRole.ADMIN && (
        <div className="max-w-5xl mx-auto w-[95%]">
          <div className="lg:main-container grid grid-cols-1 md:grid-cols-2 gap-5 justify-center ">
            <UserChart />
            <DriversChart />
            <BusChart />
            <RoadChart />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <SellChart />
            <SellChartRightSide />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
