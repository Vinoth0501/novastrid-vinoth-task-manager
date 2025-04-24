import { Task } from "../types/taskTypes";

export const addTask = (task: Task) => ({ type: "ADD_TASK", payload: task });
export const deleteTask = (id: number) => ({
  type: "DELETE_TASK",
  payload: id,
});
export const toggleTask = (id: number) => ({
  type: "TOGGLE_TASK",
  payload: id,
});
export const setTasks = (tasks: Task[]) => ({
  type: "SET_TASKS",
  payload: tasks,
});
