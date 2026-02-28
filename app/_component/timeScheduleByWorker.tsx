import React from "react";
import { ChevronRight, Circle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Standard Shadcn path

interface TimeSlot {
  time: string;
  days: {
    status: "booked" | "available" | "sale" | "closed";
    price?: string;
  }[];
}

const scheduleData: TimeSlot[] = [
  {
    time: "08:00-09:00",
    days: [
      { status: "booked" },
      { status: "available", price: "150000 ₮" },
      { status: "closed" },
      { status: "closed" },
      { status: "closed" },
      { status: "closed" },
      { status: "closed" },
    ],
  },
  {
    time: "22:00-24:00",
    days: [
      { status: "available", price: "150000 ₮" },
      { status: "available", price: "150000 ₮" },
      { status: "sale", price: "130000 ₮" },
      { status: "sale", price: "130000 ₮" },
      { status: "sale", price: "130000 ₮" },
      { status: "sale", price: "130000 ₮" },
      { status: "sale", price: "130000 ₮" },
    ],
  },
  // ... map the rest of your data here
];

const daysHeader = [
  { date: "Feb 28", day: "Sat", color: "text-orange-500" },
  { date: "Mar 1", day: "Sun", color: "text-orange-500" },
  { date: "Mar 2", day: "Mon", color: "text-zinc-100" },
  { date: "Mar 3", day: "Tue", color: "text-zinc-100" },
  { date: "Mar 4", day: "Wed", color: "text-zinc-100" },
  { date: "Mar 5", day: "Thu", color: "text-zinc-100" },
  { date: "Mar 6", day: "Fri", color: "text-zinc-100" },
];

export default function BookingSchedule() {
  return (
    <div className="w-full bg-zinc-950 p-6 rounded-xl border border-zinc-800 text-zinc-100">
      <div className="rounded-md border border-zinc-800 bg-zinc-900/30">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="hover:bg-transparent border-zinc-800">
              <TableHead className="w-[100px]"></TableHead>
              {daysHeader.map((d, i) => (
                <TableHead key={i} className="text-center py-4">
                  <div className={`flex flex-col items-center ${d.color}`}>
                    <span className="text-[11px] font-bold leading-none">
                      {d.date}
                    </span>
                    <span className="text-[10px] uppercase mt-1 opacity-80">
                      {d.day}
                    </span>
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-10">
                <ChevronRight
                  className="text-zinc-500 cursor-pointer hover:text-purple-400"
                  size={18}
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((row, idx) => (
              <TableRow
                key={idx}
                className="border-zinc-800 hover:bg-zinc-800/30 transition-colors"
              >
                <TableCell className="text-[10px] font-medium text-zinc-400 border-r border-zinc-800/50">
                  {row.time}
                </TableCell>

                {row.days.map((slot, sIdx) => (
                  <TableCell key={sIdx} className="p-1 text-center">
                    <SlotRenderer slot={slot} />
                  </TableCell>
                ))}

                <TableCell className="text-[10px] text-zinc-600">
                  {row.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function SlotRenderer({ slot }: { slot: any }) {
  const baseStyles =
    "w-full py-2 px-1 rounded-md text-[10px] transition-all duration-200 border";

  switch (slot.status) {
    case "booked":
      return <span className="text-zinc-500">захиалсан</span>;
    case "closed":
      return <span className="text-zinc-700/50">хаагдсан</span>;
    case "available":
      return (
        <button
          className={`${baseStyles} bg-zinc-900 border-zinc-700 hover:border-purple-500 hover:text-purple-400 text-zinc-200`}
        >
          {slot.price}
        </button>
      );
    case "sale":
      return (
        <button
          className={`${baseStyles} bg-zinc-900 border-zinc-700 hover:border-purple-500 flex items-center justify-center gap-1 group`}
        >
          <Circle
            size={6}
            className="fill-green-500 text-green-500 group-hover:animate-pulse"
          />
          <span className="text-green-500 font-bold">sale</span>
          <span className="text-zinc-200">{slot.price}</span>
        </button>
      );
    default:
      return null;
  }
}
