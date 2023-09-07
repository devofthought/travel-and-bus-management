import { Form, Button, Select, InputNumber, DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetAllRouteQuery } from "@/redux/route/routeApi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetAllAvailabilityBusQuery } from "@/redux/bus/busApi";
import { BsBusFront } from "react-icons/bs";
import { useGetAllAvailabilityDriverQuery } from "@/redux/driver/driverApi";

const CreateTripForm = () => {
  const [data, setData] = useState([]);
  const { data: routeData, isLoading: routeIsLoading } = useGetAllRouteQuery();
  const { data: driveData, isLoading: driverIsLoading } =
    useGetAllAvailabilityDriverQuery("ready");
  const { data: busData, isLoading: busIsLoading } =
    useGetAllAvailabilityBusQuery("standBy");
  const onFinish = (values) => {
    // Convert date and time to a single datetime format
    const departureDateTime = dayjs(values.departure_time).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const arrivalDateTime = dayjs(values.arrival_time).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    // Update values with the formatted datetime values
    setData({
      ...values,
      departure_time: departureDateTime,
      arrival_time: arrivalDateTime,
    });
  };

  // console.log(routeData?.data);
  // console.log(busData?.data);
  // console.log(driveData?.data);

  console.log(data);
  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <Form
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item name="route_code" label="Route code" requiredMark="require">
          <Select placeholder="Select trip route code">
            {routeData?.data?.map((rt, index) => (
              <Select.Option key={rt._id} value={`${rt?.route_code}`}>
                <span className="flex items-center">
                  {rt?.from}
                  <span className="ps-3 pe-3">
                    <AiOutlineArrowRight />
                  </span>
                  {rt.to}
                </span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Departure Time"
          name="departure_time"
          rules={[
            {
              required: true,
              message: "Please enter Departure Time",
            },
          ]}
        >
          <DatePicker showTime placeholder="Select Departure Date" />
        </Form.Item>

        <Form.Item
          label="Arrival Time"
          name="arrival_time"
          rules={[
            {
              required: true,
              message: "Please enter Arrival Time",
            },
          ]}
        >
          <DatePicker showTime placeholder="Select Arrival Date" />
        </Form.Item>

        <Form.Item name="bus_code" label="Bus code" requiredMark="require">
          <Select placeholder="Select trip bus code">
            {busData?.data?.map((bs) => (
              <Select.Option key={bs._id} value={`${bs?.bus_code}`}>
                <span className="flex items-center">
                  <span className="ps-2 pe-2">
                    <BsBusFront />
                  </span>
                  <span className="ps-2 pe-2 capitalize">{bs?.brand_name}</span>
                  <span className="ps-2 pe-2">{bs?.model}</span>
                  <span className="ps-2 pe-2">{bs?.bus_code}</span>
                </span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="driver_id" label="Driver" requiredMark="require">
          <Select placeholder="Select trip Driver">
            {driveData?.data?.map((bs) => (
              <Select.Option key={bs._id} value={`${bs?._id}`}>
                <span className="flex items-center">
                  <span className="ps-2 pe-2">
                    <BsBusFront />
                  </span>
                  <span className="ps-2 pe-2 capitalize">{bs?.name}</span>
                  <span className="ps-2 pe-2">{bs?.email}</span>
                  <span className="ps-2 pe-2">{bs?.age} Years</span>
                </span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ticket_price"
          label="Fare Price"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              message: "Please enter trip fare",
              min: 0,
              max: 10000,
            },
          ]}
        >
          <InputNumber
            formatter={(values) =>
              `৳ ${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Type trip fare"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTripForm;
