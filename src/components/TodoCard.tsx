import React, { use } from "react";
import type { tasksType } from "../types";
import { formatDate } from "../utilities";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const TodoCard = ({
  task,
  highlightId,
}: {
  task: tasksType;
  highlightId?: number | null;
}) => {
  const navigate = useNavigate();
  const handleUpdateTask = (task: tasksType) => {
    navigate("/update-task", { state: { task } });
  };

  const handleDeleteTask = (task: tasksType) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmDelete) return;
    const existingTasks = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    );
    const updatedTasks = existingTasks.filter(
      (t: tasksType) => t.id !== task.id
    );
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    window.location.reload();
  };
  return (
    <div
      key={task.id}
      className={`py-2 border-bottom ${
        highlightId === task.id ? "highlight" : ""
      }`}
    >
      <div className="d-flex flex-row justify-content-between align-items-start task-card">
        <div className="d-flex flex-row align-items-start gap-2">
          <span className="circle me-2">{task.title.charAt(0)}</span>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center gap-2">
              <p className="primary fw-semibold mb-0 small">{task.title}</p>{" "}
              {task.status === "completed" && (
                <span className="text-success">
                  <TiTick size={20} />
                </span>
              )}
            </div>
            <p className="mt-1 mb-0 text-secondary font-xs text-black">
              {task.description}
            </p>
            <span className="mt-1 text-secondary font-xs">
              {formatDate(task.created_at)}
            </span>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end justify-content-start gap-2 mt-1">
          <div className="d-flex flex-row align-items-center gap-1">
            <span className={`${task.status}-dot`}></span>
            <span className="small">
              {task.status === "in-progress"
                ? "In Progress"
                : task.status === "completed"
                ? "Completed"
                : "Pending"}
            </span>
          </div>

          <span className="d-flex flex-row align-items-center gap-2 mt-2 task-icons">
            {task.status !== "completed" && (
              <MdOutlineEdit
                className="primary ms-2"
                size={16}
                onClick={() => handleUpdateTask(task)}
              />
            )}
            <FaRegTrashCan
              className="text-danger ms-2"
              size={16}
              onClick={() => handleDeleteTask(task)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
