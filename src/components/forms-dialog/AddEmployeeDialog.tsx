import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cross from "../../assets/icons/cross.svg";
import { useApi } from "@/hooks/useApi";
import {
  checkIfEmployeeEmailExists,
  checkIfEmployeeIdExists,
  fetchEmployeeLookups,
} from "@/services/employeesService";
import { handleError } from "@/components/shared/errorHandler";
import { useAuthHeaders } from "@/hooks/useAxiosWithAuth";
import { EmployeeLookup } from "@/models/employeeLookup.model";

interface EmployeeFormValues {
  email: string;
  employeeName: string;
  employeeId: string;
  employmentStatus: string;
  roleUid: string;
  teamUid: string;
  joiningDate: string;
  phoneNo: string;
}

interface AddEmployeeDialogProps {
  open: boolean;
  handleClose: () => void;
  reloadTable: () => void;
  organizationKey: string;
  setOpenSnackbar: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setSnackbarSeverity: (
    severity: "success" | "error" | "warning" | "info"
  ) => void;
}

const AddEmployeeDialog = ({
  open,
  handleClose,
  reloadTable,
  organizationKey,
  setOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}: AddEmployeeDialogProps) => {
  const { getAuthHeaders } = useAuthHeaders();
  const [lookups, setLookups] = useState<EmployeeLookup>({
    employmentStatuses: [],
    roles: [],
    teams: [],
  });
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        employeeName: Yup.string()
          .min(3, "Full Name must be at least 3 characters")
          .required("Full Name is required"),
        employeeId: Yup.string()
          .min(8, "Employee ID must be at least 8 characters")
          .required("Employee ID is required"),
        employmentStatus: Yup.string().required("Job Status is required"),
        roleUid: Yup.string().required("Role is required"),
        teamUid: Yup.string().required("Team is required"),
        joiningDate: Yup.string().required("Date of Joining is required"),
        phoneNo: Yup.string()
          .matches(/^\d+$/, "Phone Number must contain only numbers")
          .min(10, "Phone Number must be at least 10 digits")
          .max(15, "Phone Number must be at most 15 digits")
          .required("Phone Number is required"),
      })
    ),
    mode: "onChange",
    defaultValues: {
      email: "",
      employeeName: "",
      employeeId: "",
      employmentStatus: "",
      roleUid: "",
      teamUid: "",
      joiningDate: "",
      phoneNo: "",
    },
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data: EmployeeLookup = await fetchEmployeeLookups(
          api,
          organizationKey
        );
        setLookups({
          employmentStatuses: data.employmentStatuses,
          roles: data.roles,
          teams: data.teams,
        });
      } catch (error) {
        const errorHandlerMessage = handleError(error);
        setOpenSnackbar(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(errorHandlerMessage);
      }
    };
    if (open) {
      loadResources();
    }
  }, [open, organizationKey, api, setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity]);

  // Handle email change directly with logging
  const handleEmailChange = async (value: string) => {
    console.log("Email field changed:", value);
    // You can call your API to check if the email exists here
    if (value) {
      try {
        const exists = await checkIfEmployeeEmailExists(api, organizationKey, value);
        console.log("Email Exits: ", exists);
        if (!exists.data) {
          setError("email", { type: "manual", message: "Email already exists" });
          console.log("Email Set Error: ");
        } else if(exists.data) {
          console.log("Email Remove Error: ");
          clearErrors("email");
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }
  };

  // Handle employeeId change directly with logging
  const handleEmployeeIdChange = async (value: string) => {
    console.log("Employee ID field changed:", value);
    // You can call your API to check if the employeeId exists here
    if (value) {
      try {
        const exists = await checkIfEmployeeIdExists(api, organizationKey, value);
        if (!exists.data) {
          setError("employeeId", { type: "manual", message: "Employee ID already exists" });
        } else {
          clearErrors("employeeId");
        }
      } catch (error) {
        console.error("Error checking Employee ID:", error);
      }
    }
  };

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      const employeeData = {
        ...data,
        joiningDate: new Date(data.joiningDate).toISOString().split("T")[0],
      };
      setOpenSnackbar(true);
      setSnackbarMessage("Employee Added Successfully");
      setSnackbarSeverity("success");
      reloadTable();
      handleClose();
    } catch (error) {
      const errorHandlerMessage = handleError(error);
      setOpenSnackbar(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(errorHandlerMessage);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "none",
          height: "100%",
          maxHeight: "none",
          margin: "0px",
        },
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        <span className="flex-grow addNewDialogTitle">Add Employee</span>
        <Cross onClick={handleClose} className="w-5 cursor-pointer" />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="justify-self-center w-full max-sm:w-full md:w-1/3 lg:w-1/5">
          <FormGroup className="flex flex-col gap-y-3">
            {/* Email Field */}
            <FormControl error={Boolean(errors.email)}>
              <span className="block text-sm font-medium text-gray-700">Email *</span>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Email"
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      field.onChange(e); // Call the react-hook-form onChange
                      handleEmailChange(e.target.value); // Handle additional custom logic
                    }}
                  />
                )}
              />
              {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
            </FormControl>

            {/* Employee Name Field */}
            <FormControl error={Boolean(errors.employeeName)}>
              <span className="block text-sm font-medium text-gray-700">Employee Name *</span>
              <Controller
                name="employeeName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Employee Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              {errors.employeeName && <FormHelperText>{errors.employeeName.message}</FormHelperText>}
            </FormControl>

            {/* Employee ID Field */}
            <FormControl error={Boolean(errors.employeeId)}>
              <span className="block text-sm font-medium text-gray-700">Employee ID *</span>
              <Controller
                name="employeeId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Employee ID"
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      field.onChange(e);
                      handleEmployeeIdChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.employeeId && <FormHelperText>{errors.employeeId.message}</FormHelperText>}
            </FormControl>

            {/* Employment Status Field */}
            <FormControl error={Boolean(errors.employmentStatus)}>
              <span className="block text-sm font-medium text-gray-700">Employment Status *</span>
              <Controller
                name="employmentStatus"
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth variant="outlined" size="small" displayEmpty>
                    <MenuItem value="" disabled>Select Job Status</MenuItem>
                    {lookups.employmentStatuses.map((status) => (
                      <MenuItem key={status.description} value={status.description}>{status.description}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.employmentStatus && <FormHelperText>{errors.employmentStatus.message}</FormHelperText>}
            </FormControl>

            {/* Role Field */}
            <FormControl error={Boolean(errors.roleUid)}>
              <span className="block text-sm font-medium text-gray-700">Role *</span>
              <Controller
                name="roleUid"
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth variant="outlined" size="small" displayEmpty>
                    <MenuItem value="" disabled>Select Role</MenuItem>
                    {lookups.roles.map((role) => (
                      <MenuItem key={role.uid} value={role.uid}>{role.roleName}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.roleUid && <FormHelperText>{errors.roleUid.message}</FormHelperText>}
            </FormControl>

            {/* Team Field */}
            <FormControl error={Boolean(errors.teamUid)}>
              <span className="block text-sm font-medium text-gray-700">Team *</span>
              <Controller
                name="teamUid"
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth variant="outlined" size="small" displayEmpty>
                    <MenuItem value="" disabled>Select Team</MenuItem>
                    {lookups.teams.map((team) => (
                      <MenuItem key={team.teamName} value={team.uid}>{team.teamName}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.teamUid && <FormHelperText>{errors.teamUid.message}</FormHelperText>}
            </FormControl>

            {/* Joining Date Field */}
            <FormControl error={Boolean(errors.joiningDate)}>
              <span className="block text-sm font-medium text-gray-700">Joining Date *</span>
              <Controller
                name="joiningDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Joining Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
              {errors.joiningDate && <FormHelperText>{errors.joiningDate.message}</FormHelperText>}
            </FormControl>

            {/* Phone Number Field */}
            <FormControl error={Boolean(errors.phoneNo)}>
              <span className="block text-sm font-medium text-gray-700">Phone Number *</span>
              <Controller
                name="phoneNo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Phone Number"
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              {errors.phoneNo && <FormHelperText>{errors.phoneNo.message}</FormHelperText>}
            </FormControl>

            <DialogActions className="mt-4">
              <Button onClick={handleClose} className="btn-white">Cancel</Button>
              <Button type="submit" disabled={!isValid} className={`btn-add-new ${!(isValid) ? 'btn-add-new-disabled cursor-not-allowed' : ''}`}>
                Add Employee
              </Button>
            </DialogActions>
          </FormGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
