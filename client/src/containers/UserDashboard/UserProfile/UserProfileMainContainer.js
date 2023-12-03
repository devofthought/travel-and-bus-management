import React from "react";
import ResetEmail from "./ResetEmail";
import UpdateProfile from "./UpdateProfile";
import ResetPassword from "./ResetPassword";
import CollapseComponent from "@/components/UI/Collapse";
import Profile from "./Profile";

const UserProfileMainContainer = ({ userProfile }) => {
  const GeneralFQA = (panelStyle) => [
    {
      key: "1",
      label: <h2 className="text-lg font-medium">Update Profile</h2>,
      children: <UpdateProfile userProfile={userProfile} />,
      style: panelStyle,
    },
    {
      key: "2",
      label: <h2 className="text-lg font-medium">Reset Password</h2>,
      children: <ResetPassword />,
      style: panelStyle,
    },
    {
      key: "3",
      label: <h2 className="text-lg font-medium">Reset Email</h2>,
      children: <ResetEmail userProfile={userProfile} />,
      style: panelStyle,
    },
  ];

  return (
    <>
      <Profile userProfile={userProfile} />
      <CollapseComponent data={GeneralFQA} />
    </>
  );
};

export default UserProfileMainContainer;

/* 
  <ResetEmail userProfile={userProfile} />
  <UpdateProfile userProfile={userProfile} />
  <ResetPassword />
  <CollapseComponent data={faqDataMap} />
*/
