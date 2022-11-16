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

const IngredientForm: FC = () => {
  const classes = useStyles();

  const { control, register, watch } = useFormContext<IRecipe>();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<
    IRecipe,
    "ingredients",
    "ingredientId"
  >({
    control,
    name: "ingredients",
    keyName: "ingredientId",
  });

  console.log("ingredients are", watch("ingredients"));

  return (
    <Grid container direction="row">
      {fields.map((field, index) => (
        <Grid container item xs={12} key={field.ingredientId}>
          <Grid item>
            <Controller
              name={`instructions.${index}.message`}
              control={control}
              defaultValue={field.name}
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
              ingredientId: fields.length.toString(),
              name: "",
            });
          }}
        >
          Add Ingredient
        </Button>
      </Grid>
    </Grid>
  );
};

export default IngredientForm;
