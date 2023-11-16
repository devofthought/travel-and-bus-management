import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MonthlyDailyTrip = () => {
  const options = {
    series: [
      {
        name: "bus",
        data: [31, 40, 28, 51, 402, 109, 100],
        color: "#faa307",
      },
      {
        name: "passenger",
        data: [110, 320, 455, 321, 321, 523, 431],
        color: "#d84e55",
      },
    ],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-20T01:30:00.000Z",
        "2018-09-21T02:30:00.000Z",
        "2018-09-22T03:30:00.000Z",
        "2018-09-23T04:30:00.000Z",
        "2018-09-24T05:30:00.000Z",
        "2018-09-25T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className="flex-1 border border-solid border-gray-300 shadow p-4 rounded-md mt-5">
      <h1 className="text-lg ml-4">Trip compare Bus vs Passenger</h1>
      <Chart
        options={options}
        series={options.series}
        type={options.chart.type}
        height={300}
      />
    </div>
  );
};

export default MonthlyDailyTrip;
