import { Table } from "antd";
import dayjs from "dayjs";
import { useGetAllCompletedAndUpcomingTripForUserQuery } from "@/redux/trip/tripApi";
import Spinner from "@/components/Shared/Spinner";

const IncompleteTourAndBooking = () => {
  const {
    data: UpcomingTrip,
    error,
    isLoading,
  } = useGetAllCompletedAndUpcomingTripForUserQuery({
    trip_status: "pending",
  });

  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      minWidth: 200,
      render: (_text, _record, index) => {
        return `${index + 1}`;
      },
    },
    {
      title: "From",
      dataIndex: "from",
      minWidth: 200,
      render: (from) => {
        return <span className="capitalize">{from}</span>;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      minWidth: 200,
      render: (from) => {
        return <span className="capitalize">{from}</span>;
      },
    },
    {
      title: "Distance",
      dataIndex: "distance",
      minWidth: 200,
      sorter: (a, b) => a.distance - b.distance,
      render: (distance) => {
        return <p className="lowercase">{distance} Km</p>;
      },
    },
    {
      title: "Dept. Time",
      dataIndex: "departure_time",
      minWidth: 200,
      sorter: (a, b) => a.departure_time - b.departure_time,
      render: (departure_time) => {
        return (
          <>
            <p>{dayjs(departure_time).format("YYYY-MM-DD")}</p>
            <p>{dayjs(departure_time).format("hh:mm A")}</p>
          </>
        );
      },
    },
    {
      title: "Arr. Time",
      dataIndex: "arrival_time",
      minWidth: 200,
      sorter: (a, b) => a.arrival_time - b.arrival_time,
      render: (arrival_time) => {
        return (
          <>
            <p>{dayjs(arrival_time).format("YYYY-MM-DD")}</p>
            <p>{dayjs(arrival_time).format("hh:mm A")}</p>
          </>
        );
      },
    },
    {
      title: "Fare",
      dataIndex: "fare",
      minWidth: 200,
      render: (fare) => {
        return <p>&#2547;{fare}</p>;
      },
    },
    {
      title: "Seats",
      dataIndex: "seats",
    },
    {
      title: "Bus Code",
      dataIndex: "bus_code",
    },
    // {
    //   title: "Payment Status",
    //   dataIndex: "payment_status",
    // },
    // {
    //   title: "Pay Now",
    //   dataIndex: "pay_now",
    // },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="responsive-table-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <Table
              columns={columns}
              dataSource={UpcomingTrip?.data}
              pagination={{
                pageSize: 5,
              }}
              scroll={{ x: true }}
            ></Table>
          )}
        </div>
      </header>
    </div>
  );
};
export default IncompleteTourAndBooking;
