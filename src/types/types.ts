export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Completed';
}
