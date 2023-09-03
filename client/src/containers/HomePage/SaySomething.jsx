import Button from "@/components/UI/Button";
import { Input } from "antd";
import React from "react";

const SaySomething = () => {
  const { TextArea } = Input;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-container mt-10">
      <form
        className="border-[1px] shadow-lg hover:shadow-xl rounded px-4 sm:px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className=" mb-10">
          <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">
            Say Something
          </h1>
          <div className="h-[2px] md:h-1 w-[160px] secondary-bg mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Input className="h-14 text-lg" placeholder="Name" />
          </div>
          <div>
            <Input className="h-14 text-lg" placeholder="Email" />
          </div>
        </div>
        <div className="mt-5">
          <TextArea className="h-44 text-lg" placeholder="Your Words" />
        </div>
        <div className="w-44 mx-auto">
          <Button
            type="submit"
            styles="flex justify-center items-center border-none w-full h-12 secondary-bg text-center mt-5 rounded-lg text-lg text-white"
            btnName="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default SaySomething;
