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

  // Get all multi-day tasks for a specific week
  const getWeekTasks = (weekDays: (Date | null)[]) => {
    const weekTasks: Array<{
      task: {
        startDate?: string;
        endDate?: string;
        id: string;
        content: string;
        assignees?: (string | number)[];
      };
      startCol: number;
      endCol: number;
      row: number;
    }> = [];

    const processedTasks = new Set<string>();

    weekDays.forEach((day) => {
      if (!day) return;
      const tasksForDay = getTasksForDate(day).filter(
        (task) =>
          task.startDate !== task.endDate && !processedTasks.has(task.id)
      );

      tasksForDay.forEach((task) => {
        if (!task.startDate || !task.endDate) return;

        // Find start and end columns for this task in this week
        let startCol = -1;
        let endCol = -1;

        weekDays.forEach((weekDay, colIndex) => {
          if (!weekDay) return;
          const colDateStr = weekDay.toISOString().split("T")[0];

          if (
            task.startDate &&
            task.endDate &&
            colDateStr >= task.startDate &&
            colDateStr <= task.endDate
          ) {
            if (startCol === -1) startCol = colIndex;
            endCol = colIndex;
          }
        });

        if (startCol !== -1 && endCol !== -1) {
          weekTasks.push({
            task,
            startCol,
            endCol,
            row: weekTasks.length,
          });
          processedTasks.add(task.id);
        }
      });
    });

    return weekTasks;
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

  const getWeeksInMonth = (date: Date) => {
    const days = getDaysInMonth(date);
    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
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

  const weeks = getWeeksInMonth(currentDate);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === "month"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === "week"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Week
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FiPlus className="h-4 w-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
            {dayNames.map((day) => (
              <div
                key={day}
                className="bg-gray-100 dark:bg-gray-700/50 p-3 text-center"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar weeks */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="relative">
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
                {week.map((day, dayIndex) => {
                  const isToday =
                    day && day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={dayIndex}
                      className={`bg-white dark:bg-gray-700/30 p-2 min-h-[120px] ${
                        day
                          ? "hover:bg-blue-50/50 dark:hover:bg-gray-600/30"
                          : ""
                      } transition-colors relative`}
                    >
                      {day && (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-sm font-medium ${
                                isToday
                                  ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {day.getDate()}
                            </span>
                          </div>

                          {/* Single day tasks (non-spanning) */}
                          <div className="space-y-1 mt-8">
                            {getTasksForDate(day)
                              .filter((task) => task.startDate === task.endDate)
                              .slice(0, 2)
                              .map((task) => {
                                const assignedMember = dummyMembers.find(
                                  (m) => m.user_id === task.assignees?.[0]
                                );

                                return (
                                  <div
                                    key={task.id}
                                    className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded truncate border border-blue-300 dark:border-blue-500/30 font-medium shadow-sm"
                                    title={`${task.content} - ${assignedMember?.full_name || "Unassigned"}`}
                                  >
                                    {task.content}
                                  </div>
                                );
                              })}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Multi-day task bars */}
              <div className="absolute top-8 left-0 right-0 pointer-events-none z-10 px-1">
                {getWeekTasks(week).map((weekTask, index) => {
                  const assignedMember = dummyMembers.find(
                    (m) => m.user_id === weekTask.task.assignees?.[0]
                  );

                  const leftPercent = (weekTask.startCol / 7) * 100;
                  const widthPercent =
                    ((weekTask.endCol - weekTask.startCol + 1) / 7) * 100;

                  return (
                    <div
                      key={weekTask.task.id}
                      className="absolute bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white text-xs px-2 py-1 rounded-sm border border-blue-400/50 pointer-events-auto cursor-pointer hover:from-blue-500 hover:to-purple-600 transition-colors flex items-center"
                      style={{
                        top: `${index * 24}px`,
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                        height: "20px",
                      }}
                      title={`${weekTask.task.content} (${weekTask.task.startDate} - ${weekTask.task.endDate}) - ${assignedMember?.full_name || "Unassigned"}`}
                    >
                      <span className="truncate text-center w-full">
                        {weekTask.task.content}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
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
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FiCalendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {task.content}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {task.startDate} - {task.endDate}
                      {assignedMember && ` • ${assignedMember.full_name}`}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    task.priority === "Urgent"
                      ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-500/30"
                      : task.priority === "High"
                        ? "bg-orange-100 dark:bg-yellow-500/20 text-orange-700 dark:text-yellow-400 border-orange-300 dark:border-yellow-500/30"
                        : task.priority === "Medium"
                          ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30"
                          : "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-500/30"
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
