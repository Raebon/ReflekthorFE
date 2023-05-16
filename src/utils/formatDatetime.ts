import { format } from "date-fns";

export const formatDatetime = (
  date: Date,
  formatDate: string = "PPpp"
): string => {
  /*  let parseDate = new Date(date);
  console.log(parseDate); */
  return format(date, formatDate);
};
