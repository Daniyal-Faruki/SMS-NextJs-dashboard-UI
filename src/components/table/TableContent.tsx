import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ActionMenu from "./ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/models/Employee.model";
import { EmployeeReward } from "@/models/employee-reward.model";
import { ComponentNameEnum } from "@/utils/enums";

interface TableContentProps {
  data: (Employee | EmployeeReward)[];
  columns: ColumnDef<Employee | EmployeeReward>[];
  onRowClick: (row: Employee | EmployeeReward) => void;
  organizationKey: string;
  reloadTable: () => void;
  ComponentToLoad: ComponentNameEnum;
}

const TableContent: React.FC<TableContentProps> = ({
  data,
  columns,
  onRowClick,
  organizationKey,
  reloadTable,
  ComponentToLoad,
}) => {
  return (
    <TableContainer
      component={Paper}
      className="bg-white border-1 border-gray-300 flex-grow overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <Table className="table-container">
        <TableHead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#f5f5f5", // Ensure header has a background to overlay content
            zIndex: 3, // Keep the header above the table rows
          }}
        >
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index}>
                {typeof col.header === "function"
                  ? col.header({} as any)
                  : col.header}
              </TableCell>
            ))}
            <TableCell style={{ position: "sticky", right: 0, zIndex: 2 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              className="table-row"
              style={{ cursor: 'pointer' }}
              key={rowIndex}
              hover
              onClick={() => onRowClick(row)}
            >
              {columns.map((col, colIndex) => {
                const accessorKey = (col as any).accessorKey as keyof (
                  | Employee
                  | EmployeeReward
                );
                return (
                  <TableCell key={colIndex}>
                    {accessorKey ? row[accessorKey] : null}
                  </TableCell>
                );
              })}
              <TableCell style={{ position: 'sticky', right: 0, backgroundColor: '#fff', zIndex: 2 }}>
                <ActionMenu
                  item={row}
                  ComponentToLoad={ComponentToLoad}
                  organizationKey={organizationKey}
                  reloadTable={reloadTable}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
