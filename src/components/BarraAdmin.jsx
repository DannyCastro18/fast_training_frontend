import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function BarraAdmin() {
  return (
    <div className="h-full w-24 bg-white  flex flex-col items-center py-6 space-y-6 border border-gray-500 rounded-lg m-4  justify-between shadow-xl">
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
      </div>
    </div>
  );
}

export default BarraAdmin;
