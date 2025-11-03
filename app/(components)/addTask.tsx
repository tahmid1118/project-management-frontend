"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BoardData } from "../data/data";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface AddTaskProps {
  boardData: BoardData;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  columnId: string;
}

const taskSchema = z.object({
  taskContent: z
    .string()
    .min(1, "Task content is required")
    .max(180, "Task content cannot exceed 180 characters"),
});

type TaskFormInputs = z.infer<typeof taskSchema>;

const AddTask: React.FC<AddTaskProps> = ({
  boardData,
  setBoardData,
  columnId,
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: { taskContent: "" },
  });

  const onSubmit = (data: TaskFormInputs) => {
    const newTaskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newTask = {
      id: newTaskId,
      content: data.taskContent,
      assignees: [],
      priority: "Clear",
    };

    const updatedTasks = {
      ...boardData.tasks,
      [newTaskId]: newTask,
    };

    const updatedColumns = {
      ...boardData.columns,
      [columnId]: {
        ...boardData.columns[columnId],
        taskIds: [...boardData.columns[columnId].taskIds, newTaskId],
      },
    };

    setBoardData({
      ...boardData,
      tasks: updatedTasks,
      columns: updatedColumns,
    });

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#27667B] hover:bg-[#1f5364] transition text-white w-full mt-2">
          + Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl">Add a New Task</DialogTitle>
          <DialogDescription>Enter task details below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="taskContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title..."
                      {...field}
                      className="p-2 rounded bg-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[#27667B] hover:bg-[#143D60] transition text-white"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
