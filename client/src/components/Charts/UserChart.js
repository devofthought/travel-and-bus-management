import Image from "next/image";
import MainChart from "./MainChart";

const UserChart = () => {
  const options = {
    chart: {
      type: "donut",
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#145998",
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
    dataLabels: {
      enabled: false,
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
    series: [484],
    labels: ["Users"],
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 border border-solid border-gray-300 p-4 rounded-md shadow">
      <div>
        <div className="flex justify-center items-center">
          <Image src={"/images/users.png"} height={100} width={100} />
        </div>
        <h1 className="text-xl text-center"> Registered Users</h1>
      </div>
      <MainChart options={options} />
    </div>
  );
};

export default UserChart;
