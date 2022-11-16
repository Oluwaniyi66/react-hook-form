import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { array } from "yup/lib/locale";
import IngredientForm from "../src/components/IngredientForm";
import InstructionForm from "../src/components/InstructionsForm";
import RhookFormTextField from "../src/components/RhookFormTextField";
import { IIngredient } from "../src/lib/interfaces/IIngredient";
import { IInstruction } from "../src/lib/interfaces/IInstruction";
import { IRecipe } from "../src/lib/interfaces/IRecipe";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    flexGrow: 1,
    minHeight: "100vh",
    backgroundColor: "blue",
  },
}));




const ingredientSchema: SchemaOf<IIngredient> = object({
  ingredientId: string().optional(),
  name: string().optional(),
})
const instructionsSchema: SchemaOf<IInstruction> = object({
  instructionId: string().optional(),
  message: string().optional(),
})
const recipeSchema: SchemaOf<IRecipe> = object({
  recipeId: string().optional(),
  title: string().optional(),
  description: string().required("Description is required"),
  // instructions: array().of(instructionsSchema).optional(),
  // ingredients: array().of(ingredientSchema).optional(),

});



const FieldArrayForm: FC = () => {
  const classes = useStyles();

  const methods = useForm<IRecipe>({
    resolver: yupResolver(recipeSchema),
  });

  const submitRecipe: SubmitHandler<IRecipe> = async (data: IRecipe) => {
    console.log("data submitted", data);
  };
  return (
    <Grid container className={classes.rootStyle} sx={{backgroundColor:'burlywood'}}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submitRecipe)}
          style={{ marginTop: "100px", marginLeft: "300px" }}
        >
          <Grid item>
            <RhookFormTextField label="Title" name="title" />
          </Grid>
          <Grid item>
            <RhookFormTextField label="Description" name="description" />
          </Grid>
          <hr />
          <Grid item xs={12}>
            <InstructionForm />
          </Grid>
          <hr />
          <Grid item xs={12}>
            <IngredientForm />
          </Grid>
          
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};

export default FieldArrayForm;
