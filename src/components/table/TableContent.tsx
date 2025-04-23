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
import { ComponentNameEnum, RoleTypeEnum } from "@/utils/enums";
import { formatDate } from "@/utils/dateUtils";
import Image from "next/image";
import noImage from "../../assets/icons/noImage.jpg";
import employeeId from "../../assets/icons/employeeId.svg";
import email from "../../assets/icons/mail.svg";
import Phone from "../../assets/icons/Phone.svg";
import CustomSvgIcon from "../shared/CustomSvgIcon";

interface TableColumns {
  label: string;
  key: string;
}

interface TableContentProps<T> {
  data: T[];
  columns: { label: string; key: string }[]; // Column configuration//ColumnDef<TableColumns>[];
  onRowClick: (row: T) => void;
  organizationKey: string;
  reloadTable: () => void;
  ComponentToLoad: ComponentNameEnum;
}

const TableContent = <T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  organizationKey,
  reloadTable,
  ComponentToLoad,
}: TableContentProps<T>) => {
  return (
    <TableContainer
      component={Paper}
      className="bg-white border-1 border-gray-300 flex-grow overflow-y-auto"
      style={{ maxHeight: "calc(95vh - 200px)" }}
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
            {columns.map((column) => {
              //   if (column.key === "employeeId") return null; // add mobile check here isMobile
              //   if (column.key === "total") return null; // add mobile check here isMobile

              // Conditionally render 'job status' if the column label is 'employment status'
              const label =
                column.label === "Employment Status"
                  ? "Job Status"
                  : column.label;

              // Conditionally render icons for specific columns
              let icon = null;
              switch (column.key) {
                case "employeeId":
                  icon = employeeId;
                  break;
                case "email":
                  icon = email;
                  break;
                case "phoneNo":
                  icon = Phone;
                  break;
                default:
                  icon = null;
                  break;
              }

              return (
                <TableCell key={column.key}>
                  {icon && (
                    //   <Image src={icon} className="inline mr-2" alt="app-logo" width={17} />
                    <CustomSvgIcon Icon={icon} size={5} />
                  )}
                  {label}
                </TableCell>
              );
            })}
            <TableCell style={{ position: "sticky", right: 0, zIndex: 2 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              className="table-row"
              style={{ cursor: "pointer" }}
              key={rowIndex}
              hover
              onClick={() => onRowClick(row)}
            >
              {/* {columns.map((col, colIndex) => {
                const accessorKey = (col as any).accessorKey as keyof (
                  | Employee
                  | EmployeeReward
                );
                return (
                  <TableCell key={colIndex}>
                    {accessorKey ? row[accessorKey] : null}
                  </TableCell>
                );
              })} */}
              {columns.map((column) => {
                // <TableCell key={column.key}>
                // 	{(row as Employee | EmployeeReward)[column.key]}
                // </TableCell>
                // Skip rendering employeeId column if it's mobile
                // if (column.kess// add mobile check here isMobile

                return (
                  <TableCell key={column.key}>
                    {/* For the EmployeeName column, show both the name and email */}
                    {column.key === "employeeName" ? (
                      <div className="flex gap-x-2 items-center mr-3">
                        <Image src={noImage} alt="app-logo" width={32} height={32} />
                        <span className="empNameEEmail">
                          <p>{row.employeeName}</p>
                          <p>{row.email}</p>
                          {/* {isMobile && (
                            <p>{row.total ? row.total : row.employeeId}</p>
                          )} */}
                        </span>
                      </div>
                    ) 
                    : column.key === "employeeId" ? ( // add mobile check here isMobile --> && !isMobile
                      <span>{row.employeeId}</span>
                    ) 
                    : column.key === "roleName" && "roleName" in row ? (
                      // Check for Role column
                      <span
                        className={
                          RoleTypeEnum[
                            row.roleName as keyof typeof RoleTypeEnum
                          ] || ""
                        }
                      >
                        {row.roleName}
                      </span>
                    ) 
                    : column.key === "joiningDate" && "joiningDate" in row && row.joiningDate ? (
                      // Check for Phone Number column
                      <span>{formatDate(row.joiningDate)}</span>
                    ) 
                    : (
                      <span>
                        {row[column.key] ?? "-"}
                      </span>
                    )}
                  </TableCell>
                );
              })}
              <TableCell
                style={{
                  position: "sticky",
                  right: 0,
                  backgroundColor: "#fff",
                  zIndex: 2,
                }}
              >
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
