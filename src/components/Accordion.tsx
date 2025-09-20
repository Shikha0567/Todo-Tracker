import React, { useEffect, useState } from "react";
import { tasks } from "../data";
import { formatDate } from "../utilities";
import type { tasksListType } from "../types";
import TodoCard from "./TodoCard";

const Accordion = () => {
  const [tasksList, setTasksList] = useState<tasksListType>({
    pending: [],
    completed: [],
    inProgress: [],
  });
  useEffect(() => {
    setTasksList({
      pending: tasks.filter((task) => task.status === "pending"),
      completed: tasks.filter((task) => task.status === "completed"),
      inProgress: tasks.filter((task) => task.status === "in-progress"),
    });
  }, []);

  return (
    <div className="mt-4">
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {tasksList.inProgress.length > 0 && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                In Progress (<strong>{tasksList.inProgress.length}</strong>)
              </button>
            </h2>

            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="d-flex flex-column">
                  {tasksList.inProgress.map((task) => (
                    <TodoCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tasksList?.pending?.length && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Pending (<strong>{tasksList.pending.length}</strong>)
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="d-flex flex-column">
                  {tasksList.pending.map((task) => (
                    <TodoCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tasksList?.completed?.length && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Completed (<strong>{tasksList.completed.length}</strong>)
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="d-flex flex-column">
                  {tasksList.completed.map((task) => (
                    <TodoCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
