"use client";
import React from "react";
import DialogWrapper from "../DialogWrapper";
import { formatDate } from "@/utils/dateUtils";
import "../../styles/styles.scss"
import { SearchFormWrapperProps } from "../../models/searchFormWrapperProps.model"
import SearchInput from "./SearchInput";
import SelectInput from "./SelectInput";
import AddButton from "../shared/AddButton";
import ToggleGroupInput from "./ToggleGroupInput";

const SearchFormWrapper: React.FC<SearchFormWrapperProps> = ({
  formData,
  handleSearchChange,
  handleSubmit,
  // gridClass,
  ComponentToLoad,
  ComponentNameEnum,
  canCreate,
  openDialog,
  rewardToEdit,
  dialogConfig,
  open,
  dialogType,
  closeDialog,
  organizationKey,
  reloadTable,
  setOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
  selectedPeriod,
  handleSelectChange,
  periodsRange,
  isMobile,
  teams,
  handleFormat,
  handleTeamDropdown,
}) => {
  	// Conditionally control the grid class based on `componentToLoad`
	const gridClass =
  ComponentToLoad === ComponentNameEnum.Employees
    ? // ? 'grid grid-cols-[1.5fr_4.5fr] items-center max-md:grid-cols-2 max-md:gap-x-2 max-lg:grid-cols-2 max-lg:gap-x-2 gap-x-4 max-sm:flex max-sm:flex-col max-sm:gap-y-1'
    'genSearchAddBtn '
    : ComponentToLoad === ComponentNameEnum.EmployeeRewards
      ? 'grid grid-cols-[1fr_2fr_1fr] items-center max-md:grid-cols-[1.5fr_1.5fr_1fr] max-md:gap-x-2 max-lg:grid-cols-[2fr_1.5fr_1fr] max-lg:gap-x-2 gap-x-12 max-sm:flex max-sm:flex-col max-sm:gap-y-4'
      : '';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-sm:gap-y-4 max-w-full">
      <div className={gridClass}>
        <SearchInput value={formData.searchQuery} onChange={handleSearchChange} />

        {ComponentToLoad === "Employee Rewards" && (
          <SelectInput
            value={selectedPeriod.endDate}
            onChange={(e) => {
              const selected = periodsRange.find(p => p.endDate === e.target.value);
              if (selected) handleSelectChange(selected);
            }}
            options={periodsRange.map(p => ({
              label: `${formatDate(p.startDate)} - ${formatDate(p.endDate)}`,
              value: p.endDate,
            }))}
            placeholder="Select period"
            className="w-full md:!w-1/3"
          />
        )}

        {canCreate && ComponentToLoad === ComponentNameEnum.Employees && (
          <AddButton
            onClick={() => openDialog(ComponentNameEnum.Employees)}
            iconSrc={true}
            label={dialogConfig.Employees.label}
            className={`addEmpBtnRes btn-add-new max-w-fit justify-self-end max-sm:max-w-full ${dialogConfig.Employees.buttonClass}`}
          />
        )}

        {canCreate && ComponentToLoad === ComponentNameEnum.EmployeeRewards && (
          <AddButton
            onClick={() => openDialog(ComponentNameEnum.EmployeeRewards)}
            iconSrc={true}
            label={dialogConfig[ComponentNameEnum.EmployeeRewards].label}
            className={`max-sm:order-1 w-fit max-sm:w-full justify-self-end btn-add-new ${dialogConfig[ComponentNameEnum.EmployeeRewards].buttonClass}`}
          />
        )}

        <DialogWrapper
          open={open}
          onClose={closeDialog}
          dialogType={dialogType}
          dialogConfig={dialogConfig}
          organizationKey={organizationKey}
          reloadTable={reloadTable}
          rewardToEdit={rewardToEdit} 
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      </div>

      {isMobile ? (
        <SelectInput
          value={formData.toggleValue}
          onChange={handleTeamDropdown}
          options={[
            { label: "ALL", value: "" },
            ...teams.map(team => ({ label: team.teamName, value: team.teamUid })),
          ]}
          multiple
        />
      ) : (
        <ToggleGroupInput
          value={formData.toggleValue}
          onChange={handleFormat}
          options={[
            { label: "ALL", value: "" },
            ...teams.map(team => ({ label: team.teamName, value: team.teamUid })),
          ]}
        />
      )}
    </form>
  );
};

export default SearchFormWrapper;
