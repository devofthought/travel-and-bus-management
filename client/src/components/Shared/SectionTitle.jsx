const SectionTitle = ({ title, mb }) => {
  return (
    <div className={mb ? `md:mb-${mb}` : "mb-6 md:mb-10"}>
      <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h1>
      <div className="h-[2px] md:h-1 w-[160px] bg-[#d84e55] mx-auto mt-[10px]"></div>
    </div>
  );
};

export default SectionTitle;
