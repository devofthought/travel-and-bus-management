import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import { openUserDashboard } from "@/redux/user/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboard = () => {
  return (
    <div>
      <UserDashboardLayout />
    </div>
  );
};

export default UserDashboard;
