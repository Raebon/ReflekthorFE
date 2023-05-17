import { format } from "date-fns";

export const formatDatetime = (
  date: Date,
  formatDate: string = "PPpp"
): string => {
  return format(date, formatDate);
};
