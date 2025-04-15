'use client';

import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ComponentNameEnum } from '@/utils/enums';
import { Employee } from '@/models/Employee.model';
import { EmployeeReward } from '@/models/employee-reward.model';

interface ActionMenuProps {
    item: Employee | EmployeeReward;
    ComponentToLoad: ComponentNameEnum;  // Make sure ComponentToLoad is typed correctly
    organizationKey: string;
    reloadTable: () => void;
  }

const ActionMenu: React.FC<ActionMenuProps> = ({
  item,
  ComponentToLoad,
  organizationKey,
  reloadTable,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log('delete', item);
    handleClose();
    // TODO: Add delete logic with API
  };

  const handleView = () => {
    console.log('view', item);
    handleClose();
    // TODO: Add logic to open detail panel if needed
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ActionMenu;
