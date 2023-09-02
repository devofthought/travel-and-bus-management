import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../UI/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  // const [myProfile, setMyProfile] = useState({});
  // const router = useRouter();
  // const statePath = router.query.state?.path;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // const path = statePath || "/login";
    // router.push(path);
    // removeFromLocalStorage("user-info");
    // removeFromLocalStorage("access-token");
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

  const handleScroll = () => {
    setStickyNav(window.pageYOffset > 5);
  };

  useEffect(() => {
    // fetchMyProfile();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-50 border-b-1 border-solid border-blue-200 z-999 fixed w-full top-0 ${
        stickyNav
          ? "sticky shadow-md border-b-0 sticky__body bg-white"
          : "bg-gradient-to-r from-green-500 to-blue-500"
      }`}
    >
      <div className="main-container">
        <div
          className={`navbar-wrapper__body  ${
            stickyNav ? "sticky__body" : ""
          } py-2 md:py-3`}
        >
          <div className="inherit md:hidden">
            <Link href="/">
              <Image
                alt="Logo"
                className="w-10 rounded-full border-2 border-blue-500"
                src="https://i.ibb.co/Smm15yx/bus-vector.jpg"
                decoding="async"
                loading="lazy"
                width={48}
                height={48}
              />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:w-fit md:gap-3">
            <li>
              <Link href="/">
                <Image
                  alt="Logo"
                  className="w-12 rounded-full border-2 border-blue-500"
                  src="https://i.ibb.co/Smm15yx/bus-vector.jpg"
                  decoding="async"
                  loading="lazy"
                  width={48}
                  height={48}
                />
              </Link>
            </li>
            <Link href="bus">
              <Button
                styles={`px-2 py-[2px] sm:px-3 sm:py-1 font-semibold border-2 rounded-lg ${
                  stickyNav ? "border-blue-500 secondary-text" : "text-white"
                }`}
                textStyle={`btn-text px-2`}
                btnName="Bus"
              />
            </Link>
            <Link href="/reserve-bus">
              <Button
                styles={`px-2 py-[2px] sm:px-3 sm:py-1 font-semibold border-2 rounded-lg ${
                  stickyNav ? "border-blue-500 secondary-text" : "text-white"
                }`}
                textStyle={`btn-text px-2`}
                btnName="Reserve Bus"
              />
            </Link>
          </div>
          {/* Right side menu */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                styles={`px-2 py-[2px] md:px-3 md:py-1 font-semibold border-2 rounded-lg primary-bg text-white ${
                  stickyNav ? "border-green-500" : ""
                }`}
                textStyle={`btn-text px-2`}
                btnName="Login"
              />
            </Link>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="border-gray-500 rounded-full flex items-center justify-center"
                  id="menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  <Image
                    alt="avatar"
                    className={`w-10 md:w-12 rounded-full border-2 border-green-500 p-[2px] bg-white`}
                    src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
                    decoding="async"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </button>
              </div>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <Link
                      href="/reserve-bus"
                      className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/bus"
                      className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Bus
                    </Link>
                    <Link
                      href="/reserve-bus"
                      className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Reserve Bus
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
