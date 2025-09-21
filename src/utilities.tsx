import type { tasksType } from "./types";

export const processTasks = (tasks: any[]): tasksType[] => {
  return tasks.map((task) => ({
    ...task,
    created_at: new Date(task.created_at),
    updated_at: new Date(task.updated_at),
  }));
};

export const formatDate = (date: Date): string => {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${weekday} ${day}, ${month} ${year}`;
};

export type Status = "pending" | "in-progress" | "completed";

export const statusOptions = [
  { value: "pending", label: "Pending", className: "pending-dot" },
  { value: "in-progress", label: "In Progress", className: "in-progress-dot" },
  { value: "completed", label: "Completed", className: "completed-dot" },
];
