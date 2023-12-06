import { Form, Button, Select, InputNumber, DatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetAllRouteQuery } from "@/redux/route/routeApi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetAllAvailabilityBusQuery } from "@/redux/bus/busApi";
import { BsBusFront } from "react-icons/bs";
import { useGetAllAvailabilityDriverQuery } from "@/redux/driver/driverApi";
import { BiTrip, BiUser } from "react-icons/bi";
import { useUpdateTripMutation } from "@/redux/trip/tripApi";
import Swal from "sweetalert2";

const initialData = {
  route_code: "",
  bus_code: "",
  departure_time: "",
  arrival_time: "",
  driver_id: "",
  route_code: "",
  ticket_price: 0,
};

const preDefineTripsStatus = [
  { trips_status: "pending" },
  { trips_status: "completed" },
  { trips_status: "on-processing" },
];

const UpdateTripForm = ({ editingTrip, resetEditing }) => {
  // console.log(editingTrip);
  editingTrip.arrival_time = dayjs(
    editingTrip?.arrival_time,
    "YYYY-MM-DDTHH:mm:ss.sss"
  );
  editingTrip.departure_time = dayjs(
    editingTrip?.departure_time,
    "YYYY-MM-DDTHH:mm:ss.sss"
  );

  const { data: routeData, isLoading: routeIsLoading } = useGetAllRouteQuery();
  const { data: driveData, isLoading: driverIsLoading } =
    useGetAllAvailabilityDriverQuery("ready");
  const { data: busData, isLoading: busIsLoading } =
    useGetAllAvailabilityBusQuery("standBy");

  // trip update api....

  const [
    updateTrip,
    { data: updateResponse, error: updateError, isLoading: updateIsLoading },
  ] = useUpdateTripMutation();

  const handleChange = async (changedValues) => {
    // console.log("Changed values:", changedValues);
    if (changedValues?.departure_time) {
      const departureDateTime = dayjs(changedValues?.departure_time).format(
        "YYYY-MM-DDTHH:mm:ss.sss"
      );
      await updateTrip({
        trip_id: editingTrip?._id,
        body: {
          ...changedValues,
          departure_time: departureDateTime,
        },
      });
    } else if (changedValues?.arrival_time) {
      const arrivalDateTime = dayjs(changedValues?.arrival_time).format(
        "YYYY-MM-DDTHH:mm:ss.sss"
      );
      await updateTrip({
        trip_id: editingTrip?._id,
        body: {
          ...changedValues,
          arrival_time: arrivalDateTime,
        },
      });
    } else if (changedValues?.ticket_price) {
      await updateTrip({
        trip_id: editingTrip?._id,
        body: {
          ...changedValues,
          ticket_price: parseInt(changedValues?.ticket_price),
        },
      });
    } else {
      console.log(changedValues);
      await updateTrip({
        trip_id: editingTrip?._id,
        body: {
          ...changedValues,
        },
      });
    }
  };

  useEffect(() => {
    if (updateResponse?.statusCode === 200) {
      form.setFieldsValue(initialData);
      resetEditing();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updateResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (
      updateError?.status === 400 ||
      updateError?.status === 406 ||
      updateError?.status === 403
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${updateError?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [updateResponse, updateError]);

  const [form] = Form.useForm();
  form.setFieldsValue(editingTrip);

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
        onValuesChange={handleChange} // Handle form field changes here
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
            showTime
            format="YYYY-MM-DD hh:mm:ss A"
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
            showTime
            format="YYYY-MM-DD hh:mm:ss A"
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

        <Form.Item name="trips_status" label="Status" requiredMark="require">
          <Select placeholder="Select trips status">
            {preDefineTripsStatus?.map((ts, index) => (
              <Select.Option key={index} value={`${ts?.trips_status}`}>
                <span className="ps-2 pe-2">{ts?.trips_status}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateTripForm;
