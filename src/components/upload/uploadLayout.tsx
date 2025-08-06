import React, { ReactNode, useState } from "react";
import ConstructIQLogo from "../logo";
import ChatComponent from "./chat.jsx";

type UploadLayoutProps = {
  children: ReactNode;
  chatLayout?: boolean;
  messageInput?: string;
  type?: number;
  agent?: string;
};

const UploadLayout: React.FC<UploadLayoutProps> = ({
  children,
  chatLayout = false,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const [messageSend, setMessageSend] = useState("");
  const handleSend = () => {
    if (!chatLayout) return;
    console.log("Sending message:", messageInput);
    setMessageInput(messageSend);
    setMessageSend("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="h-[97vh] w-full">
        <div className="pb-4 md:flex justify-center  hidden">
        <ConstructIQLogo />
      </div>
      {/* h-[calc(100vh-240px)]                 md:h-[calc(100vh-240px)] h-[calc(100vh-160px)]*/}
      <div className="  pb-18 w-full overflow-auto">
        {children}

        {chatLayout && (
          <div>
            <ChatComponent
              messageInput={messageInput}
              msgType={1}
              msgAgent="user"
            />
          </div>
        )}
      </div>
      </div>

      <div className="w-full  relative">
        <div className="bottom-0 pb-4 py-2 fixed dark:bg-[#1F1F1F] bg-[#fff] lg:w-[50%] pr-2 md:w-[80%] w-[88%]">
          <div className="relative">
          <input
            className="border border-black dark:border-white opacity-50 w-full h-13 px-4 text-black dark:text-white rounded-sm disabled:bg-[#787879] disabled:cursor-not-allowed"
            type="text"
            placeholder="Ask anything.."
            value={messageSend}
            disabled =  {!chatLayout}
            onChange={(e) => setMessageSend(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleSend}
          >
            <path
              d="M10.666 15.9998H21.3327M21.3327 15.9998L15.9993 21.3332M21.3327 15.9998L15.9993 10.6665M29.3327 15.9998C29.3327 23.3636 23.3631 29.3332 15.9993 29.3332C8.63555 29.3332 2.66602 23.3636 2.66602 15.9998C2.66602 8.63604 8.63555 2.6665 15.9993 2.6665C23.3631 2.6665 29.3327 8.63604 29.3327 15.9998Z"
              stroke="#797979"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UploadLayout;
