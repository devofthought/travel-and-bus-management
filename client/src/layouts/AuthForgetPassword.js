import Navbar from "@/components/Shared/Navbar";

const AuthForgetPassword = ({ children }) => {

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center min-h-screen py-16 auth-bg">
        <div className=" md:w-3/12 h-auto p-6 rounded-xl bg-slate-50 border-solid border-2 border-slate-900">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthForgetPassword;
