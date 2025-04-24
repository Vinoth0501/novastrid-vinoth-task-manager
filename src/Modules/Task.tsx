import React, { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Task } from "../types/taskTypes";
import { addTask, deleteTask, setTasks, toggleTask } from "../redux/Action";
import useFetch from "../components/customeHooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";

function ManageTask() {
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
  console.log(filteredTasks);

  return (
    <div
      className="bg-white m-md-3 p-4"
      style={{ height: "95.5dvh", borderRadius: "8px" }}
    >
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <h3>Task Manage</h3>

        <button
          type="button"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ backgroundColor: "#202d48", color: "white" }}
        >
          New Task
        </button>
      </div>
      <div className="dropdown-container d-flex justify-content-end my-3">
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
          className="d-flex align-items-center justify-content-center "
          style={{ height: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row mt-4 data-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4 pb-3">
              <Card>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={task.completed}
                      onChange={() => dispatch(toggleTask(task.id))}
                    />
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.title.slice(0, 20)}
                    </span>
                  </div>
                  <div className="align-self-start mt-md-0">
                    <Button
                      label="Delete"
                      onClick={() => dispatch(deleteTask(task.id))}
                      variant="outline"
                    />
                  </div>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "400px" }}
          >
            No data found
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog d-flex align-items-center justify-content-center">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="staticBackdropLabel">
                Add new task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex ">
              {" "}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add new task..."
              />
              <div className="ms-3">
                <Button variant="outline" onClick={handleAdd} label="Add" />
              </div>
            </div>
            <div className="px-3 pb-3 d-flex justify-content-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTask;
