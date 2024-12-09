export function extractDateTimeParts(
  dateTimeStr = "2024-10-20T05:31:49.350+00:00",
  format24Hour = false,
  toLocal = false
) {
  const dateObj = new Date(dateTimeStr);

  // If local time is requested, convert to local date-time parts
  const dayIndex = toLocal ? dateObj.getDay() : dateObj.getUTCDay();
  const hours = toLocal ? dateObj.getHours() : dateObj.getUTCHours();
  const minutes = (toLocal ? dateObj.getMinutes() : dateObj.getUTCMinutes())
    .toString()
    .padStart(2, "0");

  // Days and months arrays for display
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = daysOfWeek[dayIndex];

  // Determine AM or PM and adjust to 12-hour format if needed
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = format24Hour ? hours : hours % 12 || 12;
  const time = format24Hour
    ? `${hours.toString().padStart(2, "0")}:${minutes}`
    : `${displayHours}:${minutes} ${period}`;

  // Date display as "DD Mon"
  const date = `${toLocal ? dateObj.getDate() : dateObj.getUTCDate()} ${
    monthNames[toLocal ? dateObj.getMonth() : dateObj.getUTCMonth()]
  }`;

  // Determine time of day
  let timeOfDay = "";
  if (hours >= 5 && hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = "Afternoon";
  } else if (hours >= 18 && hours < 24) {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }

  return {
    day,
    time,
    period,
    timeOfDay,
    date,
  };
}

// Example usage:
// const dateTimeStr = "2024-10-20T05:31:49.350+00:00";
// const dateTimeParts12Local = extractDateTimeParts(
//   new Date().toISOString(),
//   false,
//   true
// ); // 12-hour local time format
// const dateTimeParts24Local = extractDateTimeParts(
//   new Date().toISOString(),
//   true,
//   true
// ); // 24-hour local time format

// console.log("12-hour local format:", dateTimeParts12Local);
// console.log("24-hour local format:", dateTimeParts24Local);
