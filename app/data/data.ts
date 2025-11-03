export const priorities = [
  { label: "Urgent", color: "text-red-400" },
  { label: "High", color: "text-yellow-300" },
  { label: "Medium", color: "text-blue-300" },
  { label: "Low", color: "text-gray-300" },
  { label: "Clear", color: "text-gray-400" },
];

export const priorityOrder: Record<string, number> = {
  Urgent: 1,
  High: 2,
  Medium: 3,
  Low: 4,
  Clear: 5,
};

export type TeamMember = {
  id: number;
  user_id: number;
  full_name: string;
  image_url?: string;
};

export const dummyMembers: TeamMember[] = [
  { id: 1, user_id: 101, full_name: "Alice Johnson" },
  { id: 2, user_id: 102, full_name: "Bob Smith" },
  { id: 3, user_id: 103, full_name: "Charlie Brown" },
  { id: 4, user_id: 104, full_name: "Diana Prince" },
  { id: 5, user_id: 105, full_name: "Ethan Hunt" },
  { id: 6, user_id: 106, full_name: "Fiona Gallagher" },
  { id: 7, user_id: 107, full_name: "George Martin" },
  { id: 8, user_id: 108, full_name: "Hannah Baker" },
  { id: 9, user_id: 109, full_name: "Ian Somerhalder" },
  { id: 10, user_id: 110, full_name: "Jessica Jones" },
];

export interface Task {
  id: string;
  content: string;
  assignees?: Array<number | string>;
  priority?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

export const initialBoardData: BoardData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Design login page",
      assignees: [101],
      priority: "High",
      description: "Create responsive login form with validation",
      startDate: "2025-09-15",
      endDate: "2025-09-20",
    },
    "task-2": {
      id: "task-2",
      content: "Implement API for auth",
      assignees: [102],
      priority: "Urgent",
      description: "Node.js + JWT",
    },
    "task-3": {
      id: "task-3",
      content: "Setup database schema",
      assignees: [103],
      priority: "Medium",
    },
    "task-4": {
      id: "task-4",
      content: "Create landing page",
      assignees: [104],
      priority: "Low",
      description: "Hero section + footer",
    },
    "task-5": {
      id: "task-5",
      content: "Setup CI/CD pipeline",
      assignees: [105],
      priority: "High",
    },
    "task-6": {
      id: "task-6",
      content: "Unit tests for auth module",
      assignees: [106],
      priority: "Medium",
    },
    "task-7": {
      id: "task-7",
      content: "Integrate payment gateway",
      assignees: [107],
      priority: "Urgent",
    },
    "task-8": {
      id: "task-8",
      content: "Optimize images & assets",
      assignees: [108],
      priority: "Low",
    },
    "task-9": {
      id: "task-9",
      content: "Setup monitoring (Grafana/Prometheus)",
      assignees: [109],
      priority: "High",
    },
    "task-10": {
      id: "task-10",
      content: "Prepare project documentation",
      assignees: [110],
      priority: "Clear",
    },
  },
  columns: {
    "Not Started": {
      id: "Not Started",
      title: "Not Started",
      taskIds: ["task-3", "task-4", "task-8", "task-10"],
    },
    "In Progress": {
      id: "In Progress",
      title: "In Progress",
      taskIds: ["task-1", "task-5", "task-9"],
    },
    "In Review": {
      id: "In Review",
      title: "In Review",
      taskIds: ["task-6"],
    },
    Done: {
      id: "Done",
      title: "Done",
      taskIds: ["task-2", "task-7"],
    },
  },
  columnOrder: ["Not Started", "In Progress", "In Review", "Done"],
};
