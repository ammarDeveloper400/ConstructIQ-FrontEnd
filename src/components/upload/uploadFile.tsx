import React, { useState, ChangeEvent, DragEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";

type FileUploadProps = {
  file: File | null;
  setFile: (file: File) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const [isDragging, setIsDragging] = useState(false);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      console.log("uploaded", uploaded);
      
      if (uploaded.type === "application/pdf") {
        localStorage.setItem("uploadedFile", uploaded.name);
        localStorage.setItem("uploadedFileTags", "#investment1, #construction");
        setFile(uploaded);
      } else {
        toast.error("Only PDF files are allowed.");
        e.target.value = "";
      }
    }

  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast.error("Only PDF files are allowed.");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`transition-all duration-200 h-40 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer 
          ${isDragging ? "border-[#8F8F8F]" : "border-[#8F8F8F]"}
          hover:border-[#8F8F8F]`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex gap-4 items-center justify-center text-center cursor-pointer"
        >
          <MdOutlineFileUpload size={24} color="#8F8F8F" />
          <p className="text-black opacity-50 dark:text-white">
            Drag and drop your blueprint...
          </p>
        </label>
      </div>

      {file && (
        <div className="text-sm text-green-500 font-medium text-center mt-2">
          ✅ {file.name} is ready for upload
        </div>
      )}
    </motion.div>
  );
};

export default FileUpload;
