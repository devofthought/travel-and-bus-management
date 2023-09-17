const SectionTitle = ({ title, mb }) => {
  return (
    <div className={mb ? `lg:mb-20` : "mb-6 md:mb-10"}>
      <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h1>
      <div className="h-[2px] md:h-1 w-[160px] primary-bg mx-auto mt-[10px]"></div>
    </div>
  );
};

export default SectionTitle;
