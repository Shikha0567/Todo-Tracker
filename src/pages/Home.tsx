import React from "react";
import Search from "../components/Search";
import Accordion from "../components/Accordion";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateToAddTask = () => {
    navigate("/add-task");
  };
  return (
    <div className="d-flex justify-content-center flex-column p-3 relative">
      <Search />
      <Accordion />
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
