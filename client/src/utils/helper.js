import dayjs from "dayjs";

export const dateFormate = (dataInput) => {
  const d = new Date(dataInput);
  const date = d?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return date;
};

/* if date today then send search time also  */

export const todayChecker = (date) => {
  // Get the current date and time
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  // Format the date as a string (optional)
  const todayDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  if (todayDate === date) {
    const arrivalDateTime = dayjs(currentDate).format(
      "YYYY-MM-DDTHH:mm:ss.sss"
    );
    return arrivalDateTime;
  } else {
    return date;
  }
};

/*  duration maker*/
export const formatDuration = (duration) => {
  const hours = duration.hours();
  const minutes = duration.minutes();

  let result = "";
  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (minutes > 0) {
    result += ` ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return result.trim();
};

export const validateEmail = (rule, value, callback) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || emailRegex.test(value)) {
    callback();
  } else {
    callback("Please enter a valid email address");
  }
};
