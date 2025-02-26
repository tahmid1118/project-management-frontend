"use client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import * as React from "react";
import { useState } from "react";
import { BoardData, initialData } from "../data/data";
import AddTask from "./addTask";

const KanbanBoard: React.FC = () => {
  const [boardData, setBoardData] = useState<BoardData>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = boardData.columns[source.droppableId];
    const finishColumn = boardData.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      // Reordering in the same column
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      // Moving to a different column
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      });
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <div className="p-4">
        <AddTask boardData={boardData} setBoardData={setBoardData} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 p-4">
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => boardData.tasks[taskId]
            );

            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 min-w-[300px] bg-gray-800 rounded-lg p-4"
                  >
                    <h2 className="text-xl font-bold text-white mb-4">
                      {column.title}
                    </h2>
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-700 p-3 rounded-lg mb-2 text-white h-[100px] break-words whitespace-normal"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
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
