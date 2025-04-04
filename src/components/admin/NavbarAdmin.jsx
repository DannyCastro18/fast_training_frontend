import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { useNavbar } from "@/context/NavbarContext";

function NavbarAdmin() {
  const { isExpanded, toggleNavbar } = useNavbar();

  return (
    <div
      className={`bg-white w-16 h-screen m-4 max-h-[calc(100vh-2rem)] flex flex-col items-center shadow-[6px_0_18px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_20px_rgba(0,0,0,0.5)] py-7 transition-all rounded-2xl overflow-y-auto z-1 ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="grid grid-rows-4 text-azul-principal h-3/6">
        <div>
          <i className="fa-solid fa-house text-3xl"></i>
        </div>
        <div>
          <i className="fa-solid fa-users text-3xl"></i>
        </div>
        <div>
          <i className="fa-solid fa-folder-open text-3xl"></i>
        </div>
        <div>
          <i className="fa-solid fa-gear text-3xl"></i>
        </div>
        <div>
          <i className="fa-solid fa-bell text-3xl"></i>
        </div>
      </div>
      <div className="grid grid-rows-3 text-azul-principal h-2/6 ">
        <div>
          <i className="fa-solid fa-moon text-3xl"></i>
        </div>
        <div>
          <i className="fa-solid fa-circle-question text-3xl"></i>
        </div>
        <div>
          <i className="fa-solid fa-door-open text-3xl"></i>
        </div>
        <button
          onClick={toggleNavbar}
          className="transition-transform hover:scale-110 focus:outline-none"
          aria-label={isExpanded ? "Colapsar menú" : "Expandir menú"}
        >
          {isExpanded ? (
            <KeyboardDoubleArrowLeftRoundedIcon className="text-[#205088]" />
          ) : (
            <KeyboardDoubleArrowRightRoundedIcon className="text-[#205088]" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavbarAdmin;
