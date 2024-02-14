import { format, formatDistance, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import React from "react";
import { Typography } from "@mui/material";

// const { format, parseISO } = require("date-fns");
// const { utcToZonedTime } = require("date-fns-tz");

// const getTimeBasedOnTimezone = (date, from, timezone) => {
// 	const reformatDate = format(parseISO(date), "LL/dd/yyyy");

// 	const fromWithSpace = `${from.substring(0, 5)} ${from.substring(
// 		5,
// 		from.length,
// 	)}`;

// 	const res = new Date(`${reformatDate} ${fromWithSpace} UTC`);

// 	const action_date = date && from && res;
// 	const fromTime = action_date && utcToZonedTime(action_date, timezone);
// 	return fromTime;
// };

function getFormattedDate({ date = "", dateFormat = "" }) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const myDate = (date && new Date(`${date}`)) || "";

  const getDate = myDate && format(myDate, "yyyy-MM-dd");
  const getTime = myDate && format(myDate, "hh:mm a");
  const newDate = getDate && getTime && new Date(`${getDate} ${getTime} UTC`);

  const getYear = myDate && format(myDate, "yyyy");
  const getCurrentYear = new Date().getFullYear();

  const getTimeWithTimezone =
    (newDate && utcToZonedTime(newDate, userTimezone)) || "";

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

export default function RenderDate({
  date = "",
  dateFormat = "",
  renderAsDistance,
  ...props
}) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const myDate = (date && new Date(`${date}`)) || "";

  const getDate = myDate && format(myDate, "yyyy-MM-dd");
  const getTime = myDate && format(myDate, "hh:mm a");
  const newDate = getDate && getTime && new Date(`${getDate} ${getTime} UTC`);

  const getYear = myDate && format(myDate, "yyyy");
  const getCurrentYear = new Date().getFullYear();

  const getTimeWithTimezone =
    (newDate && utcToZonedTime(newDate, userTimezone)) || "";

  const formattedDate =
    getTimeWithTimezone && dateFormat
      ? format(getTimeWithTimezone, dateFormat)
      : (getCurrentYear === getYear
          ? getTimeWithTimezone &&
            format(getTimeWithTimezone, "MMM dd, hh:mm a")
          : getTimeWithTimezone &&
            format(getTimeWithTimezone, "MMM dd, yyyy | hh:mm a")) || "";

  // console.log({
  //   myDate,
  //   date,
  //   newDate,
  //   userTimezone,
  //   getTimeWithTimezone,
  //   formattedDate,
  // });

  const getDateDistance =
    getTimeWithTimezone &&
    formatDistance(getTimeWithTimezone, new Date(), { addSuffix: true });
  // console.log({
  //   getDateDistance: getDateDistance.replace("about", ""),
  //   getTimeWithTimezone,
  // });
  if (renderAsDistance)
    return (
      <Typography
        component={"span"}
        sx={{
          fontSize: {
            xs: "12px",
            sm: "12px",
            md: "15px",
          },
          fontWeight: "500",
          color: (theme) => theme.palette.text.primary,
          ...props.sx,
        }}
        {...props}
      >
        {getDateDistance.replace("about", "")}
      </Typography>
    );

  if (formattedDate)
    return (
      <Typography
        component={"span"}
        sx={{
          fontSize: {
            xs: "12px",
            sm: "12px",
            md: "15px",
          },
          fontWeight: "500",
          color: (theme) => theme.palette.text.primary,
          ...props.sx,
        }}
        {...props}
      >
        {formattedDate}
      </Typography>
    );
  return;
}
