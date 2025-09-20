import { FaArrowLeftLong } from "react-icons/fa6";
import type { HeaderProps } from "../types";

const Header = ({ title, isHome }: HeaderProps) => {
  return (
    <div className="d-flex align-items-center justify-content-start text-white gap-3 p-3 bg-primary header semi-bold">
      {!isHome && <FaArrowLeftLong size={32} />}
      <h3 className="mb-0">{title}</h3>
    </div>
  );
};

export default Header;
