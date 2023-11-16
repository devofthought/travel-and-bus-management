import NextTopLoader from "nextjs-toploader";
const TopLoader = () => {
  return (
    <NextTopLoader
      color="#d84e55"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #cc232c,0 0 5px #d84e55"
      zIndex={1600}
    />
  );
};
export default TopLoader;
