import { FaArrowLeft } from "react-icons/fa6";
import type { HeaderProps } from "../types";
import { useNavigate } from "react-router-dom";

const Header = ({ title, isHome }: HeaderProps) => {
  const navigate = useNavigate();
  const handleBackNavigation = () => {
    navigate("/", { state: { defaultOpenStatus: "in-progress" } });
  };
  return (
    <div className="d-flex align-items-center justify-content-start text-white gap-3 p-3 bg-primary header semi-bold">
      {!isHome && <FaArrowLeft size={24} onClick={handleBackNavigation} />}
      <h3 className="mb-0">{title}</h3>
    </div>
  );
};

export default Header;
