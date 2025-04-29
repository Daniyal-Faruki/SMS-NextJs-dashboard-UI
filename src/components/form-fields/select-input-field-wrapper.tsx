import React from "react";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectFieldWrapperProps<T extends FieldValues, OptionType> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error: boolean;
  helperText?: string;
  options: OptionType[];
  required?: boolean;
  showPlaceholder?: boolean;
  placeholderText?: string;
  disabled?: boolean;
  getOptionLabel: (option: OptionType) => string;
  getOptionValue: (option: OptionType) => string;
}

const SelectFieldWrapper = <T extends FieldValues, OptionType>({
  label,
  name,
  control,
  error,
  helperText,
  options,
  required = false,
  showPlaceholder = false,
  placeholderText,
  disabled,
  getOptionLabel,
  getOptionValue,
}: SelectFieldWrapperProps<T, OptionType>) => {
  return (
    <FormControl fullWidth error={error} size="small">
      <span className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            variant="outlined"
            displayEmpty
            disabled={disabled}
            onChange={(e: SelectChangeEvent<string>) => field.onChange(e)}
            value={field.value || ""}
            className={`selectFieldWrapper ${error ? "select-input-error" : ""}`} // Add error class if error exists
            // sx={{
            //   // Targeting the root of the Select component
            //   "& .MuiOutlinedInput-root": {
            //     // Outline styling
            //     "& fieldset": {
            //       borderColor: error
            //         ? "rgba(230, 136, 136, 1)" // Red if there's an error
            //         : "rgba(62, 175, 63, 1)", // Green if no error
            //     },
            //     // Styling for hover state
            //     "&:hover fieldset": {
            //       borderColor: error
            //         ? "rgba(230, 136, 136, 1)" // Red on hover if error
            //         : "rgba(62, 175, 63, 1)", // Green on hover if no error
            //     },
            //     // Styling for focused state
            //     "&.Mui-focused fieldset": {
            //       borderColor: error
            //         ? "rgba(230, 136, 136, 1)" // Red when focused if error
            //         : "rgba(62, 175, 63, 1)", // Green when focused if no error
            //     },
            //   },
            //   // Targeting the actual text input inside the Select
            // //   "& .MuiSelect-select": {
            // //     paddingLeft: "10px", // Optional padding to align text correctly
            // //     paddingRight: "30px", // To make space for the dropdown icon
            // //   },
            //   // Targeting the dropdown icon
            //   "& .MuiSvgIcon-root": {
            //     color: error ? "rgba(230, 136, 136, 1)" : "rgba(62, 175, 63, 1)",
            //   },
            // }}
          >
            {showPlaceholder && (
              <MenuItem value="" disabled>
                {placeholderText || `Select ${label}`}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={getOptionValue(option)} value={getOptionValue(option)}>
                {getOptionLabel(option)}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectFieldWrapper;
