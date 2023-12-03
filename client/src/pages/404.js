import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const NotFoundPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const redirectHome = () => {
      router.push("/");
    };

    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(countdownInterval);
      redirectHome();
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(countdownInterval);
    };
  }, [router]);
  return (
    <div className="flex justify-center text-center items-center h-[100vh]">
      <div>
        <BsFillQuestionCircleFill color="#d84e55" size={120} />
        <h2 className="text-4xl font-semibold mt-3">Page Not Found</h2>
        <p className="my-2 text-lg font-medium">
          Oops! We couldn't find the page that you're looking for. <br /> Please
          check the address and try again.
        </p>
        <p className="primary-text font-semibold text-xl">Error Code: 404</p>
        <p className="text-lg mb-4">
          Redirecting to home page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
