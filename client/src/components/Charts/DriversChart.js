import Image from "next/image";
import MainChart from "./MainChart";

const DriversChart = () => {
  const options = {
    theme: {
      monochrome: {
        enabled: true,
        color: "#4CAF4E",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
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
    dataLabels: {
      enabled: false,
    },
    series: [26, 22],
    labels: ["Drivers", "Conductor"],
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 border border-solid border-gray-300 p-4 rounded-md shadow">
      <div>
        <div className="flex justify-center items-center">
          <Image src={"/images/driver.png"} height={100} width={100} />
        </div>
        <h1 className="text-xl text-center"> Registered Drivers</h1>
      </div>
      <MainChart options={options} />
    </div>
  );
};

export default DriversChart;