import CollapseComponent from "@/components/UI/Collapse";

const FAQ = () => {
  return (
    <div className="container w-11/12 m-auto">
      <h1 className="font-bold text-center text-4xl secondary-text mb-10">
        Frequently Asked Questions
      </h1>
      <CollapseComponent></CollapseComponent>
    </div>
  );
};

export default FAQ;
