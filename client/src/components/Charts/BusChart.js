import Image from "next/image";
import MainChart from "./MainChart";

const BusChart = () => {
  const options = {
    chart: {
      type: "donut",
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#faa307",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            position: "top",
            total: {
              show: true,
              showAlways: true,
              fontSize: 18,
              fontWeight: "bold",
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 240,
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    series: [18],
    labels: ["Buses"],
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 border border-solid border-gray-300 p-4 rounded-md shadow">
      <div>
        <div className="flex justify-center items-center">
          <Image src={"/images/bus.png"} height={100} width={100} />
        </div>
        <h1 className="text-xl text-center">Registered Buses</h1>
      </div>
      <MainChart options={options} />
    </div>
  );
};

export default BusChart;
