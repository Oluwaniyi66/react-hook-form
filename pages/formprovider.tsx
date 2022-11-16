import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import RhookFormTextField from "../src/components/RhookFormTextField";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    flexGrow: 1,
    minHeight: "100vh",
    backgroundColor:"blue"
  },
  
}));

interface IFormProps {
  name: string;
  message: string;
}

const formSchema: SchemaOf<IFormProps> = object({
  name: string().required("Name is required"),
  message: string().required("message is required"),
});

const FormProviderPage: FC = () => {
  const classes = useStyles();

  const methods = useForm<IFormProps>({
    resolver: yupResolver(formSchema),
  });

  const submitRecipe: SubmitHandler<IFormProps> = async (data: IFormProps) => {
    console.log("data submitted", data);
  };
  return (
    <Grid container className={classes.rootStyle}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitRecipe)} style={{ marginTop: "100px", marginLeft:"300px"}}>
          <Grid item>
            {/* <TextField
              label="Name"
              variant="outlined"
              error={!!methods.formState.errors.name}
              helperText={methods.formState.errors.name?.message ?? ""}
              fullWidth
              margin="dense"
              {...methods.register("name")}
            /> */}
            <RhookFormTextField label="Name" name="name" />
          </Grid>
          <Grid item>
            {/* <TextField
              label="Message"
              variant="outlined"
              error={!!methods.formState.errors.message}
              helperText={methods.formState.errors.message?.message ?? ""}
              fullWidth
              margin="dense"
              {...methods.register("message")}
            /> */}
            <RhookFormTextField label="Message" name="message" />
          </Grid>
          <hr />
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

export default FormProviderPage;
