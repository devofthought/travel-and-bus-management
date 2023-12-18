import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Shared/Navbar";
import Image from "next/image";
import { useState } from "react";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(true);
  console.log(isDropdownOpen);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center min-h-screen py-16 auth-bg">
        <div className="relative  md:w-3/12 h-auto p-6 rounded-xl bg-slate-50 border-solid border-2 border-slate-900">
          <div className="absolute -top-32 md:-top-16 right-[41%] md:-right-16">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="border-gray-800 rounded-full flex items-center justify-center"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <Image
                  alt="avatar"
                  className={`w-10 h-10 rounded-full p-[2px] bg-white cursor-pointer`}
                  src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                  decoding="async"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className="absolute -left-[90px] md:left-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-green-500 ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1">
                  <div className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 text-base duration-300">
                    <h4>Admin</h4>
                    <p>Email: admin@gmail.com</p>
                    <p>Password: 123456</p>
                  </div>
                  <div className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 text-base duration-300">
                    <h4>Traveler</h4>
                    <p>Email: user@gmail.com</p>
                    <p>Password: 123456</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-200 flex p-2 items-center rounded mb-4">
            <div className="w-1/2 text-center  cursor-pointer ">
              <button
                className={`w-full  p-2 border-none rounded text-sm font-semibold ${
                  router.pathname === "/login"
                    ? "primary-bg shadow-md text-white"
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
                  router.pathname === "/register"
                    ? "primary-bg shadow-md text-white"
                    : "bg-gray-200"
                }`}
              >
                <Link
                  className={`${
                    router.pathname === "/register"
                      ? "text-white"
                      : "text-black"
                  }`}
                  href={"/register"}
                >
                  Register
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
