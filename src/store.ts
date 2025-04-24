import { createStore } from "redux";
import { taskReducer } from "./redux/Reduce";

const store = createStore(taskReducer);

export default store;
