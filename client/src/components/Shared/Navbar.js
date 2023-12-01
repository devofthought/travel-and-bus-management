import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../UI/Button";
import {
  removeFromLocalStorage,
} from "@/utils/localStorage";
import dynamic from "next/dynamic";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter()
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const decodedToken = jwt.decode(accessToken);
  // console.log(decodedToken);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  // const getUser=getFromLocalStorage('dhruto-travel-credential')

  const handleSignOut = () => {
    // const path = statePath || "/login";
    // router.push(path);
    // removeFromLocalStorage("user-info");
    removeFromLocalStorage("accessToken");
    router.reload("/");
    // toast.success("Successfully Signed Out!");
    // setMyProfile({});
  };

  // const fetchMyProfile = async () => {
  //   const accessToken = getFromLocalStorage("access-token");
  //   if (accessToken) {
  //     try {
  //       const url =
  //         "https://test-yourself-server.vercel.app/api/v1/users/my-profile";
  //       const options = {
  //         headers: {
  //           authorization: accessToken,
  //         },
  //       };
  //       const res = await fetch(url, options);
  //       const data = await res.json();
  //       setMyProfile(data?.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  // };

  return (
    <div
      className={`z-50 z-999 w-full top-0 sticky shadow-sm border-b-0 duration-700 ease-in-out  backdrop-blur-xl opacity-70"
      }`}
    >
      <div className="main-container">
        <div
          className={`navbar-wrapper__body flex flex-row items-center justify-between text-white h-full  py-2 md:py-3`}
        >
          <div className="inherit md:hidden">
            {" "}
            {/* for small screen left side*/}
            <Link href="/">
              <Image
                alt="Logo"
                className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-white"
                src="/images/logo.png"
                decoding="async"
                loading="lazy"
                width={200}
                height={200}
              />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:w-fit md:gap-3">
            {" "}
            {/* for large screen left side*/}
            <li>
              <Link href="/">
                <Image
                  alt="Logo"
                  className="w-10 md:w-14 h-10 md:h-14 rounded-full bg-white"
                  src="/images/logo.png"
                  decoding="async"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </Link>
            </li>
            <Link
              href="/#reserveBus"
              className="hover:bg-[#f0f0f0] rounded-lg duration-500"
            >
              <Button btnName="Reserve Bus" styles="py-2 px-3"></Button>
            </Link>
            <Link href="/blog">
              <Button btnName="Blogs" styles="py-2 px-3"></Button>
            </Link>
          </div>
          {/* Right side menu */}
          <div className="flex items-center gap-4">
            {decodedToken &&
            ["admin", "driver", "traveler"].includes(decodedToken.role) ? (
              <div className="relative inline-block text-left">
                <div>
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
                      src="https://i.ibb.co/nrtwzQd/avatar-boy.webp" /* // TODO: user image set here  */
                      decoding="async"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-green-500 ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      {decodedToken?.role === "admin" && (
                        <Link
                          href="/dashboard"
                          className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 text-base duration-300"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          Dashboard
                        </Link>
                      )}
                      {decodedToken?.role === "traveler" && (
                        <Link
                          href="/user-dashboard"
                          className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 text-base duration-300"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          User Dashboard
                        </Link>
                      )}
                      {/* // TODO: driver dashboard will be add there */}
                      <Link
                        href="/blog"
                        className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 text-base duration-300"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Blogs
                      </Link>
                      <Link
                        href="/#reserveBus"
                        className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 text-base duration-300"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Reserve Bus
                      </Link>
                      {!!decodedToken?.role && (
                        <Link
                          href="#"
                          className="text-gray-600 hover:bg-[#f3f4f9] block px-4 py-2 text-base duration-300"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                          onClick={() => handleSignOut()}
                        >
                          Sign out
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button btnName="Login / Register" styles="py-2 px-3"></Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Navbar;
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
