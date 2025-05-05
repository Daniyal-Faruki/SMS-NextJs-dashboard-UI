import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cross from "../../assets/icons/cross.svg";
import { useApi } from "@/hooks/useApi";
import { handleError } from "@/components/shared/errorHandler";
import {
  addEmployeeRewards,
  fetchEmployeeRewardsLookups,
} from "@/services/employeeRewardService";
import { EmployeeRewardLookup } from "@/models/employeeRewardLookup.model";
import InputFieldWrapper from "../form-fields/text-input-field-wrapper";
import SelectFieldWrapper from "../form-fields/select-input-field-wrapper";
import { formatDate } from "@/utils/dateUtils";
import NoUser from "../../assets/icons/noImage.jpg";
import Image from "next/image";
import { EmployeeReward } from "@/models/employee-reward.model";

interface AddRewardFormValues {
  employeeUid: string;
  employeeName: string;
  email: string;
  teamUid: string;
  periodUid: string;
  rewardUid: string;
  remarks: string;
}

interface AddEmployeeRewardDialogProps {
  open: boolean;
  handleClose: () => void;
  organizationKey: string;
  reloadTable: () => void;
  setOpenSnackbar: (open: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setSnackbarSeverity: (
    severity: "success" | "error" | "warning" | "info"
  ) => void;
  rewardToEdit?: EmployeeReward;
  isEdit?: boolean;
}

const rewardSchema: Yup.ObjectSchema<AddRewardFormValues> = Yup.object({
  employeeUid: Yup.string().required("Employee is required"),
  employeeName: Yup.string().required("Employee name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  teamUid: Yup.string().required("Team is required"),
  periodUid: Yup.string().required("Period is required"),
  rewardUid: Yup.string().required("Reward is required"),
  remarks: Yup.string().required("Remarks are required").max(250),
});

const AddEmployeeRewardDialog = ({
  open,
  handleClose,
  reloadTable,
  organizationKey,
  setOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
  rewardToEdit,
  isEdit,
}: AddEmployeeRewardDialogProps) => {
  const api = useApi();
  const [lookups, setLookups] = useState<EmployeeRewardLookup>({
    employees: [],
    teams: [],
    periods: [],
    rewards: [],
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<AddRewardFormValues>({
    resolver: yupResolver(rewardSchema),
    mode: "onTouched",
    defaultValues: {
      employeeUid: "",
      employeeName: "",
      email: "",
      teamUid: "",
      periodUid: "",
      rewardUid: "",
      remarks: "",
    },
  });

  const selectedEmployeeId = watch("employeeUid");

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await fetchEmployeeRewardsLookups(api, organizationKey);
        setLookups(data);
        // If there are periods, set the first one as default
        console.log("IS EDIT REWARDS: ", isEdit);

        if (data.periods?.length > 0 && !isEdit) {
          // formik.setFieldValue('period', lookupData.periods[0].uid);
          setValue("periodUid", data.periods[0].uid);
        }
        // reset(); // Reset with default values after lookups load
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
  }, [open]);

  useEffect(() => {
    if (rewardToEdit) {
      reset({
        employeeUid: rewardToEdit.employeeUid ?? "",
        employeeName: rewardToEdit.employeeName ?? "",
        email: rewardToEdit.email ?? "",
        teamUid: rewardToEdit.teamUid ?? "",
        periodUid: rewardToEdit.periodUid ?? "",
        rewardUid: rewardToEdit.rewardUid ?? "",
        remarks: rewardToEdit.reason ?? "",
      });
    }
  }, [rewardToEdit, reset]);

  useEffect(() => {
    const selectedEmployee = lookups.employees.find(
      (e) => e.uid === selectedEmployeeId
    );
    if (selectedEmployee) {
      setValue("employeeName", selectedEmployee.employeeName ?? "");
      setValue("email", selectedEmployee.email ?? "");
      setValue("teamUid", selectedEmployee.teamUid ?? ""); // Set the employee's team
    }
  }, [selectedEmployeeId, lookups.employees, setValue]);

  const onSubmit = async (data: AddRewardFormValues) => {
    try {
      const payload = {
        employeeUid: data.employeeUid,
        periodUid: data.periodUid,
        rewardUid: data.rewardUid,
        reason: data.remarks,
      };
      if(!isEdit){
        const responseData = await addEmployeeRewards(api, "ZIN", payload);
        console.log("responseData from Add-Rewards: ", responseData);
      } else if (isEdit) {
        // TODO Edit rewards Api Call Here
      }
      console.log("Employee Rewards Data: ", data);
      // setOpenSnackbar(true);
      // setSnackbarMessage("Reward added successfully");
      // setSnackbarSeverity("success");
      reloadTable();
      handleClose();
    } catch (error) {
      const errorMessage = handleError(error);
      setOpenSnackbar(true);
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      console.log("Error in Add-Rewards: ", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
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
        <span className="flex-grow addNewDialogTitle">
          {isEdit ? "Edit Reward" : "Add Reward"}
        </span>
        <Cross onClick={handleClose} className="w-5 cursor-pointer" />
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="justify-self-center w-full max-sm:w-full md:w-1/3 lg:w-1/5"
        >
          <FormGroup className="flex flex-col gap-y-3">
            {/* Employee Autocomplete */}
            <FormControl error={!!errors.employeeUid}>
              <span className="text-sm font-medium">Employee *</span>
              <Controller
                name="employeeUid"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    disabled={isEdit ? true : false}
                    options={lookups.employees}
                    getOptionLabel={(option) => option.employeeName || ""}
                    onChange={(e, value) => {
                      field.onChange(value?.uid || "");
                      setValue("employeeName", value?.employeeName ?? "");
                      setValue("email", value?.email ?? "");
                      setValue("teamUid", value?.teamUid ?? ""); // Set team UID
                    }}
                    value={
                      lookups.employees.find(
                        (emp) => emp.uid === field.value
                      ) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select employee"
                        error={!!errors.employeeUid}
                        variant="outlined"
                        size="small"
                      />
                    )}
                    renderOption={(props, option) => {
                      const { key, ...otherProps } = props; // Destructure key here
                      return (
                        <li
                          key={key}
                          {...otherProps}
                          // style={{
                          //   display: "flex",
                          //   alignItems: "center",
                          //   padding: "8px",
                          // }}
                          className="flex items-center p-2 gap-x-3 cursor-pointer"
                        >
                          <Image
                            src={NoUser}
                            alt="User..."
                            width={35}
                            height={35}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-600">
                              {option.employeeName}
                            </div>
                            <div className="text-sm text-grey-700">
                              {option.email}
                            </div>
                          </div>
                        </li>
                      );
                    }}
                  />
                )}
              />
              {errors.employeeUid && (
                <FormHelperText>{errors.employeeUid.message}</FormHelperText>
              )}
            </FormControl>

            {/* Email (read-only) */}
            <InputFieldWrapper
              label="Email"
              name="email"
              control={control}
              error={!!errors.email}
              helperText={errors.email?.message}
              required={true}
              placeholder="Email@test.com"
              disabled={true}
              //   onChange={(e) => {
              //     debouncedCheckEmail(e.target.value);
              //   }}
            />

            {/* Team */}
            {lookups.teams.length > 0 && (
              <SelectFieldWrapper
                label="Team"
                name="teamUid"
                control={control}
                error={Boolean(errors.teamUid)}
                helperText={errors.teamUid?.message}
                options={lookups.teams}
                required
                disabled={true}
                showPlaceholder={true} // or false for update
                placeholderText="Select Team"
                getOptionLabel={(s) => s.teamName}
                getOptionValue={(s) => s.uid!}
              />
            )}

            {/* Period */}
            {lookups.periods.length > 0 && (
              <FormControl error={Boolean(errors.periodUid)}>
                <span className="text-sm font-medium">Period *</span>
                <Controller
                  name="periodUid"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      size="small"
                      displayEmpty
                      disabled={isEdit ? true : false}
                    >
                      <MenuItem value="" disabled>
                        Select Period
                      </MenuItem>
                      {lookups.periods.map((period) => (
                        <MenuItem key={period.uid} value={period.uid}>
                          {formatDate(period.startDate) +
                            " - " +
                            formatDate(period.endDate)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.periodUid && (
                  <FormHelperText>{errors.periodUid.message}</FormHelperText>
                )}
              </FormControl>
            )}

            {/* Reward */}
            {lookups.teams.length > 0 && (
              <FormControl error={Boolean(errors.rewardUid)}>
                <span className="text-sm font-medium">Achievement *</span>
                <Controller
                  name="rewardUid"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      size="small"
                      displayEmpty
                      disabled={isEdit ? true : false}
                    >
                      <MenuItem value="" disabled>
                        Select Achievement
                      </MenuItem>
                      {lookups.rewards.map((reward) => (
                        <MenuItem key={reward.uid} value={reward.uid}>
                          <p className="flex justify-between w-full items-center">
                            <span className="user">{reward.rewardName}</span>
                            <span>{reward.points}</span>
                          </p>
                          {/* {reward.rewardName} */}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.rewardUid && (
                  <FormHelperText>{errors.rewardUid.message}</FormHelperText>
                )}
              </FormControl>
            )}

            {/* Remarks */}
            <InputFieldWrapper
              label="Remarks"
              name="remarks"
              control={control}
              error={!!errors.remarks}
              helperText={errors.remarks?.message}
              required={true}
              multiline={true}
              rows={4}
              placeholder="Write why this employee deserve this achievement"
            />

            {/* Actions */}
            <DialogActions className="mt-4">
              <Button onClick={handleClose} className="btn-white">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className={`btn-add-new ${
                  !isValid ? "btn-add-new-disabled cursor-not-allowed" : ""
                }`}
              >
                {/* TODO icon missing here  */}
                {isEdit ? "Save Changes" : "Add Reward"}
              </Button>
            </DialogActions>
          </FormGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeRewardDialog;
