import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cross from '../../assets/icons/cross.svg';//'../../../assets/icons/cross.svg';
import axios from 'axios';
import { handleError } from '@/components/shared/errorHandler';
import { useAuthHeaders } from '@/hooks/useAxiosWithAuth';
import { fetchEmployeeLookups } from '@/services/employeesService';
import { useApi } from '@/hooks/useApi';
import { Team } from "@/models/team.model";
import { EmployeeLookup } from '@/models/employeeLookup.model';

// Interface for the Employee Form Values
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

// Define prop types for AddEmployeeDialog
interface AddEmployeeDialogProps {
    open: boolean;
    handleClose: () => void;
    reloadTable: () => void;
    organizationKey: string;
    setOpenSnackbar: (open: boolean) => void;
    setSnackbarMessage: (message: string) => void;
    setSnackbarSeverity: (severity: 'success' | 'error' | 'warning' | 'info') => void;
  }

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

const AddEmployeeDialog = ({
  open,
  handleClose,
  reloadTable,
  organizationKey,
  setOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity
}: AddEmployeeDialogProps) => {
    const { getAuthHeaders } = useAuthHeaders(); // Using the custom hook
  const [lookups, setLookups] = useState<EmployeeLookup>({
    employmentStatuses: [],
    roles: [],
    teams: []
  });
  const api = useApi();
  const [loading, setLoading] = useState(true);
  console.log("Add Employee Form", open)
  // Fetch employee lookup data
  // const fetchEmployeeLookups = async (organizationKey: string) => {
  //   try {
  //     const headers = await getAuthHeaders(); // If you have a custom header hook
  //     const response = await fetch(`API_URL/${organizationKey}/lookup/GetEmployeeLookups`, { headers });
  //     const data = await response.json();
  //     return data;
  //   //   return { employmentStatuses: [], roles: [], teams: [] }; // Mocked response
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  useEffect(() => {
    if (open) {
      const loadResources = async () => {
        try {
          const data = await fetchEmployeeLookups(api,organizationKey);
          console.log("Employee Lookups Data: ", data);
          setLookups({
            employmentStatuses: [],//data.employmentStatuses.map(({ description }) => description),
            roles: data.roles,
            teams: data.teams
          });

          console.log("setLookups Employee Data: ", lookups);
          setLoading(false);
        } catch (error) {
          const errorHandlerMessage = handleError(error);
          setOpenSnackbar(true);
          setSnackbarSeverity('error');
          setSnackbarMessage(errorHandlerMessage);
          setLoading(false);
        }
      };

      loadResources();
    }
  }, [open, organizationKey]);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test("email-exists", "Email already exists", async function (value) {
        if (!value) return true;
        const exists = await checkIfExists(value, "email");
        return !exists || this.createError({ message: "Email already exists" });
      }),
    employeeId: Yup.string()
      .min(8, "Employee ID must be at least 8 characters")
      .required("Employee ID is required")
      .test("employee-id-exists", "Employee ID already exists", async function (value) {
        if (!value) return true;
        const exists = await checkIfExists(value, "employeeId");
        return !exists || this.createError({ message: "Employee ID already exists" });
      }),
    employeeName: Yup.string().min(3, "Full Name must be at least 3 characters").required("Full Name is required"),
    employmentStatus: Yup.string().required("Job Status is required"),
    roleUid: Yup.string().required("Role is required"),
    teamUid: Yup.string().required("Team is required"),
    joiningDate: Yup.string().required("Date of Joining is required"), // Treating as string for <input type="date">
    phoneNo: Yup.string()
      .matches(/^\d+$/, "Phone Number must contain only numbers")
      .min(10, "Phone Number must be at least 10 digits")
      .max(15, "Phone Number must be at most 15 digits")
      .required("Phone Number is required")
  });

  // useForm hook from React Hook Form
  const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange' // This triggers validation as you type
  });

  // Form submission logic
  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      // Mocked API call for submitting the form data
      const employeeData = {
        ...data,
        joiningDate: new Date(data.joiningDate).toISOString().split('T')[0] // Format date
      };
      // const response = await axios.post(`API_URL/${organizationKey}/employees`, employeeData);
      setOpenSnackbar(true);
      setSnackbarMessage('Employee Added Successfully');
      setSnackbarSeverity('success');
      reloadTable(); // Refresh the table data
      handleClose(); // Close the dialog
    } catch (error) {
      const errorHandlerMessage = handleError(error);
      setOpenSnackbar(true);
      setSnackbarSeverity('error');
      setSnackbarMessage(errorHandlerMessage);
    }
  };

  // Check if email or employeeId already exists
  const checkIfExists = async (value: string, fieldName: string) => {
    try {
    //   Example API request to check if email or employeeId exists
    const headers = await getAuthHeaders(); // Get headers with token

    let url = '';

    if (fieldName === 'email') {
        url = `https://localhost:7192/api/v1/organizations/${organizationKey}/employees/${value}/check-email`;
    } else if (fieldName === 'employeeId') {
        url = `https://localhost:7192/api/v1/organizations/${organizationKey}/employees/${value}/check-employee-id`;
    }

    const response = await axios.get(url, { headers });
      return !response.data; // Returns true if not exists
    } catch (error) {
      console.error(`Error checking ${fieldName}:`, error);
      return false;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex justify-between items-center w-full bg-white">
        <span className="flex-grow addNewDialogTitle">Add Employee</span>
        {/* <img className="icon-size-22 cursor-pointer" src={Cross} alt="Close Icon" onClick={handleClose} /> */}
        <Cross className="w-5 cursor-pointer"  onClick={handleClose}/>
      </DialogTitle>
      <DialogContent className="bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="justify-self-center w-full max-sm:w-full md:w-1/3 lg:w-1/5">
          <FormGroup>
            <FormControl error={Boolean(errors.email)} className="mb-10">
              <span className="form-label-styles">
                Email<span className="text-black">*</span>
              </span>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField {...field} placeholder="Type employee’s email" />}
              />
              {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
            </FormControl>

            <FormControl error={Boolean(errors.employeeId)} className="mb-10">
              <span className="form-label-styles">
                Employee ID<span className="text-black">*</span>
              </span>
              <Controller
                name="employeeId"
                control={control}
                render={({ field }) => <TextField {...field} placeholder="Type employee’s ID" />}
              />
              {errors.employeeId && <FormHelperText>{errors.employeeId.message}</FormHelperText>}
            </FormControl>

            {/* Other fields for employeeName, roleUid, etc., follow a similar structure */}
            
            <FormControl error={Boolean(errors.joiningDate)} className="mb-10">
              <span className="form-label-styles">
                Joining Date<span className="text-black">*</span>
              </span>
              <Controller
                name="joiningDate"
                control={control}
                render={({ field }) => <TextField {...field} type="date" InputLabelProps={{ shrink: true }} />}
              />
              {errors.joiningDate && <FormHelperText>{errors.joiningDate.message}</FormHelperText>}
            </FormControl>

            <FormControl error={Boolean(errors.phoneNo)} className="mb-10">
              <span className="form-label-styles">
                Phone Number<span className="text-black">*</span>
              </span>
              <Controller
                name="phoneNo"
                control={control}
                render={({ field }) => <TextField {...field} placeholder="Phone Number" />}
              />
              {errors.phoneNo && <FormHelperText>{errors.phoneNo.message}</FormHelperText>}
            </FormControl>

          </FormGroup>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" className="btn-white">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`btn-add-new ${!(isValid) ? 'btn-add-new-disabled cursor-not-allowed' : ''}`}
              color="primary"
              disabled={!isValid}
            >
              Add Employee
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
