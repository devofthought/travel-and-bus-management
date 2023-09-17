const PassengerDetailsCard = (data) => {
  const { name, phone, email } = data.data;
  return (
    <div>
      <div className="secondary-bg p-5 rounded-lg">
        <h1 className="text-2xl font-semibold primary-text">
          Passenger Details :
        </h1>
        <div className="bg-white p-3 mt-3 rounded-lg">
          <div className="text-lg">
            <div className="flex mb-1">
              <span className="w-36 font-medium opacity-70 ">Name</span>
              <span className="flex-grow font-bold">: {name}</span>
            </div>
            <div className="flex mb-1">
              <span className="w-36 font-medium opacity-70 ">Phone</span>
              <span className="flex-grow font-bold">: {phone}</span>
            </div>
            <div className="flex mb-1">
              <span className="w-36 font-medium opacity-70 ">Email</span>
              <span className="flex-grow font-bold">: {email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsCard;
