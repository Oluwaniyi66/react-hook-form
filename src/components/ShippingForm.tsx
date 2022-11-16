import { yupResolver } from "@hookform/resolvers/yup";
import { Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles, ThemeOfStyles } from "@mui/styles";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form/dist/controller";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Style } from "util";
import * as yup from "yup";
import { useCheckout } from "../lib/context/CheckoutContext";

import { IShippingBillingInfo } from "../lib/interfaces/IShippingBillingInfo";

const useStyles = makeStyles((theme: Theme) => ({
  rootStyle: {
    margin: theme.spacing(2, 0),
    width: "100%",
    backgroundColor: "white",
  },
  form: {
    margin: theme.spacing(2),
    width: "90%",
  },
  leftField: {
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(0),
    },
    marginRight: theme.spacing(0),
  },
}));

const schema = yup.object().shape({
  name: yup.string().max(300).required(),
  email: yup.string().email().max(256).required(),
  address: yup.string().max(400).required(),
  address2: yup.string().max(100).optional(),
  phone: yup.string().length(10).required(),
  city: yup.string().max(100).required(),
  state: yup.string().length(2).required(),
  zip: yup.string().length(5).required(),
});

interface IShippingFormProps {
  setActiveStep: (page: number) => void;
}

const ShippingForm: FC<IShippingFormProps> = ({
  setActiveStep,
}: IShippingFormProps) => {
  const classes = useStyles();

  const checkoutContext = useCheckout();
  const methods = useForm<IShippingBillingInfo>({
    resolver: yupResolver(schema),
    defaultValues: checkoutContext.state.shippingInfo,
  });

  const onSubmit: SubmitHandler<IShippingBillingInfo> = (
    data: IShippingBillingInfo
  ) => {
    checkoutContext.dispatch({
      type: "updateShippingInfo",
      payload: data,
    });
    setActiveStep(1);
  };
  return (
    <Grid
      container
      item
      direction="column"
      justifyContent="center"
      className={classes.rootStyle}
    >
      <Grid item xs={12}>
        <Typography variant="h2">Shipping</Typography>
      </Grid>
      <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid item xs={12} sm>
          <Controller
            name="address"
            control={methods.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street address or P.O. BOX"
                variant="outlined"
                fullWidth
                margin="dense"
              />
            )}
          />
          </Grid>
        <Grid item xs={12} sm>
          <Controller
            name="address2"
            control={methods.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Apt, suite, unit, building, floor, etc."
                variant="outlined"
                fullWidth
                margin="dense"
              />
            )}
          />
        </Grid>
        <Grid container item xs={12}>
            <Grid item xs={12} sm={6} className={classes.leftField}>
            <Controller
            name="city"
            control={methods.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="city"
                variant="outlined"
                fullWidth
                margin="dense"
              />
            )}
            />
            </Grid>
            <Grid item xs={12} className={classes.leftField}>
            <Controller
            name="state"
            control={methods.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="state"
                variant="outlined"
                fullWidth
                margin="dense"
              />
            )}
            />
            </Grid>
            <Grid item xs={12} sm>
            <Controller
            name="zip"
            control={methods.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="zip"
                variant="outlined"
                fullWidth
                margin="dense"
              />
            )}
            />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">
                  Next
            </Button>

          </Grid>
      </form>
    </Grid>
  );
};
