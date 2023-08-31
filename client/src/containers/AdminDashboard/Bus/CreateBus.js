import React from "react";
import CreateBusForm from "./CreateBusForm";

const CreateBus = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Create A bus</h1>
      <div className="mb-10">
        <div className="w-full md:w-1/3 bg-white text-white p-5 border-2 border-sky-500 rounded bg-slate-200">
          <CreateBusForm />
        </div>
      </div>
    </>
  );
};

export default CreateBus;
