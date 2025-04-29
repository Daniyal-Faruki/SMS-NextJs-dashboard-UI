"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiIconButton from "@mui/material/IconButton";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "lodash.debounce";
import Edituser from "../../assets/icons/user.svg";
import {
  checkIfEmployeeEmailExists,
  checkIfEmployeeIdExists,
  fetchEmployeeLookups,
} from "@/services/employeesService";
import { useApi } from "@/hooks/useApi";
import { Employee } from "@/models/Employee.model";
import { EmployeeLookup } from "@/models/employeeLookup.model";
import { handleError } from "../shared/errorHandler";
import InputFieldWrapper from "../form-fields/text-input-field-wrapper";
import SelectFieldWrapper from "../form-fields/select-input-field-wrapper";

interface UpdateEmployeeProps {
  employee: Employee;
  onClose: () => void;
  organizationKey: string;
  reloadTable: () => void;
}

const UpdateEmployee: React.FC<UpdateEmployeeProps> = ({
  employee,
  onClose,
  organizationKey,
  reloadTable,
}) => {
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const [lookups, setLookups] = useState<EmployeeLookup>({
    employmentStatuses: [],
    roles: [],
    teams: [],
  });
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
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
      employeeName: employee.employeeName || "",
      email: employee.email || "",
      phoneNo: employee.phoneNo || "",
      employeeId: employee.employeeId || "",
      employmentStatus: employee.employmentStatus || "",
      roleUid: employee.roleUid || "",
      teamUid: employee.teamUid || "",
      joiningDate: employee.joiningDate
        ? new Date(employee.joiningDate).toISOString().split("T")[0]
        : "",
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
        // setOpenSnackbar(true);
        // setSnackbarSeverity("error");
        // setSnackbarMessage(errorHandlerMessage);
      }
    };
    if (employee) {
      loadResources();
    }
  }, [
    open,
    organizationKey,
    api,
    // setOpenSnackbar,
    // setSnackbarMessage,
    // setSnackbarSeverity,
  ]);

  const debouncedCheckEmail = useCallback(
    debounce(async (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        return; // Skip API call if invalid email
      }
      if (value && value !== employee.email) {
        try {
          const exists = await checkIfEmployeeEmailExists(
            api,
            organizationKey,
            value
          );
          console.log("Debounced Employee Email Check:", exists);
          if (exists) {
            setError("email", {
              type: "manual",
              message: "Email already exists",
            });
          } else {
            clearErrors("email");
          }
        } catch (error) {
          console.error("Error checking email:", error);
        }
      }
    }, 300),
    []
  );

  const debouncedCheckEmployeeId = useCallback(
    debounce(async (value: string) => {
      if (value && value !== employee.employeeId && value.length >= 8) {
        try {
          const exists = await checkIfEmployeeIdExists(
            api,
            organizationKey,
            value
          );
          console.log("Debounced Employee Id Check:", exists);
          if (exists) {
            setError("employeeId", {
              type: "manual",
              message: "Employee ID already exists",
            });
          } else {
            clearErrors("employeeId");
          }
        } catch (error) {
          console.error("Error checking Employee ID:", error);
        }
      } else {
        clearErrors("employeeId");
      }
    }, 300),
    []
  );

  const onSubmit = async (data: Employee) => {
    setLoading(true);
    try {
      // await axios.put(`/api/employees/${employee.uid}`, data);

      reloadTable();
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="p-1 w-full max-w-96 border rounded-xl ">
      <div className="flex justify-end">
        <MuiIconButton size="small" onClick={onClose}>
          <CloseIcon />
        </MuiIconButton>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 update-employees-fields lg:px-3"
      >
        <div className="flex items-start gap-x-4">
          <Edituser className="w-10 rounded-full p-2 border-zinc-400 border bg-gray-200" />
          <InputFieldWrapper
            label=""
            name="employeeName"
            control={control}
            error={!!errors.employeeName}
            helperText={errors.employeeName?.message}
            required={false}
          />
          {/* <FormControl error={Boolean(errors.employeeName)}>
            <Controller
              name="employeeName"
              control={control}
              render={({ field }) => (
                <TextField {...field} size="small" fullWidth />
              )}
            />
            {errors.employeeName && (
              <FormHelperText>{errors.employeeName.message}</FormHelperText>
            )}
          </FormControl> */}
        </div>

        <InputFieldWrapper
          label="Email"
          name="email"
          control={control}
          error={!!errors.email}
          helperText={errors.email?.message}
          required={true}
          onChange={(e) => {
            debouncedCheckEmail(e.target.value);
          }}
        />
        {/* <FormControl error={Boolean(errors.email)}>
          <span className="block text-sm font-medium text-gray-700">
            Email *
          </span>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  debouncedCheckEmail(e.target.value);
                }}
              />
            )}
          />
          {errors.email && (
            <FormHelperText>{errors.email.message}</FormHelperText>
          )}
        </FormControl> */}

        <InputFieldWrapper
          label="Employee ID"
          name="employeeId"
          control={control}
          error={!!errors.employeeId}
          helperText={errors.employeeId?.message}
          required={true}
          onChange={(e) => {
            debouncedCheckEmployeeId(e.target.value);
          }}
        />

        {/* <FormControl error={Boolean(errors.employeeId)}>
          <span className="block text-sm font-medium text-gray-700">
            Employee ID *
          </span>
          <Controller
            name="employeeId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                  debouncedCheckEmployeeId(e.target.value);
                }}
              />
            )}
          />
          {errors.employeeId && (
            <FormHelperText>{errors.employeeId.message}</FormHelperText>
          )}
        </FormControl> */}

        {/* Employment Status Field */}
        {lookups.teams.length > 0 && (
          <SelectFieldWrapper
            label="Job Status"
            name="employmentStatus"
            control={control}
            error={Boolean(errors.employmentStatus)}
            helperText={errors.employmentStatus?.message}
            options={lookups.employmentStatuses}
            required
            showPlaceholder={false} // or false for update
            placeholderText="Select Job Status"
            getOptionLabel={(s) => s.description}
            getOptionValue={(s) => s.description}
          />
        )}
        {/* <FormControl error={Boolean(errors.employmentStatus)}>
          <span className="block text-sm font-medium text-gray-700">
            Employment Status *
          </span>
          {lookups.employmentStatuses.length > 0 && (
            <Controller
              name="employmentStatus"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  variant="outlined"
                  size="small"
                  displayEmpty
                >
                  {lookups.employmentStatuses.map((status) => (
                    <MenuItem
                      key={status.description}
                      value={status.description}
                    >
                      {status.description}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          )}
          {errors.employmentStatus && (
            <FormHelperText>{errors.employmentStatus.message}</FormHelperText>
          )}
        </FormControl> */}

        {/* Role Field */}
        {lookups.teams.length > 0 && (
          <SelectFieldWrapper
            label="Role"
            name="roleUid"
            control={control}
            error={!!errors.roleUid}
            helperText={errors.roleUid?.message}
            options={lookups.roles}
            required
            showPlaceholder={false} // or false for update
            placeholderText="Select Role"
            getOptionLabel={(s) => s.roleName}
            getOptionValue={(s) => s.uid}
          />
        )}
        {/* <FormControl error={Boolean(errors.roleUid)}>
          <span className="block text-sm font-medium text-gray-700">
            Role *
          </span>
          {lookups.roles.length > 0 && (
            <Controller
              name="roleUid"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  variant="outlined"
                  size="small"
                  displayEmpty
                >
                  {lookups.roles.map((role) => (
                    <MenuItem key={role.uid} value={role.uid}>
                      {role.roleName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          )}
          {errors.roleUid && (
            <FormHelperText>{errors.roleUid.message}</FormHelperText>
          )}
        </FormControl> */}

        {/* Team Field */}
        {lookups.teams.length > 0 && (
          <SelectFieldWrapper
            label="Team"
            name="teamUid"
            control={control}
            error={!!errors.teamUid}
            helperText={errors.teamUid?.message}
            options={lookups.teams}
            required
            showPlaceholder={false} // or false for update
            placeholderText="Select Role"
            getOptionLabel={(s) => s.teamName}
            getOptionValue={(s) => s.uid!}
          />
        )}
        {/* <FormControl error={Boolean(errors.teamUid)}>
          <span className="block text-sm font-medium text-gray-700">
            Team *
          </span>
          {lookups.teams.length > 0 && (
            <Controller
              name="teamUid"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  variant="outlined"
                  size="small"
                  displayEmpty
                >
                  {lookups.teams.map((team) => (
                    <MenuItem key={team.teamName} value={team.uid}>
                      {team.teamName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          )}
          {errors.teamUid && (
            <FormHelperText>{errors.teamUid.message}</FormHelperText>
          )}
        </FormControl> */}

        {/* Joining Date Field */}
        <InputFieldWrapper
          label="Joining Date"
          name="joiningDate"
          control={control}
          error={!!errors.joiningDate}
          helperText={errors.joiningDate?.message}
          required
          type="date"
        />
        {/* <FormControl error={Boolean(errors.joiningDate)}>
          <span className="block text-sm font-medium text-gray-700">
            Joining Date *
          </span>
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
          {errors.joiningDate && (
            <FormHelperText>{errors.joiningDate.message}</FormHelperText>
          )}
        </FormControl> */}

        <InputFieldWrapper
          label="Phone Number"
          name="phoneNo"
          control={control}
          error={!!errors.phoneNo}
          helperText={errors.phoneNo?.message}
          required={true}
        />
        {/* <FormControl error={Boolean(errors.phoneNo)}>
          <span className="block text-sm font-medium text-gray-700">
            Phone Number *
          </span>
          <Controller
            name="phoneNo"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" fullWidth />
            )}
          />
          {errors.phoneNo && (
            <FormHelperText>{errors.phoneNo.message}</FormHelperText>
          )}
        </FormControl> */}

        <div className="flex justify-end gap-4 mt-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!isValid || loading}
            className={`btn-add-new ${
              !isValid ? "btn-add-new-disabled cursor-not-allowed" : ""
            }`}
          >
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default UpdateEmployee;
