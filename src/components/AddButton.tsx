"use client";
import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import PlusIcon from "../assets/icons/plus.svg"

interface Props {
  onClick: () => void;
  iconSrc: boolean;
  label?: string;
  className?: string;
}

const AddButton: React.FC<Props> = ({ onClick, iconSrc, label, className }) => (
  <Button
    onClick={onClick}
    variant="contained"
    color="primary"
    className={className}
  >
    {/* <img className="icon-size-22 mr-6" src={iconSrc} alt="Plus Icon" /> */}
    {iconSrc && (
    //   <Image
    //     className="icon-size-22 mr-6"
    //     src={plusIcon}
    //     alt="Plus Icon"
    //     width={25}
    //     height={25}
    //   />
    <PlusIcon className="w-6 h-6 mr-2 text-gray-500 group-hover:text-white" />
    )}
    {label}
  </Button>
);

export default AddButton;
