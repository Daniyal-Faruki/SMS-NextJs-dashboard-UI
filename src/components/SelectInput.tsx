"use client";
import React from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  value: string; //| string[]; // Allow string for single select, or string[] for multi-select
  onChange: (event: SelectChangeEvent) => void;
  options: Option[];
  placeholder?: string;
  multiple?: boolean;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  multiple = false,
  className = "",
}) => {
  return (
    <FormControl fullWidth className={className}>
      <Select
        multiple={multiple}
        value={value} // value can be string or string[] based on the multiple prop
        onChange={onChange}
        displayEmpty
      >
        <MenuItem value="">{placeholder}</MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
