import { useRouter } from "next/router";
import Link from "next/link";

const AuthLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-600">
      <div className="w-4/12 h-auto p-10 rounded-xl bg-slate-50 border-solid border-2 border-slate-900">
        <div className="bg-gray-200 flex p-2 items-center rounded mb-10">
          <div className="w-1/2 text-center  cursor-pointer ">
            <button
              className={`w-full  p-2 border-none rounded text-base font-semibold ${
                router.pathname === "/login"
                  ? "bg-white shadow-md"
                  : "bg-gray-200"
              }`}
            >
              <Link className="text-black" href={"/login"}>
                Log In
              </Link>
            </button>
          </div>
          <div className="w-1/2 text-center  cursor-pointer">
            <button
              className={`w-full  p-2 border-none rounded text-base font-semibold ${
                router.pathname === "/signup"
                  ? "bg-white shadow-md"
                  : "bg-gray-200"
              }`}
            >
              <Link className="text-black" href={"/signup"}>
                Sign Up
              </Link>
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
