import AuthLayout from "@/layouts/AuthLayout";
import SocialLogin from "@/components/Shared/SocialLogin";
import SignUpForm from "@/containers/SignupPage/SignupForm";

const SignUp = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-10">Register</h1>
      <SocialLogin></SocialLogin>
      <SignUpForm></SignUpForm>
    </>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
