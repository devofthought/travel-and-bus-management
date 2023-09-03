import React from "react";
import CreateDriverForm from "./CreateDriverFrom";

const CreateDriver = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Create A Driver</h1>
      <div className="mb-10">
        <div className="w-full md:w-1/3 bg-white text-white p-5 border-2 border-sky-500 rounded bg-slate-200">
          <CreateDriverForm />
        </div>
      </div>
    </>
  );
};

export default CreateDriver;
