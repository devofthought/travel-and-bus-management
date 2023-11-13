import React from "react";
import CreateIncidentForm from "./CreateIncidentForm";

const CreateIncident = () => {
  return (
    <div className="w-full md:w-[80%] lg:w-[50%] mx-auto text-center">
      <div className="">
        <h1 className="text-3xl font-semibold mb-10 font-ubuntu">
          Create A Bus Incident
        </h1>
        <div className="border-2 border-solid border-gray-200 rounded-[5px] p-5">
          <CreateIncidentForm />
        </div>
      </div>
    </div>
  );
};

export default CreateIncident;
