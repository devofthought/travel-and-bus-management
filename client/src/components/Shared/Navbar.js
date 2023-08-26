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
                width={300}
                height={300}
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
                  width={300}
                  height={300}
                />
              </Link>
            </li>
            <Button
              styles={`px-2 py-[2px] sm:px-3 sm:py-1 font-semibold border-2 rounded-lg ${
                stickyNav ? "border-blue-500 secondary-text" : "text-white"
              }`}
              linkclassName={`btn-text px-2`}
              btnName="Bus"
              href="/bus"
            />
            <Button
              styles={`px-2 py-[2px] sm:px-3 sm:py-1 font-semibold border-2 rounded-lg ${
                stickyNav ? "border-blue-500 secondary-text" : "text-white"
              }`}
              linkclassName={`btn-text px-2`}
              btnName="Reserve Bus"
              href="/reserve-bus"
            />
          </div>
          {/* Right side menu */}
          <div className="flex items-center gap-4">
            <Button
              styles={`px-2 py-[2px] md:px-3 md:py-1 font-semibold border-2 rounded-lg primary-bg text-white ${
                stickyNav ? "border-green-500" : ""
              }`}
              linkclassName={`btn-text px-2`}
              btnName="Login"
              href="/login"
            />
            <Image
              alt="avatar"
              onClick={() => setIsOpen(true)}
              className={`w-10 md:w-12 rounded-full border-2 border-green-500 p-[2px] bg-white`}
              src="https://i.ibb.co/nrtwzQd/avatar-boy.webp"
              decoding="async"
              loading="lazy"
              width={300}
              height={300}
            />
          </div>
          {/* Sidebar  */}
          <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
            <div className={`sidebar ${isOpen ? "" : "closeAnimation"}`}>
              <div className="sidebar__header">
                <div className="header__logoArea">
                  <Link href="/">
                    <Image
                      alt="avatar"
                      onClick={() => setIsOpen(true)}
                      className={`w-10 sm:w-12 rounded-full border-2 border-green-500 p-[2px] bg-white`}
                      src="https://i.ibb.co/Smm15yx/bus-vector.jpg"
                      decoding="async"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  </Link>
                </div>
                <div className="header__closeButton">
                  <button onClick={() => setIsOpen(false)} className="button">
                    <AiOutlineClose className="button-icon" />
                  </button>
                </div>
              </div>
              <div className="sidebar__body">
                <li className="body__menu">
                  <Link href="/bus">Bus</Link>
                </li>
                <li className="body__menu">
                  <Link href="/reserve-bus">Reserve Bus</Link>
                </li>
                {/* {myProfile?.email ? ( */}
                <li className="body__menu">
                  <Link href="#" onClick={() => handleSignOut()}>
                    Logout
                  </Link>
                </li>
                {/* ) : ( */}
                <li className="body__menu">
                  <Link href="/login">Login</Link>
                </li>
                {/* )} */}
              </div>
            </div>
            <div className="sidebar__backdrop"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
