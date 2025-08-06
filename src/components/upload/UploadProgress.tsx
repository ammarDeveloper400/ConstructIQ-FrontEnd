/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Logo from "../logo";

type UploadProgressProps = {
  setInitialScreenning: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadProgress: React.FC<UploadProgressProps> = ({ setInitialScreenning }) => {
  const totalSize = 1430; // in KB
  const [uploaded, setUploaded] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Extracting materials, structure, scope..."
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setUploaded((prev) => {
        if (prev >= totalSize) {
          clearInterval(interval);
          setStatusMessage("Upload Complete.");
          setInitialScreenning(true);
          return totalSize;
        }
        return prev + 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const percent = Math.min(Math.floor((uploaded / totalSize) * 100), 100);

  return (
    <div className="flex flex-col items-center justify-center text-white space-y-4">
      <div className="mb-10">
        <Logo />
      </div>

      <p className="text-sm text-black dark:text-white opacity-50">
        {statusMessage}
      </p>

      <div className="relative w-100 h-100 dark:bg-[#161D26] border border-[#d2d2d2] shadow-lg rounded-xl flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiUpload className="dark:text-white text-black text-3xl mb-2" />
          <p className="dark:text-white text-black text-xl font-medium">{percent}%</p>
          <p className="text-gray-400 text-sm">
            {uploaded}/{totalSize}kb
          </p>
        </div>
      </div>

      <div className="w-100 h-[6px] dark:bg-gray-800 bg-gray-200 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;
