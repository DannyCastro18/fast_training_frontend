"use client";

import Image from "next/image";
import { FaMoon, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white fixed w-full flex justify-end items-center px-6 py-3  rounded-lg space-x-6 z-0">
      <div className="flex items-center space-x-6">
        <FaMoon className="text-[#205088] dark:text-blue text-xl cursor-pointer" />
        <FaBell className="text-[#205088] dark:text-blue text-xl cursor-pointer" />

        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-900 shadow-md">
          <Image
            src="/coach.png"
            alt="Usuario"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
