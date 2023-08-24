import Button from "@/components/UI/Button";
import React from "react";

const SaySomething = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="main-container mt-10">
        <form
          className="border-[1px] shadow-lg hover:shadow-xl rounded px-4 sm:px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h1 className="primary-text text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold mb-7 text-center">
            Say Something
          </h1>
          <div className="mb-4 md:mb-5 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-5">
            <input
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              required
            />
            <input
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className="mb-4 md:mb-5">
            <textarea
              className="h-40 md:h-48 shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Your Words"
              name="message"
              rows="4"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              styles="w-full sm:w-60 md:w-80 primary-bg hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              btnName="Submit"
              href="/"
              linkClass="text-center"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SaySomething;
