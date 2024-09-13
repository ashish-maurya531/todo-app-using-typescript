import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types/types.ts';

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      if (a.dueDate.getTime() === b.dueDate.getTime()) {
        // Sort by priority when due dates are the same
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.dueDate.getTime() - b.dueDate.getTime(); // Sort by due date
    });
  };

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(sortTasks(updatedTasks));
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    setTasks(sortTasks(updatedTasks));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(sortTasks(updatedTasks));
  };

  useEffect(() => {
    setTasks(sortTasks(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
