import Link from "next/link";
import React from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center text-center items-center h-[100vh]">
      <div>
        <BsFillQuestionCircleFill color="#d84e55" size={120} />
        <h2 className="text-4xl font-semibold mt-3">Page Not Found</h2>
        <p className="my-2 text-lg font-medium">
          Oops! We couldn't find the page that you're looking for. <br /> Please
          check the address and try again.
        </p>
        <p className="primary-text">
          <span className="font-semibold">Error Code:</span> 404
        </p>
        <p className="mt-1">
          <Link href="/" className="underline">
            Return Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
