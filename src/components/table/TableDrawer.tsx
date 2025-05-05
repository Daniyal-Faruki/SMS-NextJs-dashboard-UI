// TableDrawer.tsx
import React, { useState } from "react";
import TableContent from "./TableContent";
import { ComponentNameEnum } from "@/utils/enums";
import { SnackbarProvider } from "../shared/SnackbarContext";
import { EmployeeReward } from "@/models/employee-reward.model";

interface TableColumns {
  label: string;
  key: string;
}

// ✅ Add constraint here
interface TableDrawerProps<T extends Record<string, any>> {
  data: T[];
  columns: TableColumns[];
  organizationKey: string;
  reloadTable: () => void;
  ComponentToLoad: ComponentNameEnum;
  startDate: string;
  endDate: string;
  DrawerComponent: React.ComponentType<{
    selectedRow: T;
    onClose: () => void;
    organizationKey: string;
    reloadTable: () => void;
    startDate?: string;
    endDate?: string;
  }>;
  openDialog?: (reward: EmployeeReward, isEditReward?: boolean) => void;
}

// ✅ Add constraint here
const TableDrawer = <T extends Record<string, any>>({
  data,
  columns,
  organizationKey,
  reloadTable,
  ComponentToLoad,
  startDate,
  endDate,
  DrawerComponent,
  openDialog,
}: TableDrawerProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleRowClick = (row: T) => {
    setSelectedRow(row);
  };

  const handleCloseDrawer = () => setSelectedRow(null);

  return (
    <SnackbarProvider>
      <div className="flex flex-col md:flex-row gap-4 h-full">
        <TableContent
          data={data}
          columns={columns}
          onRowClick={handleRowClick}
          organizationKey={organizationKey}
          reloadTable={reloadTable}
          ComponentToLoad={ComponentToLoad}
          openDrawerForRow={handleRowClick} // ✅ Pass to support action menu
          openDialog={openDialog} 
        />

        {selectedRow && (
          <DrawerComponent
            selectedRow={selectedRow}
            onClose={handleCloseDrawer}
            organizationKey={organizationKey}
            reloadTable={reloadTable}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </div>
    </SnackbarProvider>
  );
};

export default TableDrawer;
