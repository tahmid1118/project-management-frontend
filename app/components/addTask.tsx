"use client";
import { useState } from "react";
import { BoardData } from "../data/data";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface AddTaskProps {
  boardData: BoardData;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
}

const AddTask: React.FC<AddTaskProps> = ({ boardData, setBoardData }) => {
  const [taskContent, setTaskContent] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddTask = () => {
    if (!taskContent.trim()) return;

    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content: taskContent };

    const updatedTasks = {
      ...boardData.tasks,
      [newTaskId]: newTask,
    };

    const updatedColumns = {
      ...boardData.columns,
      "column-1": {
        ...boardData.columns["column-1"],
        taskIds: [...boardData.columns["column-1"].taskIds, newTaskId],
      },
    };

    setBoardData({
      ...boardData,
      tasks: updatedTasks,
      columns: updatedColumns,
    });

    setTaskContent("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#27667B] hover:bg-[#143D60] transition text-white">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl">Add a New Task</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="Enter task title..."
          className="p-2 rounded bg-gray-700 text-white"
        />
        <Button
          onClick={handleAddTask}
          className="bg-[#27667B] hover:bg-[#143D60] transition text-white"
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
