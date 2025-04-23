"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const announcements = [
    {
      id: 1,
      title: "New Sprint Kickoff",
      date: "2025-04-15",
      description: "Sprint 12 begins tomorrow. Please ensure all pending tasks are updated on the board.",
    },
    {
      id: 2,
      title: "Server Maintenance",
      date: "2025-04-17",
      description: "Scheduled downtime from 12:00 AM to 2:00 AM for backend server upgrades.",
    },
    {
      id: 3,
      title: "Policy Update",
      date: "2025-04-20",
      description: "HR has released updated remote work guidelines. Check your email for details.",
    },
    // {
    //   id: 4,
    //   title: "Team Outing",
    //   date: "2025-04-25",
    //   description: "Join us for a fun evening at the annual team outing. RSVP by April 20th.",
    // },
  ];
  

const Announcements = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4">
        {announcements.map((event) => (
          <div
            className="p-4 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple odd:bg-lamaSkyLight even:bg-lamaPurpleLight"
            key={event.id}
          >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-gray-400 text-xs">{event.date}</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
