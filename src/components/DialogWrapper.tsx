"use client";
import { EmployeeReward } from "@/models/employee-reward.model";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  dialogType: string | null;
  dialogConfig: {
    [key: string]: {
      label: string;
      buttonClass: string;
      component: React.ComponentType<any>;
      isEdit?: boolean;
    };
  };
  [key: string]: any;
  rewardToEdit?: EmployeeReward | null;
}

const DialogWrapper: React.FC<Props> = ({
  open,
  onClose,
  dialogType,
  dialogConfig,
  rewardToEdit,
  // isEdit,
  ...props
}) => {
  if (!dialogType || !dialogConfig[dialogType]?.component) return null;

  const DialogComponent = dialogConfig[dialogType].component;

  return (
    <DialogComponent
      open={open}
      handleClose={onClose}
      rewardToEdit={rewardToEdit}
      isEdit={dialogConfig[dialogType].isEdit}
      {...props}
    />
  );
};

export default DialogWrapper;
