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
    openDrawerForRow?: () => void;
    openDialog?: (reward: EmployeeReward, isEditReward?: boolean) => void;
  }

const ActionMenu: React.FC<ActionMenuProps> = ({
  item,
  ComponentToLoad,
  organizationKey,
  reloadTable,
  openDrawerForRow,
  openDialog,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteEmployee = () => {
    console.log('delete', item);
    handleClose();
    // TODO: Add delete logic with API
  };

  const handleAddReward = () => {
    console.log('handleAddReward', item);
    handleClose();
    // TODO: Add delete logic with API
    openDialog?.(item as EmployeeReward,false);  // ✅ Open the dialog for adding rewards
  };

  const handleDisableEmployee = () => {
    console.log('handleDisableEmployee', item);
    handleClose();
    // TODO: Add delete logic with API
  };

  const handleEditemployee = () => {
    console.log('handleEditemployee', item);
    handleClose();
    // TODO: Add logic to open detail panel if needed
  };

  const ViewEmployeeRewards = () => {
    console.log('ViewEmployeeRewards', item);
    handleClose();
    // TODO: Add logic to open detail panel if needed
    openDrawerForRow?.();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {ComponentToLoad === ComponentNameEnum.Employees && (
          <div>
            <MenuItem onClick={handleEditemployee}>Edit information</MenuItem>
            <MenuItem onClick={handleDisableEmployee}>Disable</MenuItem>
            <MenuItem onClick={handleDeleteEmployee}>Delete employee</MenuItem>
          </div>
        )}
        {ComponentToLoad === ComponentNameEnum.EmployeeRewards && (
          <div>
            <MenuItem onClick={ViewEmployeeRewards}>View information</MenuItem>
            <MenuItem onClick={handleAddReward}>Add rewards</MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
};

export default ActionMenu;
