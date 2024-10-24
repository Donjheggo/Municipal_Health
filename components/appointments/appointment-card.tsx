"use client";

import CancelButton from "./cancel-button";
import { jsPDF } from "jspdf";
import { Tables } from "@/database.types";
import { ActivityIcon, CalendarClock } from "lucide-react";
import { Badge } from "../ui/badge";
import { FormatDateTime } from "@/lib/utils";
import { Button } from "../ui/button";
import { base64Logo } from "@/lib/utils";

export default function AppointmentCard({ item }: { item: AppointmentT }) {
  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add the image as a background, centered
    const logoWidth = 100; // Width of the logo
    const logoHeight = 100; // Height of the logo
    const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2; // Centered X position
    const logoY = 20; // Y position
    doc.addImage(
      base64Logo,
      "PNG",
      logoX,
      logoY,
      logoWidth,
      logoHeight,
      "",
      "FAST"
    );

    // Set font size and style for the main title
    doc.setFontSize(22);
    const titleY = logoY + logoHeight + 10; // Position below the logo
    doc.text(
      "Appointment Details",
      doc.internal.pageSize.getWidth() / 2,
      titleY,
      { align: "center" }
    );

    // Reset font size for normal text
    doc.setFontSize(12);
    const detailsStartY = titleY + 10;

    // Add appointment details
    doc.text(`Service: ${item.service_id.name}`, 10, detailsStartY);
    doc.text(
      `Price: ${item.service_id.price || "Free"}`,
      10,
      detailsStartY + 10
    );
    doc.text(
      `Schedule: ${FormatDateTime(new Date(item.schedule))}`,
      10,
      detailsStartY + 20
    );
    doc.text(`Status: ${item.status}`, 10, detailsStartY + 30);

    // Set font size and style for person details
    doc.setFontSize(22);
    const personDetailsY = detailsStartY + 60; // Position below appointment details
    doc.text(
      "Person Details",
      doc.internal.pageSize.getWidth() / 2,
      personDetailsY,
      { align: "center" }
    );

    // Reset font size for normal text
    doc.setFontSize(12);
    doc.text(`Name: ${item.name}`, 10, personDetailsY + 10);
    doc.text(`Birthdate: ${item.birthdate}`, 10, personDetailsY + 20);
    doc.text(`Address: ${item.address}`, 10, personDetailsY + 30);
    doc.text(`Contact Number: ${item.contact_number}`, 10, personDetailsY + 40);
    doc.text(`Gender: ${item.gender}`, 10, personDetailsY + 50);

    // Save the PDF
    doc.save("appointment.pdf");
  };

  return (
    <div className="border rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <ActivityIcon className="mr-1" />
            <h1 className="text-xl">
              {item.service_id.name} -{" "}
              {item.service_id.price ? (
                "₱" + item.service_id.price
              ) : (
                <Badge variant="outline">Free</Badge>
              )}
            </h1>
          </div>
        </div>
        {item.status === "PENDING" && <CancelButton id={item.id} />}
        {item.status === "ACCEPTED" && (
          <Button onClick={generatePDF}>Save PDF</Button>
        )}
      </div>
      <div>
        <div className="flex items-center">
          <CalendarClock size={18} />
          <h1 className="ml-1">{FormatDateTime(new Date(item.schedule))}</h1>
        </div>
        <h1>
          <Badge variant="default"> {item.status} </Badge>
        </h1>
        <div className="mt-2">
          <h1>Name: {item.name}</h1>
          <h1>Birthdate: {item.birthdate}</h1>
          <h1>Address: {item.address}</h1>
          <h1>Contact number: {item.contact_number}</h1>
          <h1>Gender: {item.gender}</h1>
        </div>
      </div>
    </div>
  );
}

type ServiceT = Tables<"services">;
export type AppointmentT = {
  address: string;
  birthdate: string;
  contact_number: number;
  created_at: string;
  gender: "MALE" | "FEMALE";
  id: string;
  name: string;
  schedule: string;
  service_id: ServiceT;
  status: "PENDING" | "CANCELLED" | "ACCEPTED" | "COMPLETED";
  user_id: string;
};
