import { useEffect, useState } from "react";
import type { tasksListType, tasksType } from "../types";
import TodoCard from "./TodoCard";
import { FaSearch } from "react-icons/fa";
import Loader from "./Loader";

interface AccordionProps {
  tasks: tasksType[];
  defaultOpenStatus?: string;
  highlightId?: number;
}

const Accordion = ({
  tasks,
  defaultOpenStatus,
  highlightId,
}: AccordionProps) => {
  const [tasksList, setTasksList] = useState<tasksListType>({
    pending: [],
    completed: [],
    inProgress: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [searchResult, setSearchResult] = useState<tasksType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setTasksList({
      pending: tasks.filter((task) => task.status === "pending"),
      completed: tasks.filter((task) => task.status === "completed"),
      inProgress: tasks.filter((task) => task.status === "in-progress"),
    });
  }, [tasks]);

  const handleSearch = () => {
    if (!debouncedSearchTerm) {
      setSearchResult([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const filtered =
        tasks?.length > 0
          ? tasks.filter((task) =>
              task.title
                ?.toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase())
            )
          : [];

      setSearchResult(filtered);
      setLoading(false);
    }, 300);
  };

  return (
    <div>
      <div className="position-relative d-flex align-items-center w-100">
        <input
          type="text"
          placeholder="Search To-do"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control pl-4 input-with-icon"
        />
        <FaSearch className="search primary" size="12px" />
      </div>
      <div className="mt-4">
        {/* Loader */}
        {loading && <Loader size="md" />}
        {!searchTerm && tasks.length === 0 && (
          <p className="text-center text-secondary">No tasks found.</p>
        )}
        {searchTerm && searchResult.length > 0 && (
          <div className="card p-2">
            <div className="card-body p-2 overflow-auto search-results">
              {searchResult.map((task) => (
                <TodoCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
        {/* No matching tasks found */}
        {searchTerm && searchResult.length === 0 && (
          <p className="text-center text-secondary">
            No matching tasks found for "<strong>{searchTerm}</strong>"
          </p>
        )}
        {!searchTerm && tasksList && (
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
                  className={`accordion-collapse collapse ${
                    defaultOpenStatus === "in-progress" ? "show" : ""
                  }`}
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="d-flex flex-column">
                      {tasksList.inProgress.map((task) => (
                        <TodoCard
                          key={task.id}
                          task={task}
                          highlightId={highlightId ?? null}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tasksList?.pending?.length > 0 && (
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
                  className={`accordion-collapse collapse ${
                    defaultOpenStatus === "pending" ? "show" : ""
                  }`}
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="d-flex flex-column">
                      {tasksList.pending.map((task) => (
                        <TodoCard
                          key={task.id}
                          task={task}
                          highlightId={highlightId ?? null}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tasksList?.completed?.length > 0 && (
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
                  className={`accordion-collapse collapse ${
                    defaultOpenStatus === "completed" ? "show" : ""
                  }`}
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="d-flex flex-column">
                      {tasksList.completed.map((task) => (
                        <TodoCard
                          key={task.id}
                          task={task}
                          highlightId={highlightId ?? null}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
