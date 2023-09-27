import { Form, Button, Select, InputNumber, DatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetAllRouteQuery } from "@/redux/route/routeApi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAddForGetRequestAvailableBusMutation } from "@/redux/bus/busApi";
import { BsBusFront } from "react-icons/bs";
import { useAddForGetRequestAvailableDriverMutation } from "@/redux/driver/driverApi";
import { BiTrip, BiUser } from "react-icons/bi";
import { useAddTripMutation } from "@/redux/trip/tripApi";
import Swal from "sweetalert2";
import MainButton from "@/components/UI/Button";

const initialData = {
  route_code: "",
  bus_code: "",
  departure_time: "",
  arrival_time: "",
  driver_id: "",
  route_code: "",
  ticket_price: 0,
};

const CreateTripForm = () => {
  const { data: routeData, isLoading: routeIsLoading } = useGetAllRouteQuery();

  // const { data: driveData, isLoading: driverIsLoading } = useGetAllAvailabilityDriverQuery("ready");

  const [
    AddReqForDriverAvailability,
    { data: driveData, isLoading: driverIsLoading, error: driverError },
  ] = useAddForGetRequestAvailableDriverMutation();

  const [
    AddReqForBusAvailability,
    { data: busData, isLoading: busIsLoading, error: busError },
  ] = useAddForGetRequestAvailableBusMutation();

  const [
    AddTrip,
    { data: addResponse, error: addError, isLoading: addIsLoading },
  ] = useAddTripMutation();

  const onFinish = (values) => {
    // Convert date and time to a single date-time format
    const departureDateTime = dayjs(values.departure_time).format(
      "YYYY-MM-DDTHH:mm:ss.sss"
    );
    // Update values with the formatted date time values
    const arrivalDateTime = dayjs(values.arrival_time).format(
      "YYYY-MM-DDTHH:mm:ss.sss"
    );

    AddTrip({
      ...values,
      trips_status: "pending",
      departure_time: departureDateTime,
      arrival_time: arrivalDateTime,
    });
  };

  const handleValuesChange = (changedValues) => {
    console.log("Changed Values:", changedValues);
    if (changedValues.hasOwnProperty("departure_time")) {
      const departureDateTime = dayjs(changedValues.departure_time).format(
        "YYYY-MM-DDTHH:mm:ss.sss"
      );
      AddReqForBusAvailability({
        departure_time: departureDateTime,
      });
      AddReqForDriverAvailability({
        departure_time: departureDateTime,
      });
    }
  };

  useEffect(() => {
    if (addResponse?.success) {
      form.setFieldsValue(initialData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${addResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${addError?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [addResponse, addError]);

  const [form] = Form.useForm();
  form.setFieldsValue(initialData);
  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item name="route_code" label="Route code" requiredMark="require">
          <Select placeholder="Select trip route code">
            {routeData?.data?.map((rt, index) => (
              <Select.Option key={rt._id} value={`${rt?.route_code}`}>
                <span className="flex items-center">
                  <span className="ps-2 pe-2">
                    <BiTrip />
                  </span>
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
          <DatePicker
            className="w-full "
            showTime
            placeholder="Select Departure Date"
          />
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
          <DatePicker
            className="w-full"
            showTime
            placeholder="Select Arrival Date"
          />
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
                    <BiUser />
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
            className="w-full"
            placeholder="Type trip fare"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          {/* <Button
            disabled={addIsLoading ? true : false}
            block
            type="primary"
            htmlType="submit"
          >
            {addIsLoading ? "Loading..." : "Submit"}
          </Button> */}
          <MainButton btnName="Submit" styles="w-full py-3"></MainButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTripForm;
