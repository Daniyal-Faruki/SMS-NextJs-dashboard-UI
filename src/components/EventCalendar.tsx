"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Team Standup",
    description: "Daily sync-up with the frontend and backend teams.",
    time: "09:30 AM - 10:30 AM",
  },
  {
    id: 2,
    title: "Client Demo",
    description: "Demonstration of the RPS module to the client.",
    time: "11:00 AM - 11:45 AM",
  },
  {
    id: 3,
    title: "Code Review",
    description: "Review PRs and finalize module structure.",
    time: "02:15 PM - 02:50 PM",
  },
  // {
  //   id: 4,
  //   title: "Design Sync",
  //   description: "Discussion with design team about UI improvements.",
  //   time: "04:00 PM - 05:30 PM",
  // },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-gray-400 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
