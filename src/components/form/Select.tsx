import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select
      className={`h-13 w-full appearance-none rounded-sm border border-black bg-transparent px-4 py-2.5 pr-11 text-sm placeholder-[#BCBCBC] dark:border-white dark:bg-gray-900 dark:text-white/90 dark:placeholder-[#BCBCBC] ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-[#BCBCBC]"
      } ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >
      <option
        value=""
        disabled
        className="text-[#BCBCBC] dark:text-[#BCBCBC] dark:bg-gray-900"
      >
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-white hover:bg-[#255285]"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
