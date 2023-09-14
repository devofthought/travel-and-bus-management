const BookingDetailsCard = (data) => {
  const {
    bus,
    journeyDate,
    journey,
    boardingPoint,
    droppingPoint,
    departureTime,
    seats,
    totalSeats,
  } = data.data;
  return (
    <div>
      <div className="secondary-bg p-5 rounded-lg">
        <h1 className="text-2xl font-semibold primary-text">
          Booking Details Onward:
        </h1>
        <div className="bg-white p-3 mt-3 rounded-lg">
          <div className="text-lg flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  Bus
                </span>
                <span className="flex-grow font-bold">: {bus}</span>
              </div>
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  Journey Date
                </span>
                <span className="flex-grow font-bold">: {journeyDate}</span>
              </div>
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  Journey
                </span>
                <span className="flex-grow font-bold">: {journey}</span>
              </div>
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  Boarding Point
                </span>
                <span className="flex-grow font-bold">: {boardingPoint}</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  Dropping Point
                </span>
                <span className="flex-grow font-bold">: {droppingPoint}</span>
              </div>
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  {" "}
                  Departure Time
                </span>
                <span className="flex-grow font-bold">: {departureTime}</span>
              </div>
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  Seats
                </span>
                <span className="flex-grow font-bold">
                  :{" "}
                  {seats.map((s) => (
                    <span key={s} className="mr-1">
                      {s},
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex mb-1">
                <span className="w-36 md:w-48 font-medium opacity-70 ">
                  Total Seats
                </span>
                <span className="flex-grow font-bold">: {totalSeats}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsCard;
