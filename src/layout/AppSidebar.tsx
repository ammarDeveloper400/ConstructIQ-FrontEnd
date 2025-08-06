import React, { useEffect, useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import Button from "../components/ui/button/Button";
import clipboardIcon from "../icons/clipboard-pen.svg";
import CopyIcon from "../icons/clipboard-list.svg";
import ChatHistory from "./chatHistory";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { useNavigate } from "react-router";

type ChatItem = {
  id: number;
  icon: string;
  name: string;
};

const dummyData: ChatItem[] = [
  { id: 1, icon: CopyIcon, name: "Lorem Ipsum" },
  { id: 2, icon: CopyIcon, name: "Lorem Ipsum" },
  { id: 3, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 4, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 5, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 6, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 7, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 8, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 9, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 10, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 11, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 12, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 13, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 14, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 15, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 16, icon: CopyIcon, name: "Lorem Ipsum" },
  // { id: 17, icon: CopyIcon, name: "Lorem Ipsum" },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const [data, setData] = useState<ChatItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(dummyData);
  }, []);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 
    -0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 md:h-screen h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
    ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`pt-6 pb-2 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Button
        onClick={() => navigate('/')}
          variant="primary"
          size="sm"
          className="w-full"
          startIcon={
            <img src={clipboardIcon} alt="Clipboard" className="size-5" />
          }
        >
          New estimate
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatHistory data={data} />
      </div>

      <div className="flex items-center gap-2 border-t border-t-[#797979] dark:border-t-[#797979] p-5 mt-auto">
        <p>
          <HiOutlineBadgeCheck size={29} color="#8F8F8F" />
        </p>
        <div className="flex flex-col">
          <p className="text-[14px] text-black dark:text-white">
            Upgrade your plan
          </p>
          <p className="text-[12px] text-black dark:text-[#8F8F8F]">
            5 Uploads left
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
