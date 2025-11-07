"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import {
  FiAlignLeft,
  FiCalendar,
  FiEdit2,
  FiFlag,
  FiTrash,
  FiUserPlus,
} from "react-icons/fi";
import { toast } from "sonner";
import Portal from "../(components)/ui/portal";

import AddTask from "../(components)/addTask";
import {
  BoardData,
  Column,
  dummyMembers,
  initialBoardData,
  priorities,
  priorityOrder,
  Task,
} from "../data/data";

const { RangePicker } = DatePicker;

type PopoverType = "assignee" | "priority" | "description" | "calendar";

interface PopoverState {
  id: string;
  type: PopoverType;
  rect: DOMRect;
}

const sortColumnTasks = (tasks: Record<string, Task>, column: Column) => {
  return [...column.taskIds].sort((a, b) => {
    const prioA = priorityOrder[tasks[a]?.priority || "Clear"];
    const prioB = priorityOrder[tasks[b]?.priority || "Clear"];
    return prioA - prioB;
  });
};

const KanbanBoard: React.FC = () => {
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);
  const [isLoading] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<PopoverState | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const [tempDates, setTempDates] = useState<[string, string] | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        openPopover &&
        portalRef.current &&
        !portalRef.current.contains(e.target as Node)
      ) {
        const target = e.target as HTMLElement;

        // ✅ Ignore clicks inside AntD calendar popup
        if (target.closest(".ant-picker-dropdown")) {
          return;
        }

        setOpenPopover(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openPopover]);

  const updateTaskDetails = (taskId: string, updates: Partial<Task>) => {
    setBoardData((prev) => {
      const updatedTasks = {
        ...prev.tasks,
        [taskId]: { ...prev.tasks[taskId], ...updates },
      };

      const updatedColumns = { ...prev.columns };
      const columnId = Object.keys(updatedColumns).find((col) =>
        updatedColumns[col].taskIds.includes(taskId)
      );

      if (columnId) {
        updatedColumns[columnId] = {
          ...updatedColumns[columnId],
          taskIds: sortColumnTasks(updatedTasks, updatedColumns[columnId]),
        };
      }

      return { ...prev, tasks: updatedTasks, columns: updatedColumns };
    });
  };

  const deleteTask = (taskId: string) => {
    setBoardData((prev) => {
      const newTasks = { ...prev.tasks };
      delete newTasks[taskId];

      const newColumns = { ...prev.columns };
      for (const col of Object.values(newColumns)) {
        col.taskIds = col.taskIds.filter((id) => id !== taskId);
      }

      return { ...prev, tasks: newTasks, columns: newColumns };
    });

    toast.success("Task deleted");
  };

  const moveTask = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    setBoardData((prev) => {
      const newData = { ...prev };

      // Same column reordering
      if (source.droppableId === destination.droppableId) {
        const column = newData.columns[source.droppableId];
        const newTaskIds = [...column.taskIds];

        // Remove from source position
        newTaskIds.splice(source.index, 1);
        // Insert at destination position
        newTaskIds.splice(destination.index, 0, draggableId);

        newData.columns[source.droppableId] = {
          ...column,
          taskIds: newTaskIds,
        };
      } else {
        // Moving between different columns
        const start = newData.columns[source.droppableId];
        const finish = newData.columns[destination.droppableId];

        // Remove from source column
        const startTaskIds = start.taskIds.filter((id) => id !== draggableId);

        // Add to destination column at specific position
        const finishTaskIds = [...finish.taskIds];
        finishTaskIds.splice(destination.index, 0, draggableId);

        newData.columns[start.id] = {
          ...start,
          taskIds: sortColumnTasks(newData.tasks, {
            ...start,
            taskIds: startTaskIds,
          }),
        };

        newData.columns[finish.id] = {
          ...finish,
          taskIds: sortColumnTasks(newData.tasks, {
            ...finish,
            taskIds: finishTaskIds,
          }),
        };
      }

      return newData;
    });
  };

  if (isLoading || !isMounted) {
    return (
      <div className="h-[600px] flex items-center justify-center text-gray-900 dark:text-white">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100 dark:bg-gradient-to-r dark:from-[#432c52] dark:via-[#2a3b36] dark:to-[#432c52] p-6">
      <DragDropContext onDragEnd={moveTask}>
        <div className="flex gap-4 overflow-x-auto h-full">
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId];
            const tasks = column.taskIds.map((id) => boardData.tasks[id]);

            return (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 min-w-[300px] max-h-[77vh] bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 flex flex-col border border-gray-300/50 dark:border-gray-700 shadow-md"
                  >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {column.title}
                    </h2>

                    <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                      {tasks.map((task, index) => (
                        <Draggable
                          draggableId={task.id}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative border border-gray-200 dark:border-gray-600/30"
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <span className="text-sm font-semibold flex-1 truncate text-gray-900 dark:text-white">
                                  {task.content}
                                </span>
                                <div className="flex items-center gap-2">
                                  <FiEdit2
                                    className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                                    onClick={() => {
                                      // TODO: Implement task editing functionality
                                      console.log("Edit task:", task.id);
                                    }}
                                  />
                                  <FiTrash
                                    className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors"
                                    onClick={() => deleteTask(task.id)}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-xs mb-3">
                                <FiAlignLeft
                                  className="h-4 w-4 cursor-pointer"
                                  onClick={(e) =>
                                    setOpenPopover({
                                      id: task.id,
                                      type: "description",
                                      rect: e.currentTarget.getBoundingClientRect(),
                                    })
                                  }
                                />
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-gray-800 dark:text-gray-200 text-xs">
                                {/* Assignee */}
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={(e) =>
                                    setOpenPopover({
                                      id: task.id,
                                      type: "assignee",
                                      rect: e.currentTarget.getBoundingClientRect(),
                                    })
                                  }
                                >
                                  <FiUserPlus className="h-4 w-4" />
                                  {task.assignees?.length ? (
                                    <span>
                                      {
                                        dummyMembers.find(
                                          (m) =>
                                            m.user_id === task.assignees?.[0]
                                        )?.full_name
                                      }
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      Add
                                    </span>
                                  )}
                                </div>

                                {/* Calendar */}
                                <div
                                  className="flex items-center gap-1 text-blue-600 dark:text-blue-300 cursor-pointer hover:text-blue-700 dark:hover:text-blue-200 transition-colors"
                                  onClick={(e) =>
                                    setOpenPopover({
                                      id: task.id,
                                      type: "calendar",
                                      rect: e.currentTarget.getBoundingClientRect(),
                                    })
                                  }
                                >
                                  <FiCalendar className="h-4 w-4" />
                                  {task.startDate ? (
                                    <span className="font-medium">
                                      {task.startDate} → {task.endDate}
                                    </span>
                                  ) : (
                                    <span className="text-gray-500 dark:text-gray-400">
                                      Set Due Date
                                    </span>
                                  )}
                                </div>

                                {/* Priority */}
                                <div
                                  className="flex items-center gap-1 cursor-pointer"
                                  onClick={(e) =>
                                    setOpenPopover({
                                      id: task.id,
                                      type: "priority",
                                      rect: e.currentTarget.getBoundingClientRect(),
                                    })
                                  }
                                >
                                  <FiFlag
                                    className={`h-4 w-4 ${
                                      task.priority === "Urgent"
                                        ? "text-red-600 dark:text-red-400"
                                        : task.priority === "High"
                                          ? "text-orange-600 dark:text-yellow-400"
                                          : task.priority === "Medium"
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-500 dark:text-gray-400"
                                    }`}
                                  />
                                  {task.priority &&
                                    task.priority !== "Clear" && (
                                      <span
                                        className={`font-medium ${
                                          task.priority === "Urgent"
                                            ? "text-red-700 dark:text-red-400"
                                            : task.priority === "High"
                                              ? "text-orange-700 dark:text-yellow-400"
                                              : task.priority === "Medium"
                                                ? "text-blue-700 dark:text-blue-400"
                                                : "text-gray-700 dark:text-gray-300"
                                        }`}
                                      >
                                        {task.priority}
                                      </span>
                                    )}
                                </div>
                              </div>

                              {isMounted && openPopover?.id === task.id && (
                                <Portal>
                                  <div
                                    ref={portalRef}
                                    className="absolute z-50 rounded-lg shadow-xl p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-64 border border-gray-300 dark:border-gray-700"
                                    style={{
                                      top:
                                        openPopover.rect.bottom +
                                        window.scrollY +
                                        4,
                                      left:
                                        openPopover.rect.left + window.scrollX,
                                    }}
                                  >
                                    {openPopover.type === "assignee" && (
                                      <div>
                                        {dummyMembers.map((member) => (
                                          <div
                                            key={member.id}
                                            className="flex items-center justify-between px-2 py-1.5 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 rounded transition-colors"
                                          >
                                            <span>{member.full_name}</span>
                                            <button
                                              className="text-blue-400 text-xs"
                                              onClick={() =>
                                                updateTaskDetails(task.id, {
                                                  assignees: [member.user_id],
                                                })
                                              }
                                            >
                                              Assign
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {openPopover.type === "priority" &&
                                      priorities.map((p) => (
                                        <div
                                          key={p.label}
                                          className="flex items-center gap-2 p-2 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer rounded transition-colors"
                                          onClick={() => {
                                            updateTaskDetails(task.id, {
                                              priority: p.label,
                                            });
                                            setOpenPopover(null);
                                          }}
                                        >
                                          <FiFlag
                                            className={`h-4 w-4 ${p.color}`}
                                          />
                                          <span>{p.label}</span>
                                        </div>
                                      ))}

                                    {openPopover.type === "description" && (
                                      <div className="text-sm text-gray-300">
                                        {task.description || "No description"}
                                      </div>
                                    )}

                                    {openPopover.type === "calendar" && (
                                      <div className="flex flex-col gap-2">
                                        <RangePicker
                                          className="w-full"
                                          format="YYYY-MM-DD"
                                          value={
                                            tempDates
                                              ? [
                                                  dayjs(tempDates[0]),
                                                  dayjs(tempDates[1]),
                                                ]
                                              : task.startDate && task.endDate
                                                ? [
                                                    dayjs(task.startDate),
                                                    dayjs(task.endDate),
                                                  ]
                                                : null
                                          }
                                          onChange={(dates) => {
                                            if (dates && dates[0] && dates[1]) {
                                              setTempDates([
                                                dates[0].format("YYYY-MM-DD"),
                                                dates[1].format("YYYY-MM-DD"),
                                              ]);
                                            } else {
                                              setTempDates(null);
                                            }
                                          }}
                                        />
                                        <button
                                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded self-end"
                                          onClick={() => {
                                            if (tempDates) {
                                              updateTaskDetails(task.id, {
                                                startDate: tempDates[0],
                                                endDate: tempDates[1],
                                              });
                                            }
                                            setTempDates(null); // reset after save
                                            setOpenPopover(null);
                                          }}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </Portal>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>

                    {/* AddTask button inside each column */}
                    <AddTask
                      boardData={boardData}
                      setBoardData={setBoardData}
                      columnId={column.id}
                    />
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
