import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const Subcomponent2: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Controller
        name="firstName"
        control={control}
        defaultValue="ropo"
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email ? errors.email?.message : ""}
          />
        )}
      />

      <br />
      <br />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Oluwaniyi"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : ""}
          />
        )}
      />
    </>
  );
};

export default Subcomponent2;
