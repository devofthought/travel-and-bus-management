import CollapseComponent from "@/components/UI/Collapse";

const FAQ = () => {
  return (
    <div className="main-container">
      <div className=" mb-10">
        <h1 className="font-bold text-center text-5xl">
          Frequently Asked Questions
        </h1>
        <div className="h-1 w-[200px] secondary-bg mx-auto mt-4"></div>
      </div>
      <CollapseComponent></CollapseComponent>
    </div>
  );
};

export default FAQ;
