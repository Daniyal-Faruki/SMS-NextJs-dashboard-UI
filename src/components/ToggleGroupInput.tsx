"use client";
import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface Props {
  value: string;
  onChange: (event: any, newValue: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

const ToggleGroupInput: React.FC<Props> = ({ value, onChange, options, className = "" }) => (
  <ToggleButtonGroup
    value={value}
    onChange={onChange}
    className={`w-full flex flex-wrap gap-x-3 overflow-x-auto mt-4 toggle-group ${className}`}
  >
    {options.map((opt) => (
      <ToggleButton key={opt.value} value={opt.value}>
        {opt.label}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);

export default ToggleGroupInput;
