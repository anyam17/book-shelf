import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
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
  fileInput: {
    marginTop: 13,
    borderRadius: "8px",
    padding: "18.5px 14px",
    borderWidth: "thin",
    borderStyle: "solid",
  },
  helperTxt: {
    marginLeft: 15,
    color: "#f44336",
    fontSize: "0.75rem",
    marginTop: 3,
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
  }
}));

const AddBook = (props) => {
  const classes = useStyles();
  const redBorder = props.errors.file && {borderColor: "red"};

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
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add New Book
        </Typography>
        <form
          className={classes.form}
          onSubmit={props.handleSubmit((event) => props.submitForm(event))}
        >
          <Field
            component={renderInputField}
            type="text"
            id="name"
            name="name"
            label="Name Of Book"
            autoFocus
          />
          <Field
            component={renderInputField}
            id="author"
            name="author"
            label="Author"
            type="text"
          />
          <Field
            component={renderInputField}
            id="pages"
            name="pages"
            label="Pages"
            type="number"
          />
          <Field
            component={renderInputField}
            id="price"
            name="price"
            label="Price"
            type="number"
          />
          <div style={redBorder}>
            <InputLabel 
              className={classes.fileInput}
              htmlFor="inputBtn"
              error={props.errors.file && true}
            >
              Choose File *{" "}
              <div style={{ float: "right", fontWeight: "bold" }}>
                {props.fileName}
              </div>
            </InputLabel>
            <input
              type="file"
              id="inputBtn"
              style={{ display: "none" }}
              multiple=""
              onChange={props.handleFile}
            />
          </div>
          {props.errors.file && <p className={classes.helperTxt}>{props.errors.file}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.isLoading && true}
            color="primary"
            className={classes.submit}
          >
            {props.isLoading ? "Adding..." : "Add"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={props.resetForm}>
                Cancel
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <Notification message={props.message} type="success" />
    </Container>
  );
};

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Name of book is required";
  }

  if (!values.author) {
    errors.author = "Name of book is required";
  }

  if (!values.pages) {
    errors.pages = "Pages of book is required";
  } else if (isNaN(Number(values.pages))) {
    errors.pages = "Pages must be a number";
  }

  if (!values.price) {
    errors.price = "Price of book is required";
  } else if (isNaN(Number(values.price))) {
    errors.price = "Price must be a number";
  }

  return errors;
}

export default reduxForm({ validate, form: "BookAddForm" })(AddBook);