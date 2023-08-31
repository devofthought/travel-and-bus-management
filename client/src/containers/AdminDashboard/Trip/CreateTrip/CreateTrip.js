import { useState } from "react";
import DriverTable from "./DriverTable";
import BusTable from "./BusTable";
import RouteTable from "./RouteTable";
import CreateTripForm from "./CreateForm";

const CreateTripContainer = () => {
  const [data, setData] = useState([]);
  console.log(data);
  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Create A Trip</h1>
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="w-full md:w-1/3 bg-white text-white p-5 border-2 border-sky-500 rounded bg-slate-200">
          <CreateTripForm />
        </div>
        <DriverTable />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <BusTable />
        <RouteTable />
      </div>
    </>
  );
};

export default CreateTripContainer;
