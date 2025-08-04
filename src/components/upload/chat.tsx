/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";

// export interface ChatMessage {
//   id: number;
//   type: number;
//   content: string[]; // Always an array of strings
//   agent: string;
//   time: string;
// }

// const initialEntries = [
//   "Show me a full estimate for this job.",
//   "Estimate total cost.",
//   "Estimate total time.",
// ];

// const Chat = ({messageInput, msgType, msgAgent}) => {
//   const [history, setHistory] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const now = new Date().toISOString();

//     const initialMessage: ChatMessage = {
//       id: 1,
//       type: 1,
//       content: initialEntries,
//       agent: "system",
//       time: now,
//     };

//     setHistory([initialMessage]);
//   }, []);

//   useEffect(() => {
//     handleSend({type: msgType, agent: msgAgent});
//   }, [messageInput]);

//   const handleSend = ({type, agent}: {type: number; agent: string}) => {
//     if (!input.trim()) return;

//     const newMessage: ChatMessage = {
//       id: history.length + 1,
//       type: type,
//       content: [input.trim()],
//       agent: agent,
//       time: new Date().toISOString(),
//     };

//     setHistory((prev) => [...prev, newMessage]);
//     setInput("");
//   };

//   const SystemMessages = ({
//     content,
//     type,
//     agent,
//   }: {
//     content: string[];
//     type: number;
//     agent: string;
//   }) => {
//     return (
//       <div className="mb-4">
//         {type === 1 && (
//           <div className="flex flex-wrap justify-center items-center gap-4">
//             {content.map((value, idx) => (
//               <div
//                 onClick={() => handleSend(type, agent)}
//                 key={idx}
//                 className="border-2 border-[#5CA9FF] px-4 py-2 text-black cursor-pointer dark:text-white rounded-md font-semibold text-[16px]"
//               >
//                 {value}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="text-white p-4 space-y-4">
//       {/* Chat history */}
//       {history.map((msg) => (
//         // <div key={msg.id} className="bg-[#1f2937] p-3 rounded-md">
//         //   <p className="font-semibold text-[#5CA9FF]">{msg.agent}</p>

//         //   {/* Show cards for system messages */}
//         //   {msg.type === 1 && msg.agent === "system" ? (
//         //     <SystemMessages content={msg.content} />
//         //   ) : (
//         //     <ul className="ml-4 list-disc">
//         //       {msg.content.map((line, i) => (
//         //         <li key={i}>{line}</li>
//         //       ))}
//         //     </ul>
//         //   )}

//         //   <small className="text-gray-400 block mt-1 text-xs">
//         //     {new Date(msg.time).toLocaleTimeString()}
//         //   </small>
//         // </div>

//         <>
//           {msg.agent === "system" && (
//             <SystemMessages
//               type={msg.type}
//               agent="system"
//               content={msg.content}
//             />
//           )}
//         </>
//       ))}

//       {/* Input field */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-1 p-2 rounded-md bg-[#374151] text-white"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         //   onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//         //   onClick={handleSend}
//           className="bg-[#5CA9FF] px-4 py-2 rounded-md text-black font-bold"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;





import { useEffect, useRef, useState } from "react";

export interface ChatMessage {
  id: number;
  type: number;
  content: string[];
  agent: string;
  time: string;
}

const initialEntries = [
  "Show me a full estimate for this job.",
  "Estimate total cost.",
  "Estimate total time.",
];

interface ChatProps {
  messageInput: string;
  msgType: number;
  msgAgent: string;
}

const Chat = ({ messageInput, msgType, msgAgent }: ChatProps) => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date().toISOString();
    const initialMessage: ChatMessage = {
      id: 1,
      type: 1,
      content: initialEntries,
      agent: "system",
      time: now,
    };
    setHistory([initialMessage]);
  }, []);

  useEffect(() => {
    if (messageInput.trim()) {
      sendMessage(messageInput, msgType, msgAgent);
    }
  }, [messageInput]);

  // Scroll to bottom when history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const sendMessage = (text: string, type: number, agent: string) => {
    const newMessage: ChatMessage = {
      id: history.length + 1,
      type,
      content: [text],
      agent,
      time: new Date().toISOString(),
    };

    setHistory((prev) => [...prev, newMessage]);
  };

  const handleSystemClick = (value: string, type: number, agent: string) => {
    sendMessage(value, type, agent);
  };

  const SystemMessages = ({
    content,
    type,
  }: {
    content: string[];
    type: number;
    agent: string;
  }) => (
    <div className="mb-4">
      {type === 1 && (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {content.map((value, idx) => (
            <div
              key={idx}
              onClick={() => handleSystemClick(value, 2, "user")}
              className="border-2 border-[#5CA9FF] px-4 py-2 text-black cursor-pointer dark:text-white rounded-md font-semibold text-[16px]"
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="text-white p-4 space-y-4 max-h-[400px] overflow-y-auto">
      {/* Chat history */}
      {history.map((msg) => (
        <div key={msg.id}>
          {msg.agent === "system" && msg.type === 1 ? (
            <SystemMessages
              type={msg.type}
              agent={msg.agent}
              content={msg.content}
            />
          ) : (
            <div
              className={`flex flex-col max-w-[300px] ${
                msg.agent === "user"
                  ? "justify-end ml-auto text-right items-end"
                  : "justify-start items-start"
              }`}
            >
              <div className="bg-[#3F4854] rounded-md px-4 py-2">
                {msg.content.map((line, i) => (
                  <p key={i} className="text-white">
                    {line}
                  </p>
                ))}
              </div>
              <small className="text-gray-400 block mt-1 text-xs">
                {new Date(msg.time).toLocaleTimeString()}
              </small>
            </div>
          )}
        </div>
      ))}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;
