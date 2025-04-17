// TableDrawer.tsx
import React, { useState } from "react";
import TableContent from "./TableContent";
import { ComponentNameEnum } from "@/utils/enums";
import { SnackbarProvider } from "../shared/SnackbarContext";
import { Employee } from "@/models/Employee.model";
import { EmployeeReward } from "@/models/employee-reward.model";
import type { ColumnDef } from "@tanstack/react-table";

interface TableColumns {
	label: string;
	key: string;
}

interface TableDrawerProps {
  data: (Employee | EmployeeReward)[];
  columns: { label: string; key: string }[]; // Column configuration//ColumnDef<TableColumns>[];
  organizationKey: string;
  reloadTable: () => void;
  ComponentToLoad: ComponentNameEnum;
  startDate: string;
  endDate: string;
  DrawerComponent: React.ComponentType<{
    selectedRow: Employee | EmployeeReward;
    onClose: () => void;
    organizationKey: string;
    reloadTable: () => void;
    startDate?: string;
    endDate?: string;
  }>;
}

const TableDrawer: React.FC<TableDrawerProps> = ({
  data,
  columns,
  organizationKey,
  reloadTable,
  ComponentToLoad,
  startDate,
  endDate,
  DrawerComponent,
}) => {
  const [selectedRow, setSelectedRow] = useState<Employee | EmployeeReward | null>(null);

  const handleRowClick = (row: Employee | EmployeeReward) => {
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
