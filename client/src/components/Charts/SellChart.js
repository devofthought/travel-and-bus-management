import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SellChart = () => {
  const options = {
    chart: {
      type: "area",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    series: [
      {
        name: "Sales",
        data: [120, 135, 125, 170, 164, 198, 220, 215, 230, 250, 310, 315],
      },
    ],
  };

  return (
    <div className="flex-1 border border-solid border-gray-300 shadow p-4 rounded-md mt-5">
      <h1 className="text-lg ml-4">Revenue Overview</h1>
      <Chart
        options={options}
        series={options.series}
        type={options.chart.type}
        height={300}
      />
    </div>
  );
};

export default SellChart;
