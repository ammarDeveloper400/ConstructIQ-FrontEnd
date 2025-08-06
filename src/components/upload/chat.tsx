/* eslint-disable react-hooks/exhaustive-deps */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// src/components/upload/chat.Jsx

import { useEffect, useRef, useState } from "react";

const EstimateJason = {
  project_id: "austin-001234",
  city: "Austin",
  zip_code: "78701",
  permit_type: "HVAC",
  project_scope: "Multifamily Retrofit",
  project_subtype: "Mechanical Systems",
  issue_date: "2023-06-15",
  valuation: 210000,
  valuation_source: "official_record",
  valuation_confidence_score: 0.92,
  valuation_method: "official",
  cq_estimated_value: {
    generated: false,
    fallback_used: false,
    method: null,
    notes: null,
  },
  risk_flags: ["high_fee_variance", "missing_scope_notes"],
  summary: {
    valuation_range: {
      min: 180000,
      max: 250000,
    },
    median_permit_value: 212000,
    mean_permit_value: 218500,
  },
  line_items: [
    {
      category: "Labor",
      description: "HVAC crew installation (multifamily, 4 floors)",
      estimated_cost: 67000,
    },
    {
      category: "Materials",
      description: "Ducting, thermostats, zone controls",
      estimated_cost: 38000,
    },
    {
      category: "Equipment",
      description: "Commercial HVAC units (RTUs, VAVs)",
      estimated_cost: 75000,
    },
  ],
  confidence_score_overall: 0.91,
  agent_name: "BidSmart",
  data_timestamp: "2025-08-04T12:00:00Z",
};

export interface ChatMessage {
  id: number;
  type: number;
  content: (string | object)[];
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setHistory((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: history.length + 2,
        type: 3,
        content: [EstimateJason],
        agent: "AI",
        time: new Date().toISOString(),
      };
      setHistory((prev) => [...prev, responseMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSystemClick = (value: string, type: number, agent: string) => {
    sendMessage(value, type, agent);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderJsonData = (data) => {
    return (
      <div className="bg-[#161D26]  rounded-lg p-4 text-sm">
        {/* Project Header */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-blue-300 mb-2">
            Project Estimate
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-400">Project ID</p>
              <p className="font-mono">{data.project_id}</p>
            </div>
            <div>
              <p className="text-gray-400">Location</p>
              <p>
                {data.city}, {data.zip_code}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Permit Type</p>
              <p>{data.permit_type}</p>
            </div>
            <div>
              <p className="text-gray-400">Issue Date</p>
              <p>{formatDate(data.issue_date)}</p>
            </div>
          </div>
        </div>

        {/* Valuation Section */}
        <div className="mb-6 p-4 bg-[#3F4854] rounded-lg">
          <h4 className="font-bold text-blue-200 mb-3">Valuation Summary</h4>
          <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 mb-3">
            <div className="bg-[#161D26] p-3 rounded">
              <p className="text-gray-400 text-xs">Total Valuation</p>
              <p className="text-xl font-bold">
                {formatCurrency(data.valuation)}
              </p>
            </div>
            <div className="bg-[#161D26] p-3 rounded">
              <p className="text-gray-400 text-xs">Confidence</p>
              <p className="text-xl font-bold">
                {(data.valuation_confidence_score * 100).toFixed(0)}%
              </p>
            </div>
            <div className="bg-[#161D26] p-3 rounded">
              <p className="text-gray-400 text-xs">Valuation Range</p>
              <p className="text-sm">
                {formatCurrency(data.summary.valuation_range.min)} -{" "}
                {formatCurrency(data.summary.valuation_range.max)}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <p>Source: {data.valuation_source.replace("_", " ")}</p>
            <p>Method: {data.valuation_method}</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-6">
          <h4 className="font-bold text-blue-200 mb-3">Cost Breakdown</h4>
          <div className="space-y-3">
            {data.line_items.map((item, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#3F4854] p-3 rounded"
              >
                <div>
                  <p className="font-medium">{item.category}</p>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
                <p className="font-bold">
                  {formatCurrency(item.estimated_cost)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-600 flex justify-between font-bold text-lg">
            <span>Total Estimated Cost</span>
            <span>{formatCurrency(data.valuation)}</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-gray-400">Risk Flags</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.risk_flags.map((flag: string, index: number) => (
                <span
                  key={index}
                  className="bg-red-900/50 text-red-300 px-2 py-1 rounded"
                >
                  {flag.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-400">Generated By</p>
            <p>{data.agent_name}</p>
            <p className="text-gray-400 mt-1">Generated On</p>
            <p>{formatDate(data.data_timestamp)}</p>
          </div>
        </div>
      </div>
    );
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
    <div className="text-white space-y-4 overflow-y-auto">
      {/* Chat history */}
      {history.map((msg, i) => (
        <>
          <div key={msg.id}>
            {msg.agent === "system" && msg.type === 1 ? (
              <SystemMessages
                type={msg.type}
                agent={msg.agent}
                content={msg.content}
              />
            ) : (
              <div
                className={`flex flex-col ${
                  msg.agent === "user"
                    ? "justify-end ml-auto text-right items-end"
                    : "justify-start items-start"
                }`}
              >
                <div
                  className={` ${
                    msg.agent === "user"
                      ? "bg-[#3F4854] px-4 py-2"
                      : "max-w-full"
                  } rounded-md `}
                >
                  {msg.content.map((line, i) => (
                    <div key={i}>
                      {msg.type === 2 ? (
                        <p className="text-white whitespace-pre-wrap text-left break-words">
                          {typeof line === "string"
                            ? line
                            : JSON.stringify(line, null, 2)}
                        </p>
                      ) : typeof line === "string" ? (
                        <p className="text-white whitespace-pre-wrap text-left break-words">
                          {line}
                        </p>
                      ) : (
                        renderJsonData(line)
                      )}
                    </div>
                  ))}
                </div>
                <small className="text-gray-400 block mt-1 text-xs">
                  {new Date(msg.time).toLocaleTimeString()}
                </small>
              </div>
            )}
          </div>

          {isLoading && i === history.length - 1 && (
            <div>
              <div
                aria-label="Loading..."
                role="status"
                class="flex items-center space-x-2"
              >
                <svg
                  class="h-6 w-8 animate-spin stroke-gray-500"
                  // width="25"
                  // height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2V6M16.7 7.8L19.6 4.9M18.5 12H22.5M16.7 16.2L19.6 19.1M12.5 18V22M5.4 19.1L8.3 16.2M2.5 12H6.5M5.4 4.9L8.3 7.8"
                    stroke="#797979"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-md font-normal text-gray-300">
                  Processing answer… Please hold on.
                </span>
              </div>
            </div>
          )}
        </>
      ))}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;
