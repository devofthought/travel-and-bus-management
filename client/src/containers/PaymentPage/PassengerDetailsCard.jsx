const PassengerDetailsCard = (data) => {
  const { name, phone, email } = data.data;
  return (
    <div>
      <div className="bg-gray-200 p-5 rounded-lg">
        <h1 className="text-2xl font-semibold secondary-text">
          Passenger Details :
        </h1>
        <div className="bg-white p-3 mt-3 rounded-lg">
          <div class="text-lg">
            <div class="flex mb-1">
              <span class="w-36 font-medium opacity-70 ">Name</span>
              <span class="flex-grow font-bold">: {name}</span>
            </div>
            <div class="flex mb-1">
              <span class="w-36 font-medium opacity-70 ">Phone</span>
              <span class="flex-grow font-bold">: {phone}</span>
            </div>
            <div class="flex mb-1">
              <span class="w-36 font-medium opacity-70 ">Email</span>
              <span class="flex-grow font-bold">: {email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsCard;
