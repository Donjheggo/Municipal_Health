import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormatDateTime = (date: Date) => {
  // Convert date to the local timezone
  const localDateData = new Date(date.getTime()).toLocaleString("en-US", {
    timeZone: "UTC", // Use UTC to ensure consistency with the DB if stored in UTC
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // For AM/PM format
  });
  return localDateData;
};
