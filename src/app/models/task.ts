import { TaskStatus } from "./enum/task.status";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    responsible: string;
    dueDate: string;
  }