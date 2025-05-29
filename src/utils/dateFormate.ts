import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export type IFormat =
  | "YYYY" // 2024
  | "DD/MM/YYYY" // 01/12/2024
  | "DD/MM/YYYY hh:mm" // 01/12/2024 01:40
  | "DD/MM/YYYY hh:mm A" // 01/12/2024 01:40 PM
  | "hh:mm" // 01:40
  | "hh:mm A" // 01:40 PM
  | "hh:mm [IST]" // 01:40 IST
  | "Do MMM YYYY" // 1st Dec 2024
  | "Do MMMM" // 1st December
  | "Do MMMM YYYY"; // 1st December 2024

export const convertDateToTimestamp = (dateString: any) => {
  return dayjs(dateString).unix(); // Converts to timestamp in seconds
};
export const convertTimestampToDate = (
  timestamp: any,
  format: string = "DD MMMM YYYY"
) => {
  if (!timestamp) {
    return;
  }
  return dayjs.unix(timestamp).format(format);
};

export const convertToSystemTimeZone = (dateString: string) => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};

export const getRelativeTime = (timestamp: string | number | any) => {
  if (!timestamp) {
    return "Unknown time";
  } // Handle empty timestamps

  const parsedDate = dayjs.utc(timestamp * 1000); // Ensure UTC parsing
  if (!parsedDate.isValid()) {
    return "Invalid date";
  } // Validate timestamp

  return parsedDate.local().fromNow(); // Convert to local time and format
};
