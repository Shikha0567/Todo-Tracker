import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: titleRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      created_at: new Date(),
      updated_at: new Date(),
      status: "pending",
    };
    const existingTasks = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    );
    existingTasks.push(newTask);
    window.localStorage.setItem("tasks", JSON.stringify(existingTasks));
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    navigate("/", { state: { defaultOpenStatus: "pending" } });
  };

  const handleCancel = () => {
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
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
            ref={titleRef}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="taskDescription"
            placeholder="Enter task description"
            rows={5}
            ref={descriptionRef}
          ></textarea>
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
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
