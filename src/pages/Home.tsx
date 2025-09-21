import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Accordion from "../components/Accordion";
import { FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import type { tasksType } from "../types";
import { processTasks } from "../utilities";
import { tasks as initialTasks } from "../data";

const Home = () => {
  const [tasks, setTasks] = useState<tasksType[]>([]);
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [openStatus, setOpenStatus] = useState<string>("in-progress");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.defaultOpenStatus) {
      setOpenStatus(location.state.defaultOpenStatus);
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (location.state?.highlightId) {
      setHighlightId(location.state.highlightId);
      const timer = setTimeout(() => setHighlightId(null), 3000);
      return () => clearTimeout(timer);
    }

    const savedTasks = window.localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(processTasks(parsedTasks));
    } else {
      setTasks(processTasks(initialTasks));
      window.localStorage.setItem("tasks", JSON.stringify(initialTasks));
    }
  }, [location, navigate]);

  const navigateToAddTask = () => {
    navigate("/add-task");
  };

  return (
    <div className="d-flex justify-content-center flex-column p-3 relative">
      <Search />
      <Accordion
        tasks={tasks}
        defaultOpenStatus={openStatus}
        highlightId={highlightId ?? undefined}
      />
      <span
        className="add-icon position-absolute bottom-0 end-0 m-3 p-3 rounded-circle bg-primary text-white"
        onClick={navigateToAddTask}
      >
        <FaPlus size={14} />
      </span>
    </div>
  );
};

export default Home;
