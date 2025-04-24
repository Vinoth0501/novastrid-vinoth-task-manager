import { Task } from "../types/taskTypes";
import { Action } from "./ActionType";

const initialState: Task[] = [];

export const taskReducer = (state = initialState, action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "SET_TASKS":
      return action.payload;
    default:
      return state;
  }
};
