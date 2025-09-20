import React from "react";
import type { tasksType } from "../types";
import { formatDate } from "../utilities";

const TodoCard = ({ task }: { task: tasksType }) => {
  return (
    <div key={task.id} className="py-2  border-bottom">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <div className="d-flex flex-row align-items-start gap-2">
          <span className="circle me-2">{task.title.charAt(0)}</span>
          <div className="d-flex flex-column">
            <p className="primary fw-semibold mb-0 small">{task.title}</p>
            <p className="mt-1 mb-0 text-secondary font-xs text-black">
              {task.description}
            </p>
            <span className="mt-1 text-secondary font-xs">
              {formatDate(task.created_at)}
            </span>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center gap-1 mt-1">
          <span className={`${task.status}-dot`}></span>
          <span className="small">
            {task.status === "in-progress"
              ? "In Progress"
              : task.status === "completed"
              ? "Completed"
              : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
