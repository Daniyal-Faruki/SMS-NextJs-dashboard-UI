"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiIconButton from "@mui/material/IconButton";
// import axios from 'axios';
// import BasicSnackbar from '@/components/shared/BasicSnackbar';
// import { handleError } from '@/utils/handleError';

interface Employee {
  uid?: string;
  employeeName?: string;
  email?: string;
  phoneNo?: string;
  teamUid?: string;
  roleUid?: string;
}

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
  const [formData, setFormData] = useState<Employee>({ ...employee });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // await axios.put(`/api/employees/${formData.uid}`, formData);

      setSnackbar({
        open: true,
        message: "Employee updated successfully!",
        severity: "success",
      });

      reloadTable();
      onClose();
    } catch (error) {
      // const errMsg = handleError(error);
      setSnackbar({
        open: true,
        message: "Something went wrong!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="p-1">
      <div className="flex justify-end">
        <MuiIconButton size="small" onClick={onClose}>
          <CloseIcon />
        </MuiIconButton>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormControl>
          <TextField
            label="Full Name"
            name="employeeName"
            value={formData.employeeName || ""}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Phone Number"
            name="phoneNo"
            value={formData.phoneNo || ""}
            onChange={handleChange}
            fullWidth
          />
        </FormControl>

        {/* Add teamUid, roleUid etc. as needed */}

        <div className="flex justify-end gap-4 mt-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </div>
      </form>

      {/* 
      <BasicSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      /> 
      */}
    </Box>
  );
};

export default UpdateEmployee;
