import React from "react";
import { LuClipboardList } from "react-icons/lu";

type ChatItem = {
    id: number;
    icon: string;
    name: string;
};

type ChatHistoryProps = {
    data: ChatItem[];
};

const ChatHistory: React.FC<ChatHistoryProps> = ({ data }) => {
    return (
        <div className="space-y-1">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="group flex gap-3 items-center p-3 cursor-pointer rounded-[8px] hover:bg-[#255285] transition-colors duration-300"
                >
                    <LuClipboardList className="h-6 w-6 text-[#8F8F8F] group-hover:text-white" />
                    <p className="text-[14px] text-black dark:text-white group-hover:text-white transition-colors duration-300">
                        {item.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;
