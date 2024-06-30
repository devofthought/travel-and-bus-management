import { Progress } from "antd";

const SellChartRightSide = () => {
  return (
    <div className="max-w-60 flex gap-4 flex-wrap">
      <div className="border border-solid border-gray-300 shadow p-3 rounded-md mt-5 text-center">
        <h1 className="text-3xl">6800+</h1>
        <h1 className="text-lg ml-4">Kilometer Reach</h1>
        <Progress
          className="mb-0"
          percent={75}
          showInfo={false}
          strokeColor={"#d84e55"}
        />
      </div>{" "}
      <div className="border border-solid border-gray-300 shadow p-3 rounded-md mt-5 text-center">
        <h1 className="text-3xl">160+</h1>
        <h1 className="text-lg ml-4">Trip Complete</h1>
        <Progress
          className="mb-0"
          percent={70}
          showInfo={false}
          strokeColor={"#FAE659"}
        />
      </div>{" "}
      <div className="border border-solid border-gray-300 shadow p-3 rounded-md mt-5 text-center">
        <h1 className="text-3xl">12000+</h1>
        <h1 className="text-lg ml-4">Happy Customers</h1>
        <Progress
          className="mb-0"
          percent={80}
          showInfo={false}
          strokeColor={"#4CAF4E"}
        />
      </div>
    </div>
  );
};

export default SellChartRightSide;
