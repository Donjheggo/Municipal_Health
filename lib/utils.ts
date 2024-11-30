import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import type { AppointmentT } from "@/components/appointments/appointment-card";

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

export const ExportToExcelAppointments = (
  data: AppointmentT[],
  from: string | null,
  to: string | null
) => {
  // Parse Dates
  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  // Filter Data
  const filteredData = data.filter((item) => {
    const createdAt = new Date(item.created_at);
    if (fromDate && createdAt < fromDate) return false;
    if (toDate && createdAt > new Date(toDate.setHours(23, 59, 59, 999)))
      return false;
    return true;
  });

  const exportData = filteredData.map((item) => ({
    "Booking number": item.id,
    Name: item.name,
    "Birth Date": `${new Date(item.birthdate).toLocaleDateString()}`,
    Address: item.address,
    "Contact Number": item.contact_number,
    Service: item.service_id.name,
    Status: item.status,
    "Cancelation Note": item.cancelation_note,
    "Created at": `${new Date(item.created_at).toLocaleDateString()} ${new Date(
      item.created_at
    ).toLocaleTimeString()}`,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
  XLSX.writeFile(workbook, "appointments.xlsx");
};
