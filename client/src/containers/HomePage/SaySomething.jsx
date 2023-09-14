import Button from "@/components/UI/Button";
import { Input } from "antd";
import React from "react";

const SaySomething = () => {
  const { TextArea } = Input;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-container my-32 lg:my-36">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-14">
        <div className="w-full md:w-[50%] md:px-4">
          <h1 className="break-words font-montserrat font-semibold mb-4 text-4xl leading-7 text-gray-800">
            Let's stay connected
          </h1>
          <p className="text-gray-600 text-md mt-4 lg:mt-6 mb-8 lg:mb-10">
            We are always looking for new opportunities to work together. We are
            always looking for new opportunities to work together.
          </p>
          <form className="flex flex-col gap-6">
            <div className="flex justify-between gap-4">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              />
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              />
            </div>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
            />
            <div className="flex justify-between gap-4">
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              />
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              />
            </div>
            <textarea
              className="font-sans resize-y rounded-md w-full min-h-[150px] p-3 border-2 border-gray-400  text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              placeholder="Type Your Message"
            ></textarea>
            <Button
              styles="bg-[#d84e55] rounded-md font-semibold py-3 w-36 text-white flex justify-center items-center "
              btnName="SEND MESSAGE"
              textStyle=""
            />
          </form>
        </div>
        <div className="w-full md:w-[50%] flex flex-col justify-center gap-6 text-gray-800">
          <div className="py-6" style={{ borderBottom: "1px solid lightgray" }}>
            <div
              className="border-l-red-500 px-4"
              style={{ borderLeft: "4px solid" }}
            >
              <p>Email Us:</p>
              <h4 className="text-xl font-bold underline mt-2">
                Info@gmail.com
              </h4>
            </div>
          </div>
          <div className="py-6" style={{ borderBottom: "1px solid lightgray" }}>
            <div
              className="border-l-green-500 px-4"
              style={{ borderLeft: "4px solid" }}
            >
              <p>Call Us:</p>
              <h4 className="text-xl font-bold underline mt-2">
                (406) 555-0120
              </h4>
            </div>
          </div>
          <div className="py-6" style={{ borderBottom: "1px solid lightgray" }}>
            <div
              className="border-l-blue-500 px-4"
              style={{ borderLeft: "4px solid" }}
            >
              <p>Office Address:</p>
              <h4 className="text-xl font-bold mt-2">
                1901 Thornridge Cir, Shiloh, Hawaii 81063
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaySomething;
