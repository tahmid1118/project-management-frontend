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
}

const taskSchema = z.object({
  taskContent: z
    .string()
    .min(1, "Task content is required")
    .max(180, "Task content cannot exceed 180 characters"),
});

type TaskFormInputs = z.infer<typeof taskSchema>;

const AddTask: React.FC<AddTaskProps> = ({ boardData, setBoardData }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: { taskContent: "" },
  });

  const onSubmit = (data: TaskFormInputs) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content: data.taskContent };

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

    form.reset();
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
          <DialogDescription>Enter task details below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
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
                    className={`p-2 rounded bg-gray-700 text-white border ${
                      form.formState.errors.taskContent
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-600 focus:ring-[#143D60] focus:border-[#143D60]"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="bg-[#27667B] hover:bg-[#143D60] transition text-white"
          >
            Submit
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
