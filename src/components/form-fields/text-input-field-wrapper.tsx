import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, FormControl, FormHelperText } from '@mui/material';

interface InputFieldWrapperProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error: boolean;
  helperText?: string;
  required?: boolean;
  type?: 'text' | 'date' | 'email' | 'number' | 'password'; // Extendable types
  placeholder?: string;
}

const InputFieldWrapper = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  helperText,
  required = false,
  type = 'text',
  placeholder,
}: InputFieldWrapperProps<T>) => {
  return (
    <FormControl error={error} fullWidth size="small">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type={type}
            placeholder={placeholder}
            error={error}
            size="small"
            variant="outlined"
            InputLabelProps={type === 'date' ? { shrink: true } : undefined}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: error ? 'rgba(230, 136, 136, 1)' : 'rgba(62, 175, 63, 1)',
                },
                '&:hover fieldset': {
                  borderColor: error ? 'rgba(230, 136, 136, 1)' : 'rgba(62, 175, 63, 1)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: error ? 'rgba(230, 136, 136, 1)' : 'rgba(62, 175, 63, 1)',
                },
              },
            }}
          />
        )}
      />
      {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default InputFieldWrapper;
