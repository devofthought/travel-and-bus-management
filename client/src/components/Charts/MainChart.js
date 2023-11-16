import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MainChart = ({ options, width, height }) => {
  return (
    <>
      <Chart
        options={options}
        series={options.series}
        type={options.chart.type}
        width={width ? width : "280"}
        height={height}
      />
    </>
  );
};

export default MainChart;
