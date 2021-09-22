import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Notification from "../Feedback/Notification";
import { Field, reduxForm } from "redux-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const renderInputField = (field) => {
    return (
      <TextField
        {...field.input}
        variant="outlined"
        margin="normal"
        fullWidth
        type={field.type}
        id={field.id}
        name={field.name}
        label={field.label}
        error={field.meta.touched && field.meta.error ? true : false}
        helperText={field.meta.touched && field.meta.error}
        autoFocus={field.autoFocus}
      />
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.handleSubmit((event) => props.submitForm(event))}>
          <Field
            component={renderInputField}
            type="text"
            id="email"
            name="email"
            label="Email Address"
            autoFocus
          />
          <Field
            component={renderInputField}
            type="password"
            id="password"
            name="password"
            label="Password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.isLoading && true}
            color="primary"
            className={classes.submit}
          >
            {props.isLoading ? "Signing in ..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2" style={{ color: "#009be5" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to={`/register`}
                variant="body2"
                style={{ color: "#009be5" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      {props.success ? (
        <Notification message={props.message} type="success" />
      ) : (
        <Notification message={props.message} type="error" />
      )}
    </Container>
  );
};

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email address required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 7) {
    errors.password = "Password length must be greater than 6 characters";
  }

  return errors;
}

export default reduxForm({ validate, form: "LoginForm" })(Login);
