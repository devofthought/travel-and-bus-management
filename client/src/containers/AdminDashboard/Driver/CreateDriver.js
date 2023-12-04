import CreateDriverForm from "./CreateDriverFrom";

const CreateDriver = () => {
  return (
    <div className="w-full md:w-[80%] lg:w-[50%] mx-auto text-center">
      <h1 className="text-3xl font-bold mb-5 font-ubuntu">Create A Driver</h1>
      <div className="mb-10">
        <div className=" bg-white text-white p-5 border-2 border-solid border-gray-200  rounded ">
          <CreateDriverForm/>
        </div>
      </div>
    </div>
  );
};

export default CreateDriver;
