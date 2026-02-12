"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function buildTimes(stepMinutes = 15) {
  const out: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      out.push(`${pad2(h)}:${pad2(m)}`);
    }
  }
  return out;
}

function formatHHMMTo12h(hhmm: string) {
  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad2(m)} ${ampm}`;
}

export function hhmmToDate(hhmm: string, baseDate = new Date()) {
  const [hStr, mStr] = hhmm.split(":");
  const d = new Date(baseDate);
  d.setHours(Number(hStr), Number(mStr), 0, 0);
  return d;
}

export function dateToHHMM(d?: Date | null) {
  if (!d) return "";
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

type TimePickerProps = {
  label: string;
  value?: Date | null;
  onChange: (d: Date) => void;
  stepMinutes?: number;
  baseDate?: Date;
  use12h?: boolean;
};

export function TimePicker({
  label,
  value,
  onChange,
  stepMinutes = 15,
  baseDate = new Date(),
  use12h = false,
}: TimePickerProps) {
  const times = React.useMemo(() => buildTimes(stepMinutes), [stepMinutes]);
  const hhmm = dateToHHMM(value ?? null);

  return (
    <div className="space-y-2">
      <Label className="text-white/80">{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between border-white/10 bg-black/30 text-white hover:bg-white/5"
          >
            <span className={hhmm ? "text-white" : "text-white/40"}>
              {hhmm ? (use12h ? formatHHMMTo12h(hhmm) : hhmm) : "select time"}
            </span>
            <span className="text-white/40">▾</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 border-white/10 bg-black/80 p-3 backdrop-blur-xl">
          <div className="space-y-2">
            <Select
              value={hhmm || undefined}
              onValueChange={(v) => onChange(hhmmToDate(v, baseDate))}
            >
              <SelectTrigger className="border-white/10 bg-white/5 text-white">
                <SelectValue placeholder="time" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-black/90 text-white">
                {times.map((t) => (
                  <SelectItem key={t} value={t}>
                    {use12h ? formatHHMMTo12h(t) : t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-[11px] text-white/45">
              Step: {stepMinutes} minutes
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
