"use client";

import { useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import { dummyMembers, initialBoardData } from "../data/data";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const tasksWithDates = Object.values(initialBoardData.tasks).filter(
    (task) => task.startDate && task.endDate
  );

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return tasksWithDates.filter((task) => {
      if (!task.startDate || !task.endDate) return false;
      return dateStr >= task.startDate && dateStr <= task.endDate;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === "month"
                  ? "bg-gray-700 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === "week"
                  ? "bg-gray-700 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Week
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FiPlus className="h-4 w-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="bg-gray-50 p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{day}</span>
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => {
            const isToday =
              day && day.toDateString() === new Date().toDateString();
            const tasksForDay = day ? getTasksForDate(day) : [];

            return (
              <div
                key={index}
                className={`bg-gray-700/30 p-2 min-h-[120px] ${
                  day ? "hover:bg-gray-600/30" : ""
                } transition-colors`}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${
                          isToday
                            ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                            : "text-white"
                        }`}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {tasksForDay.slice(0, 3).map((task) => {
                        const assignedMember = dummyMembers.find(
                          (m) => m.user_id === task.assignees?.[0]
                        );

                        return (
                          <div
                            key={task.id}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded truncate"
                            title={`${task.content} - ${assignedMember?.full_name || "Unassigned"}`}
                          >
                            {task.content}
                          </div>
                        );
                      })}

                      {tasksForDay.length > 3 && (
                        <div className="text-xs text-gray-500 px-2">
                          +{tasksForDay.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Upcoming Deadlines
        </h2>
        <div className="space-y-3">
          {tasksWithDates.slice(0, 5).map((task) => {
            const assignedMember = dummyMembers.find(
              (m) => m.user_id === task.assignees?.[0]
            );

            return (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FiCalendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {task.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {task.startDate} - {task.endDate}
                      {assignedMember && ` • ${assignedMember.full_name}`}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === "Urgent"
                      ? "bg-red-100 text-red-800"
                      : task.priority === "High"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
