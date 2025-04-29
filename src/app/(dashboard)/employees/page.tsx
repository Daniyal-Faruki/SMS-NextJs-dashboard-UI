"use client";
import React, { useEffect, useState } from "react";
import SearchFormWrapper from "@/components/form-fields/SearchFormWrapper";
import { ComponentNameEnum } from "@/utils/enums"; // Assuming you have an enum for components
import "../../../styles/styles.scss";
import TableDrawer from "@/components/table/TableDrawer";
import { Employee } from "@/models/Employee.model";
import { ColumnDef } from "@tanstack/react-table";
import UpdateEmployee from "@/components/table/UpdateEmployee";
import AddEmployeeDialog from "@/components/forms-dialog/AddEmployeeDialog";
import { Team } from "@/models/team.model";
import { PeriodRangeLookup } from "@/models/periodRangeLookup.model";
import { getScheduleRangeLookup } from "@/services/lookupService";
import { useApi } from "@/hooks/useApi";
import { handleError } from "@/components/shared/errorHandler";
import { searchEmployees } from "@/services/employeesService";
import { useOrganization } from "@/context/OrganizationContext";
import useIsMobile from "@/hooks/useIsMobile";
import useAuth0Roles from "@/hooks/useAuth0Roles";
import ProtectedRoute from "@/auth0Config/ProtectedRoute";
import { getPermissions } from "@/utils/roles-permissions-access";

interface TableColumns {
  label: string;
  key: string;
}

const EmployeesPage = () => {
  const [formData, setFormData] = useState({
    searchQuery: "",
    toggleValue: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState({ endDate: "" });
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]); // Use the custom Team type
  const [employees, setEmployees] = useState<Employee[]>([]); // Use the custom Team type
  // const [periodsRange, setPeriodsRange] = useState<PeriodRangeLookup[]>([]); // Use the custom PeriodRangeLookup type
  const [columns, setColumns] = useState<TableColumns[]>([]); // Store dynamic columns
  const api = useApi();
  const { selectedOrg } = useOrganization();
  const [userAccessRoles, setUserAccessRoles] = useState<string[]>([]); 
  const userRoles =  useAuth0Roles();
  const { canView, canEdit, canCreate, canDelete, hasOrgAdminRole, hasRpsAdminRole, hasSysAdminRole,hasUserRole } = getPermissions(userRoles.roles);
  console.log("useAuth0Roles: ", getPermissions(userRoles.roles));
  
  // TODO Here I'll check for roles and make api request accordingly

  useEffect(() => {
    let isMounted = true;
    const fetchEmployees = async () => {
      try {
        const payload = {
          searchString: formData.searchQuery,
          teams:
            formData.toggleValue.length === 1 && formData.toggleValue[0] === ""
              ? null
              : formData.toggleValue,
        };
        const data = await searchEmployees(api, "ZIN", payload); // selectedOrg.org_Key will come here instead of "ZIN"

        if (isMounted) {
          setEmployees(data);
          if (payload.searchString === "" && payload.teams === "") {
            // Extract unique teams from employee data
            const teamNames = filterAvailableTeams(data);
            setTeams(teamNames as Team[]); // Set unique team names to state
          }
          setColumns([
            { label: "Employee", key: "employeeName" },
            { label: "Employee ID", key: "employeeId" },
            { label: "Email", key: "email" },
            { label: "Employment Status", key: "employmentStatus" },
            { label: "Team", key: "teamName" },
            { label: "Role", key: "roleName" },
            { label: "Phone No", key: "phoneNo" },
            { label: "Joining Date", key: "joiningDate" },
          ]);
        }
      } catch (error) {
        const errorHandlerMessage = handleError(error);
        if (isMounted) {
          // setOpenSnackbar(true);
          // setSnackbarSeverity("error");
          // setSnackbarMessage(errorHandlerMessage);
        }
      }
    };

    fetchEmployees();

    return () => {
      isMounted = false;
    };
  }, [formData.searchQuery, formData.toggleValue]);

  const filterAvailableTeams = (
    data: Employee[]
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

  // Sample data for dialogConfig
  const dialogConfig = {
    Employees: {
      label: "Add Employee",
      buttonClass: "btn-add-new",
      component: AddEmployeeDialog, // ✅ Add this!
    },
    // EmployeeRewards: {
    //   label: "Add Reward",
    //   buttonClass: "btn-add-reward",
    //   component: AddReward, // if applicable
    // },
  };

  // const gridClass = "grid grid-cols-2 gap-4"; // Example grid class
  const ComponentToLoad = "Employees"; // Or dynamic based on context
  const can_Create = true; // Change this as needed
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
  };

  const handleFormat = (e: any, newVal: string) => {
    console.log("team clicked: ", formData);
    const lastItem = newVal[newVal.length - 1];
    setFormData((prev) => ({
      ...prev,
      toggleValue: lastItem === "" ? "" : newVal,
    }));
    const ALL_TEAMS = teams.length-1 === formData.toggleValue.length ? true : false;
    if(ALL_TEAMS){
      setFormData((prev) => ({
        ...prev,
        toggleValue: "",
      }));
    }
  };


  // TODO Need logic implementation here 
  const handleTeamDropdown = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({ ...prev, toggleValue: e.target.value as string }));
  };

  return (
    <ProtectedRoute requiredRoles={['sys-admin', 'rps-admin', 'org-admin']}> {/* Protect this page with roles */}
    <div className="flex flex-col gap-y-8">
      <span className="text-4xl font-semibold">{ComponentToLoad}</span>
      <SearchFormWrapper
        formData={formData}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
        // gridClass={gridClass}
        ComponentToLoad={ComponentToLoad}
        ComponentNameEnum={ComponentNameEnum}
        canCreate={can_Create}
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
        periodsRange={[]}
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
        ComponentToLoad={ComponentNameEnum.Employees}
        startDate=""
        endDate=""
        DrawerComponent={({ selectedRow, ...rest }) => (
          <UpdateEmployee employee={selectedRow as Employee} {...rest} />
        )}
      />
    </div>
    </ProtectedRoute>
  );
};

export default EmployeesPage;
