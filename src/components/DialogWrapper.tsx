"use client";
import React from "react";
import Dialog from "@mui/material/Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  dialogType: string | null;
  dialogConfig: any;
  [key: string]: any;
}

const DialogWrapper: React.FC<Props> = ({
  open,
  onClose,
  dialogType,
  dialogConfig,
  ...props
}) => {
  if (!dialogType) return null;
  const DialogComponent = dialogConfig[dialogType].component;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogComponent {...props} handleClose={onClose} />
    </Dialog>
  );
};

export default DialogWrapper;
