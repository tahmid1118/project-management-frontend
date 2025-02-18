export interface Task {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

export const initialData: BoardData = {
  tasks: {
    "task-1": { id: "task-1", content: "Technique Amplification Blue🔵" },
    "task-2": { id: "task-2", content: "Technique Reversal Red🔴" },
    "task-3": { id: "task-3", content: "Hollow Purple🟣" },
    "task-4": { id: "task-4", content: "Domain Expansion: Infinity Void⚪" },
    "task-5": {
      id: "task-5",
      content: "Domain Expansion: Malevolent Shrine👹",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-4"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-5"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
