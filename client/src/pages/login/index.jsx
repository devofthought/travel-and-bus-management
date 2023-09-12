import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import SocialLogin from "@/components/Shared/SocialLogin";
import LoginForm from "@/containers/LoginPage/LoginForm";

const Login = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-10">Log in</h1>
      <SocialLogin></SocialLogin>
      <LoginForm></LoginForm>
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
