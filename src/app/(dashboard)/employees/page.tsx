"use client";
import React, { useEffect, useState } from "react";
import SearchFormWrapper from "@/components/SearchFormWrapper";
import { ComponentNameEnum } from "@/utils/enums"; // Assuming you have an enum for components
import "../../../styles/styles.scss";
import TableDrawer from "@/components/table/TableDrawer";
import { Employee } from "@/models/Employee.model";
import { ColumnDef } from "@tanstack/react-table";
import UpdateEmployee from "@/components/table/UpdateEmployee";
import AddEmployeeDialog from "@/components/FormsDialog/AddEmployeeDialog";
import { Team } from "@/models/team.model";
import { PeriodRangeLookup } from "@/models/periodRangeLookup.model";
import { getScheduleRangeLookup } from "@/services/lookupService";
import { useApi } from "@/hooks/useApi";
import { handleError } from "@/components/shared/errorHandler";

const EmployeesPage = () => {
  const [formData, setFormData] = useState({
    searchQuery: "",
    toggleValue: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState({ endDate: "" });
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]); // Use the custom Team type
  const [periodsRange, setPeriodsRange] = useState<PeriodRangeLookup[]>([]); // Use the custom PeriodRangeLookup type
  const api = useApi();

// Fetch lookup data on component mount
  useEffect(() => {
    let isMounted = true; // 🔒 flag to track mount status
  
    const getPeriodsLookup = async () => {
      try {
        const data = await getScheduleRangeLookup(api, "ZIN");
        if (isMounted) {
          setPeriodsRange(data); // ✅ only update if still mounted
          console.log("Periods Range: ", data);
        }
      } catch (error: any) {
        console.error("Error fetching schedule periods:", error);
        // Optional: Show snackbar
        // setSnackbarMessage("Failed to load schedule periods.");
        // setSnackbarSeverity("error");
        // setOpenSnackbar(true);
      }
    };
  
    getPeriodsLookup();
  
    return () => {
      isMounted = false; 
    };
  }, []);// Empty dependency array means this runs only once, on component mount

  useEffect(() => {
    let isMounted = true;
  
    // Debounced fetch
    const fetchEmployees = useDebounce(async () => {
      try {
        const payload = {
          searchString: formData.searchQuery,
          teams:
            formData.toggleValue.length === 1 && formData.toggleValue[0] === ""
              ? null
              : formData.toggleValue,
        };
  
        const headers = await getAuthHeaders(); // ⛔️ Hook-safe: must be called inside a component or a function
  
        const response = await axios.post(
          `https://localhost:7192/api/v1/organizations/${organizationKey}/employees/search`,
          payload,
          { headers }
        );
  
        const data = response.data;
  
        if (isMounted) {
          setData(data);
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
  
          // if (payload.searchString === "" && payload.teams === null) {
          //   const teamNames = filterAvailableTeams(data); // ✅ still safe
          //   setTeams(teamNames);
          // }
        }
      } catch (error) {
        const errorHandlerMessage = handleError(error);
        // if (isMounted) {
        //   setOpenSnackbar(true);
        //   setSnackbarSeverity("error");
        //   setSnackbarMessage(errorHandlerMessage);
        // }
      }
    }, 500); // ⏱ debounce of 500ms
  
    fetchEmployees(); // 🚀 trigger on mount or dependency change
  
    return () => {
      isMounted = false; // ✅ cleanup to prevent state update on unmounted
    };
  }, [formData.searchQuery, formData.toggleValue, organizationKey]);
  
  

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

  // Sample data for periods
  // const periodsRange = [
  //   { startDate: "2023-01-01", endDate: "2023-06-30" },
  //   { startDate: "2023-07-01", endDate: "2023-12-31" },
  // ];

  // Sample data for teams
  // const teams = [
  //   { teamName: "Team A", teamUid: "team-a" },
  //   { teamName: "Team B", teamUid: "team-b" },
  //   { teamName: "Team C", teamUid: "team-c" },
  //   { teamName: "Team D", teamUid: "team-d" },
  //   { teamName: "Team E", teamUid: "team-e" },
  //   { teamName: "Team F", teamUid: "team-f" },
  // ];

  const employeeColumns: ColumnDef<Employee>[] = [
    {
      id: "1",
      accessorKey: "employeeId",
      header: "Employee ID",
    },
    {
      id: "2",
      accessorKey: "employeeName",
      header: "Name",
    },
    {
      id: "3",
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "4",
      accessorKey: "teamName",
      header: "Team",
    },
  ];

  const employeesMockData: Employee[] = [
    {
      uid: "emp-001",
      employeeId: "E001",
      employeeName: "Alice Johnson",
      email: "alice.johnson@example.com",
      teamName: "Team A",
      teamUid: "team-a",
      isDeleted: false,
    },
    {
      uid: "emp-002",
      employeeId: "E002",
      employeeName: "Bob Smith",
      email: "bob.smith@example.com",
      teamName: "Team B",
      teamUid: "team-b",
      isDeleted: false,
    },
    {
      uid: "emp-003",
      employeeId: "E003",
      employeeName: "Charlie Davis",
      email: "charlie.davis@example.com",
      teamName: "Team C",
      teamUid: "team-c",
      isDeleted: false,
    },
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
      <TableDrawer
        data={employeesMockData}
        columns={employeeColumns}
        organizationKey="org_123"
        reloadTable={() => console.log("Reloading...")}
        ComponentToLoad={ComponentNameEnum.Employees}
        startDate=""
        endDate=""
        DrawerComponent={({ selectedRow, ...rest }) => (
          <UpdateEmployee employee={selectedRow as Employee} {...rest} />
        )}
      />
    </div>
  );
};

export default EmployeesPage;
