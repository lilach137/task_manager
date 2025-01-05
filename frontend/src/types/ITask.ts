export interface Task {
  id: number;
  description: string;
  priority: string;
  status: string;
  date: Date;
  assignee: string | Assignee;
  assigneeId: number; 
}

interface Assignee {
  name: string;

}