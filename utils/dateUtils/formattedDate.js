import { format } from "date-fns";
export default function formattedDate(date, formatDate = "") {
  const newDate = date && new Date(date);
  const formattedDate = (newDate && format(newDate, "MMM dd, yyyy")) ?? "";
  return formattedDate;
}
