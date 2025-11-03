"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "./button";
import { Calendar } from "./calendar";

interface Props {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  onClose: () => void;
}

export function DateRangePicker2({ value, onChange, onClose }: Props) {
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(
    value
  );

  const handleSave = () => {
    onChange(tempRange);
    onClose();
  };

  const handleCancel = () => {
    setTempRange(value);
    onClose();
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-xl p-4 w-[320px]">
      <Calendar
        mode="range"
        selected={tempRange}
        onSelect={setTempRange}
        numberOfMonths={1}
        defaultMonth={tempRange?.from}
        initialFocus
        className="mx-auto text-white [&_.rdp-head_cell]:w-8 [&_.rdp-head_cell]:h-8 [&_.rdp-cell]:w-8 [&_.rdp-cell]:h-8 [&_.rdp-day]:flex [&_.rdp-day]:items-center [&_.rdp-day]:justify-center"
      />

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="border-blue-500 text-blue-300 hover:bg-blue-600 hover:text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
