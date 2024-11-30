"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { GetAllAnnouncement } from "@/lib/actions/announcements";
import { ScrollText } from "lucide-react";
import type { AnnouncementT } from "./update-form";

export default function AnnouncementCard() {
  const [announcements, setAnnouncements] = useState<AnnouncementT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllAnnouncement();
      if (data) setAnnouncements(data);
    };

    fetchData();
  }, []);

  return (
    <Card className="transform transition-all hover:scale-105 bg-background shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <ScrollText className="w-6 h-6 text-primary" />
          Announcements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>{item.description}</div>
            <div>
              Posted at: {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
