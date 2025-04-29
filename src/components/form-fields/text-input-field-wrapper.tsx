import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, FormControl, FormHelperText } from '@mui/material';

interface InputFieldWrapperProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  type?: 'text' | 'date' | 'email' | 'number' | 'password';
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  disabled,
  multiline,
  rows,
  onChange,
}: InputFieldWrapperProps<T>) => {
  return (
    <FormControl fullWidth size="small">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
            const hasError = error ?? !!fieldState.error;
            const showSuccess = fieldState.isTouched && !hasError && !!field.value?.trim?.();

          const borderColor = hasError
            ? 'rgba(230, 136, 136, 1)' // Red
            : showSuccess
            ? 'rgba(62, 175, 63, 1)' // Green
            : 'rgba(201, 201, 201, 1)'; // Neutral gray

          return (
            <TextField
              {...field}
              fullWidth
              type={type}
              placeholder={placeholder}
              error={hasError}
              size="small"
              variant="outlined"
              multiline={multiline}
              disabled={disabled}
              rows={rows}
              onChange={(e) => {
                field.onChange(e); // react-hook-form tracking
                onChange?.(e);     // custom handler (e.g. debounce)
              }}
              InputLabelProps={type === 'date' ? { shrink: true } : undefined}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderWidth: '1px',
                    borderColor,
                  },
                  '&:hover fieldset': {
                    borderWidth: '1px',
                    borderColor,
                  },
                  '&.Mui-focused fieldset': {
                    borderWidth: '1px',
                    borderColor,
                  },
                },
              }}
            />
          );
        }}
      />

      {helperText && (
        <FormHelperText className="!text-fieldError text-xs">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputFieldWrapper;
