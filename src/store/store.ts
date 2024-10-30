// store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusType } from "../Utils/types";

interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  startDate: Date | null;
  endDate: Date | null;
  category: number;
  createdAt: Date;
}

interface TaskStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  tasks: Task[];
  ongoing: number;
  pending: number;
  completed: number;
  cancelled: number;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (id: string, status: StatusType) => void;
  updateTaskCounts: () => void;
  clearTask: () => void;
}

export const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      tasks: [],
      ongoing: 0,
      pending: 0,
      completed: 0,
      cancelled: 0,

      addTask: (task: Task) =>
        set((state) => {
          const newTasks = [...state.tasks, task];
          return {
            tasks: newTasks,
            ...calculateTaskCounts(newTasks),
          };
        }),

      removeTask: (id: string) =>
        set((state) => {
          const newTasks = state.tasks.filter((task) => task.id !== id);
          return {
            tasks: newTasks,
            ...calculateTaskCounts(newTasks),
          };
        }),

      clearTask: () =>
        set(() => ({
          tasks: [],
          ongoing: 0,
          pending: 0,
          completed: 0,
          cancelled: 0,
        })),

      updateTaskStatus: (id: string, status: StatusType) =>
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          );
          return {
            tasks: newTasks,
            ...calculateTaskCounts(newTasks),
          };
        }),

      updateTaskCounts: () =>
        set((state) => ({
          ...calculateTaskCounts(state.tasks),
        })),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        tasks: state.tasks,
        ongoing: state.ongoing,
        pending: state.pending,
        completed: state.completed,
        cancelled: state.cancelled,
      }),
    }
  )
);

const calculateTaskCounts = (tasks: Task[]) => {
  return {
    ongoing: tasks.filter((task) => task.status === StatusType.ONGOING).length,
    pending: tasks.filter((task) => task.status === StatusType.PENDING).length,
    completed: tasks.filter((task) => task.status === StatusType.COMPLETED)
      .length,
    cancelled: tasks.filter((task) => task.status === StatusType.CANCEL).length,
  };
};
