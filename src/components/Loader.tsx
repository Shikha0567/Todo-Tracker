import React from "react";

interface LoaderProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
}

const Loader: React.FC<LoaderProps> = ({ fullscreen = false, size = "md" }) => {
  const sizeClass =
    size === "sm"
      ? "spinner-border-sm"
      : size === "lg"
      ? "spinner-border-lg"
      : "";

  if (fullscreen) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className={`spinner-border text-primary ${sizeClass}`}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
