import { TextField } from "@mui/material";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

interface IReactHookFormTextFieldProps {
  label: string;
  name: string;
}

const RhookFormTextField : FC<IReactHookFormTextFieldProps> = ({
  label,
  name,
}: IReactHookFormTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
 
  return (
    <TextField
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message ?? ''}
      fullWidth
      margin="dense"
      {...register(name)}
    />
  );
};

export default RhookFormTextField;
