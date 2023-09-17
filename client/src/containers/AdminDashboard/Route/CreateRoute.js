import React from "react";
import CreateRouteForm from "./CreateRouteForm";

const CreateBus = () => {
  return (
    <div className="w-full md:w-[80%] lg:w-[50%] mx-auto text-center">
      <div className="">
        <h1 className="text-3xl font-semibold mb-10 font-ubuntu">Create A New Route</h1>
        <div className="border-2 border-solid border-gray-200 rounded-[5px] p-5">
          <CreateRouteForm />
        </div>
      </div>
    </div>
  );
};

export default CreateBus;
