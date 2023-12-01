import React from "react";
import PageTitle from "@/components/Shared/PageTitle";
import ForgetPasswordForm from "@/containers/ForgetPasswordForm";
import AuthForgetPassword from "@/layouts/AuthForgetPassword";

const ForgetPassword = () => {
  return (
    <>
      <PageTitle title={"forget-password"} />
      <h1 className="text-4xl text-center font-bold mb-6">Forget Password</h1>
      {/* <SocialLogin></SocialLogin> */}
      <ForgetPasswordForm></ForgetPasswordForm>
    </>
  );
};

export default ForgetPassword;

ForgetPassword.getLayout = function getLayout(page) {
  return <AuthForgetPassword>{page}</AuthForgetPassword>;
};
