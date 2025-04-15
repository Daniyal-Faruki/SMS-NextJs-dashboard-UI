"use client";
import React from "react";
import Dialog from "@mui/material/Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  dialogType: string | null;
  dialogConfig: {
    [key: string]: {
      label: string;
      buttonClass: string;
      component: React.ComponentType<any>; // ✅ strongly type component
    };
  };
  [key: string]: any; // additional props passed to the component
}

const DialogWrapper: React.FC<Props> = ({
  open,
  onClose,
  dialogType,
  dialogConfig,
  ...props
}) => {
  if (!dialogType || !dialogConfig[dialogType]?.component) return null;

  const DialogComponent = dialogConfig[dialogType].component;
console.log("dialog wrapper !!!", props);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogComponent {...props} handleClose={onClose} />
    </Dialog>
  );
};

export default DialogWrapper;
