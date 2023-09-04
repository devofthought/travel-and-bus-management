import CollapseComponent from "@/components/UI/Collapse";

const FAQ = () => {
  return (
    <div className="main-container">
      <div className=" mb-10">
        <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">
          Frequently Asked Questions
        </h1>
        <div className="h-[2px] md:h-1 w-[160px] secondary-bg mx-auto mt-4"></div>
      </div>
      <CollapseComponent></CollapseComponent>
    </div>
  );
};

export default FAQ;
