import AuthLayout from "@/layouts/AuthLayout";
// import SocialLogin from "@/components/Shared/SocialLogin";
import SignUpForm from "@/containers/SignupPage/SignupForm";
import PageTitle from "@/components/Shared/PageTitle";

const SignUp = () => {
  return (
    <>
      <PageTitle title={"Resister"} />
      <h1 className="text-4xl text-center font-bold mb-6">Register</h1>
      {/* <SocialLogin></SocialLogin> */}
      <SignUpForm></SignUpForm>
    </>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
