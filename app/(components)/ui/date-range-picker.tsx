"use client";

import { addDays, differenceInDays, format, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { usePathname } from "next/navigation";
import { toast } from "sonner"; // Import toast for displaying error messages
import { useTranslation } from "../../app/i18n/client";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
interface CalendarDateRangePickerProps {
  className?: string;
  onChange?: (dates: string[] | undefined) => void;
  defaultRange?: DateRange; // Accepts an initial date range
}

export function CalendarDateRangePicker({
  className,
  onChange,
  defaultRange,
}: CalendarDateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(defaultRange);
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const { t } = useTranslation(lng, "Language");
  // Function to generate an array of dates in the selected range
  const getDateRangeArray = (startDate: Date, endDate: Date): string[] => {
    const dates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(format(currentDate, "yyyy-MM-dd"));
      currentDate = addDays(currentDate, 1);
    }
    return dates;
  };

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const rangeLength = differenceInDays(range.to, range.from);

      if (rangeLength > 5) {
        toast.error(t("you_cannot_select_a_date_range_longer_than_6_days"), {
          style: { background: "#D32F2F", color: "#fff" },
        });
        return; // Prevent selection if range exceeds 6 days
      }
    }

    setDate(range);

    if (onChange && range?.from && range?.to) {
      const datesArray = getDateRangeArray(range.from, range.to);
      onChange(datesArray); // Pass formatted date range array to onChange
    } else if (onChange) {
      onChange(undefined); // Reset when no dates are selected
    }
  };

  return (
    <div className={cn("gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            name="Deadline"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select Exhibition Dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="center"
          sideOffset={4} // Add a small offset to avoid screen edges
          alignOffset={4} // Adjust alignment for better positioning
          collisionPadding={16} // Prevent collision with the screen edges
          side="bottom" // Default to opening below the trigger
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={handleDateChange} // Use handleDateChange for date selection
            numberOfMonths={1} // Change to 1 month for smaller screens
            disabled={(date) => isBefore(date, new Date())} // Disable dates before today
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
