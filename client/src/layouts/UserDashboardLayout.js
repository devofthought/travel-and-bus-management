import Banner from "@/containers/Banner";
import { Segmented } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserDashboardLayout = ({ children }) => {
  const router = useRouter();
  const segmentOptions = ["My tour & trips", "Upcoming booking", "Reviews"];
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (selectedOption === "My tour & trips") {
      router.push("/user-dashboard/myTourAndTrip");
    } else if (selectedOption === "Upcoming booking") {
      router.push("/user-dashboard/upcomingBooking");
    } else if (selectedOption === "Reviews") {
      router.push("/user-dashboard/reviews");
    }
  }, [selectedOption]);

  return (
    <div className="h-screen z-50">
      <div className="w-2/3 mx-auto mt-20">
        <Segmented
          size="large"
          block
          options={segmentOptions}
          onChange={(value) => setSelectedOption(value)}
        />
        {children}
      </div>
    </div>
  );
};

export default UserDashboardLayout;
