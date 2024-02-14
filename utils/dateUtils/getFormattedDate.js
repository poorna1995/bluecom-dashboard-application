import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function getFormattedDate({ date = "", dateFormat = "" }) {
  const myDate = (date && new Date(`${date}`)) || "";

  const getYear = myDate && format(myDate, "yyyy");
  const getCurrentYear = new Date().getFullYear();

  const getTimeWithTimezone = getDateWithTimezone(date);
  // (newDate && utcToZonedTime(newDate, userTimezone)) || "";

  const formattedDate =
    getTimeWithTimezone && dateFormat
      ? format(getTimeWithTimezone, dateFormat)
      : (getCurrentYear === getYear
          ? getTimeWithTimezone &&
            format(getTimeWithTimezone, "MMM dd, hh:mm a")
          : getTimeWithTimezone &&
            format(getTimeWithTimezone, "MMM dd, yyyy | hh:mm a")) || "";
  return formattedDate;
}

export function getDateWithTimezone(date) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const myDate = (date && new Date(`${date}`)) || "";

  const getDate = myDate && format(myDate, "yyyy-MM-dd");
  const getTime = myDate && format(myDate, "hh:mm a");
  const newDate = getDate && getTime && new Date(`${getDate} ${getTime} UTC`);

  return (newDate && utcToZonedTime(newDate, userTimezone)) || "";
}
