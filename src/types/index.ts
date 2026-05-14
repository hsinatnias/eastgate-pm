export type Priority = 'high' | 'mid' | 'low';

export type Status = 'backlog' | 'inprogress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  project: string;
  priority: Priority;
  assignee: string;
  status: Status;
}

export interface Column {
  id: Status;
  label: string;
  count: number;
}