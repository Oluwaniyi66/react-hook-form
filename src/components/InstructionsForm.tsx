import { Button, Grid, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { IRecipe } from "../lib/interfaces/IRecipe";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    flexGrow: 1,
    minHeight: "100vh",
    backgroundColor: "blue",
  },
}));

const InstructionForm: FC = () => {
  const classes = useStyles();

  const { control, register, watch } = useFormContext<IRecipe>();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<
    IRecipe,
    "instructions",
    "instructionId"
  >({
    control,
    name: "instructions",
    keyName: "instructionId",
  });

  console.log("instructions are", watch("instructions"));

  return (
    <Grid container direction="row">
      {fields.map((field, index) => (
        <Grid container item xs={12} key={field.instructionId}>
          <Grid item>
            <Controller
              name={`instructions.${index}.message`}
              control={control}
              defaultValue={field.message}
              render={({ field }) => <TextField {...field} />}
            />
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                remove(index);
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => {
            append({
              instructionId: fields.length.toString(),
              message: "",
            });
          }}
        >
          Add Instruction
        </Button>
      </Grid>
    </Grid>
  );
};

export default InstructionForm;
