"use client";
import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";

interface Props {
  onClick: () => void;
  iconSrc: string;
  label?: string;
  className?: string;
}

const AddButton: React.FC<Props> = ({ onClick, iconSrc, label, className }) => (
  <Button onClick={onClick} variant="contained" color="primary" className={className}>
    {/* <img className="icon-size-22 mr-6" src={iconSrc} alt="Plus Icon" /> */}
    <Image className="icon-size-22 mr-6" src={iconSrc} alt="Plus Icon"  width={25} height={25}/>
    {label}
  </Button>
);

export default AddButton;
