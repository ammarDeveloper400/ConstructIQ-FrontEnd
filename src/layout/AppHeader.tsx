import React, { useEffect, useRef } from "react";
import { useSidebar } from "../context/SidebarContext";
import UserDropdown from "../components/header/UserDropdown";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between w-full lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {/* Left section (Toggle button) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400 lg:hidden"
              onClick={handleToggle}
              aria-label="Toggle Sidebar"
            >
              {isMobileOpen ? (
                <IoIosArrowBack size={28} />
              ) : (
                <IoIosArrowForward size={28} />
              )}
            </button>
          </div>

          {/* Right section (UserDropdown) - moves to end on large screens */}
          <div className="lg:ml-auto">
            <div className="border-1 border-[#797979] p-2 rounded-md">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;