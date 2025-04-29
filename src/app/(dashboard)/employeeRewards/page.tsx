"use client";
import React, { useEffect, useState } from "react";
import SearchFormWrapper from "@/components/form-fields/SearchFormWrapper";
import { formatDate } from "@/utils/dateUtils"; // Assuming this is for formatting date ranges
import { ComponentNameEnum } from "@/utils/enums"; // Assuming you have an enum for components
import "../../../styles/styles.scss";
import useIsMobile from "@/hooks/useIsMobile";
import TableDrawer from "@/components/table/TableDrawer";
import { Team } from "@/models/team.model";
import { PeriodRangeLookup } from "@/models/periodRangeLookup.model";
import { useApi } from "@/hooks/useApi";
import { EmployeeReward } from "@/models/employee-reward.model";
import SpecificEmployeeRewards from "@/components/table/SpecificEmployeeRewards";
import { getScheduleRangeLookup } from "@/services/lookupService";
import { searchEmployeeRewards } from "@/services/employeeRewardService";
import { handleError } from "@/components/shared/errorHandler";
import ProtectedRoute from "@/auth0Config/ProtectedRoute";
import AddEmployeeRewardDialog from "@/components/forms-dialog/AddUpdateEmployeeRewardDialog";

interface TableColumns {
  label: string;
  key: string;
}

const EmployeeRewardsPage = () => {
  const [formData, setFormData] = useState({
    searchQuery: "",
    toggleValue: "",
    startDate: "",
    endDate: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState({ endDate: "" });
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]); // Use the custom Team type
  const [employees, setEmployees] = useState<EmployeeReward[]>([]); // Use the custom Team type
  const [periodsRange, setPeriodsRange] = useState<PeriodRangeLookup[]>([]); // Use the custom PeriodRangeLookup type
  const [columns, setColumns] = useState<TableColumns[]>([]); // Store dynamic columns
  const api = useApi();

  // Sample data for dialogConfig
  const dialogConfig = {
    "Employee Rewards": {
      label: "Add Reward",
      buttonClass: "btn-add-new",
      component: AddEmployeeRewardDialog,
    },
    // EmployeeRewards: {
    //   label: "Add Reward",
    //   buttonClass: "btn-add-reward",
    // },
  };

  // Fetch lookup data on component mount
  useEffect(() => {
    const getPeriodsLookup = async () => {
      try {
        const data = await getScheduleRangeLookup(api, "ZIN");
        setPeriodsRange(data); // ✅ only update if still mounted
        // console.log("Periods Range in ER: ", data);
      } catch (error: any) {
        console.error("Error fetching schedule periods:", error);
        // Optional: Show snackbar
        // setSnackbarMessage("Failed to load schedule periods.");
        // setSnackbarSeverity("error");
        // setOpenSnackbar(true);
      }
    };

    getPeriodsLookup();
  }, []); // Empty dependency array means this runs only once, on component mount
  
  const fetchEmployeeRewards = async () => {
    try {
      const payload = {
        searchString: formData.searchQuery,
        teams:
          formData.toggleValue.length === 1 && formData.toggleValue[0] === ""
            ? null
            : formData.toggleValue,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };
      const data = await searchEmployeeRewards(api, "ZIN", payload);
      // console.log("Employee Rewards Data: ", data);
        setEmployees(data);
        if (payload.searchString === "" && payload.teams === "") {
          // Extract unique teams from employee data
          const teamNames = filterAvailableTeams(data);
          setTeams(teamNames as Team[]); // Set unique team names to state
        }
        setColumns([
          { label: "Employee", key: "employeeName" },
          { label: "Team", key: "teamName" },
          { label: "Total", key: "total" },
        ]);
    } catch (error) {
      const errorHandlerMessage = handleError(error);
        // setOpenSnackbar(true);
        // setSnackbarSeverity("error");
        // setSnackbarMessage(errorHandlerMessage);
    }
  };

  useEffect(() => {
    fetchEmployeeRewards();
  }, [formData.searchQuery, formData.toggleValue]);

  // this method can be put into shared
  const filterAvailableTeams = (
    data: EmployeeReward[]
  ): { teamName: string; teamUid: string }[] => {
    const TEAM_NAME_SET = new Set<string>();

    return data
      .filter(({ teamName, teamUid }) => {
        // ✅ Ensure both fields exist
        if (!teamName || !teamUid) return false;

        if (TEAM_NAME_SET.has(teamName)) {
          return false;
        }

        TEAM_NAME_SET.add(teamName);
        return true;
      })
      .map(({ teamName, teamUid }) => ({
        teamName: teamName as string,
        teamUid: teamUid as string,
      }));
  };

  // const gridClass = "grid grid-cols-2 gap-4"; // Example grid class
  const ComponentToLoad = "Employee Rewards"; // Or dynamic based on context
  const canCreate = true; // Change this as needed
  const isMobile = useIsMobile(); // Adjust this based on actual media queries (you can use a hook like `useMediaQuery`)

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
    fetchEmployeeRewards();
  };

  const handleFormat = (e: any, newVal: string) => {
    setFormData((prev) => ({ ...prev, toggleValue: newVal }));
  };

  const handleTeamDropdown = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({ ...prev, toggleValue: e.target.value as string }));
  };

  return (
    <ProtectedRoute requiredRoles={['sys-admin', 'rps-admin', 'org-admin', 'user']}> {/* Protect this page with roles */}
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
        organizationKey="ZIN"
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
      <TableDrawer
        data={employees}
        columns={columns}
        organizationKey="ZIN"
        reloadTable={() => console.log("Reloading...")}
        ComponentToLoad={ComponentNameEnum.EmployeeRewards}
        startDate=""
        endDate=""
        DrawerComponent={({ selectedRow, ...rest }) => (
          // <UpdateEmployee employee={selectedRow as Employee} {...rest} />
          <SpecificEmployeeRewards
            employeeUid={selectedRow.employeeUid ?? null}
            startDate={formData.startDate}
            endDate={formData.endDate}
            {...rest}
          />
        )}
      />
    </div>
    </ProtectedRoute>
  );
};

export default EmployeeRewardsPage;
