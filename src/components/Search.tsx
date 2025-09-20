import React from "react";
import { FaSearch } from "react-icons/fa";

const Search: React.FC = () => {
  return (
    <div className="position-relative d-flex align-items-center w-100">
      <input
        type="text"
        placeholder="Search To-do"
        className="form-control pl-4 input-with-icon"
      />
      <FaSearch className="search primary" size="12px" />
    </div>
  );
};

export default Search;
