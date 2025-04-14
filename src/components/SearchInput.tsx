"use client";
import React from "react";
import TextField from "@mui/material/TextField";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}) => (
  <TextField
    className={`genericSearch ${className}`}
    variant="outlined"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    fullWidth
  />
);

export default SearchInput;
