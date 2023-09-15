import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Shared/Navbar";

const AuthLayout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center min-h-screen py-16 auth-bg">
        <div className=" md:w-3/12 h-auto p-6 rounded-xl bg-slate-50 border-solid border-2 border-slate-900">
          <div className="bg-gray-200 flex p-2 items-center rounded mb-4">
            <div className="w-1/2 text-center  cursor-pointer ">
              <button
                className={`w-full  p-2 border-none rounded text-sm font-semibold ${
                  router.pathname === "/login"
                    ? "red-bg shadow-md text-white"
                    : "bg-gray-200"
                }`}
              >
                <Link
                  className={`${
                    router.pathname === "/login" ? "text-white" : "text-black"
                  }`}
                  href={"/login"}
                >
                  Log In
                </Link>
              </button>
            </div>
            <div className="w-1/2 text-center  cursor-pointer">
              <button
                className={`w-full  p-2 border-none rounded text-sm font-semibold ${
                  router.pathname === "/signup"
                    ? "red-bg shadow-md text-white"
                    : "bg-gray-200"
                }`}
              >
                <Link
                  className={`${
                    router.pathname === "/signup" ? "text-white" : "text-black"
                  }`}
                  href={"/signup"}
                >
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
