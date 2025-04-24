import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../types/taskTypes";
import useFetch from "../components/customeHooks/useFetch";
import { addTask, deleteTask, setTasks, toggleTask } from "../redux/Action";
import Input from "../components/Input";
import Button from "../components/Button";

const TaskManager: React.FC = () => {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const reduxTasks: Task[] = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const {
    data: fetchedTasks,
    loading,
    error,
  } = useFetch<Task[]>("https://jsonplaceholder.typicode.com/todos?_limit=10");

  useEffect(() => {
    if (fetchedTasks && fetchedTasks.length > 0) {
      dispatch(setTasks(fetchedTasks));
    }
  }, [fetchedTasks, dispatch]);

  const filteredTasks = reduxTasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    return !task.completed;
  });

  const handleAdd = useCallback(() => {
    if (!title.trim()) return;
    const newTask: Task = { id: Date.now(), title, completed: false };
    dispatch(addTask(newTask));
    setTitle("");
  }, [dispatch, title]);

  return (
    <div
      className="container my-2"
      style={{ height: "100%", maxWidth: "900px" }}
    >
      <h3 className="mb-3">Task Manager</h3>

      <div className="d-flex mb-3 gap-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
        />
        <Button label="Add" onClick={handleAdd} />
      </div>

      <div className="dropdown-container mb-3 d-flex justify-content-end">
        <select
          className="form-select"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "completed" | "pending")
          }
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {loading && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
      <section className="d-flex align-items-center justify-content-center gap-3">
        {" "}
        <div className="task-list ps-sm-0">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="d-flex justify-content-between align-items-center items gap-3"
            >
              <div>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
              </div>
              <div className="align-self-start mt-md-0">
                <Button
                  label="Delete"
                  onClick={() => dispatch(deleteTask(task.id))}
                  variant="outline"
                />
              </div>
            </li>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskManager;
