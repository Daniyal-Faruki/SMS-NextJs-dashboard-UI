"use client";
import React, { useState } from "react";
import SearchFormWrapper from "@/components/SearchFormWrapper";
import { formatDate } from "@/utils/dateUtils"; // Assuming this is for formatting date ranges
import { ComponentNameEnum } from "@/utils/enums"; // Assuming you have an enum for components
import "../../../styles/styles.scss";

const EmployeesPage = () => {
  const [formData, setFormData] = useState({
    searchQuery: "",
    toggleValue: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState({ endDate: "" });
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<string | null>(null);

  // Sample data for dialogConfig
  const dialogConfig = {
    Employees: {
      label: "Add Employee",
      buttonClass: "btn-add-new",
    },
    // EmployeeRewards: {
    //   label: "Add Reward",
    //   buttonClass: "btn-add-reward",
    // },
  };

  // Sample data for periods
  const periodsRange = [
    { startDate: "2023-01-01", endDate: "2023-06-30" },
    { startDate: "2023-07-01", endDate: "2023-12-31" },
  ];

  // Sample data for teams
  const teams = [
    { teamName: "Team A", teamUid: "team-a" },
    { teamName: "Team B", teamUid: "team-b" },
    { teamName: "Team C", teamUid: "team-c" },
    { teamName: "Team D", teamUid: "team-d" },
    { teamName: "Team E", teamUid: "team-e" },
    { teamName: "Team F", teamUid: "team-f" },
  ];

  // const gridClass = "grid grid-cols-2 gap-4"; // Example grid class
  const ComponentToLoad = "Employees"; // Or dynamic based on context
  const canCreate = true; // Change this as needed
  const isMobile = false; // Adjust this based on actual media queries (you can use a hook like `useMediaQuery`)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleSelectChange = (period: any) => {
    setSelectedPeriod(period);
  };

  const openDialog = (type: string) => {
    setDialogType(type);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogType(null);
  };

  const reloadTable = () => {
    console.log("Table reloaded");
  };

  const handleFormat = (e: any, newVal: string) => {
    setFormData((prev) => ({ ...prev, toggleValue: newVal }));
  };

  const handleTeamDropdown = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({ ...prev, toggleValue: e.target.value as string }));
  };

  return (
    <div className="flex flex-col gap-y-8">
      <span className="text-4xl font-semibold">{ComponentToLoad}</span>
      <SearchFormWrapper
        formData={formData}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
        // gridClass={gridClass}
        ComponentToLoad={ComponentToLoad}
        ComponentNameEnum={ComponentNameEnum}
        canCreate={canCreate}
        openDialog={openDialog}
        dialogConfig={dialogConfig}
        open={open}
        dialogType={dialogType}
        closeDialog={closeDialog}
        organizationKey="org-123"
        reloadTable={reloadTable}
        setOpenSnackbar={() => {}}
        setSnackbarMessage={() => {}}
        setSnackbarSeverity={() => {}}
        selectedPeriod={selectedPeriod}
        handleSelectChange={handleSelectChange}
        periodsRange={periodsRange}
        isMobile={isMobile}
        teams={teams}
        handleFormat={handleFormat}
        handleTeamDropdown={handleTeamDropdown}
      />
      {/* Add Table Content Here */}
    </div>
  );
};

export default EmployeesPage;
