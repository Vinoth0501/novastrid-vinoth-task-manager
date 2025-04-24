import { Task } from "../types/taskTypes";

export type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "SET_TASKS"; payload: Task[] };
