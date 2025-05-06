// TableDrawer.tsx
import React, { useState } from "react";
import TableContent from "./TableContent";
import { ComponentNameEnum } from "@/utils/enums";
import { SnackbarProvider } from "../shared/SnackbarContext";
import { EmployeeReward } from "@/models/employee-reward.model";
import useIsMobile from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile(); // Use the hook to determine if it's a mobile device

  const handleRowClick = (row: T) => {
    setSelectedRow(row); // Set the row when clicked
  };

  const handleCloseDrawer = () => setSelectedRow(null); // Close drawer when done

  return (
    <SnackbarProvider>
      <div className="flex gap-4 h-full">
        {/* For mobile: if a row is selected, hide the table and show the drawer */}
        {isMobile && !selectedRow && (
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
        )}

        {/* If the device is mobile and a row is selected, show only the drawer */}
        {isMobile && selectedRow && (
          <DrawerComponent
            selectedRow={selectedRow}
            onClose={handleCloseDrawer}
            organizationKey={organizationKey}
            reloadTable={reloadTable}
            startDate={startDate}
            endDate={endDate}
          />
        )}

        {/* For larger devices, always show the table */}
        {!isMobile && (
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
        )}
        {/* If the device is not mobile and a row is selected, then show the drawer */}
        {!isMobile && selectedRow && (
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
