import React from "react";
import type { tasksType } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { statusOptions } from "../utilities";
import { DotOption, DotSingleValue } from "../components/CustomSelect";

const UpdateTodo = () => {
  const location = useLocation();
  const [updatedTask, setUpdatedTask] = React.useState<tasksType | null>(
    location.state?.task || null
  );
  const navigate = useNavigate();

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: updatedTask?.id,
      title: updatedTask?.title || "",
      description: updatedTask?.description || "",
      created_at: new Date(),
      updated_at: new Date(),
      status: updatedTask?.status || "pending",
    };
    const existingTasks = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    );
    const updatedTasks = existingTasks.map((task: tasksType) =>
      task.id === newTask.id ? newTask : task
    );
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/", {
      state: {
        defaultOpenStatus:
          newTask.status === "In Progress" ? "in-progress" : newTask.status,
        highlightId: newTask.id,
      },
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div className="d-flex justify-content-center flex-column p-3 relative mt-4">
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            placeholder="Enter task title"
            value={updatedTask?.title}
            onChange={(e) =>
              setUpdatedTask((prev) =>
                prev ? { ...prev, title: e.target.value } : null
              )
            }
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="taskDescription"
            placeholder="Enter task description"
            rows={5}
            value={updatedTask?.description}
            onChange={(e) =>
              setUpdatedTask((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <Select
            options={statusOptions}
            value={statusOptions.find(
              (opt) => opt.value === updatedTask?.status
            )}
            onChange={(selectedOption: any) =>
              setUpdatedTask((prev: any) =>
                prev ? { ...prev, status: selectedOption.value } : null
              )
            }
            components={{ Option: DotOption, SingleValue: DotSingleValue }}
            isSearchable={false}
            classNamePrefix="status-select"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-38">
          <button
            type="button"
            className="btn btn-cancel action-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-add action-btn"
            onClick={handleUpdateTodo}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTodo;
