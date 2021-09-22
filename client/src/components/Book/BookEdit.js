import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";

import Notification from "../Feedback/Notification";

const useStyles = makeStyles((theme) => ({
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

export function BookEdit(props) {
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
        placeholder={field.value}
        error={field.meta.touched && field.meta.error ? true : false}
        helperText={field.meta.touched && field.meta.error}
        autoFocus={field.autoFocus}
      />
    );
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
      <form
          className={classes.form}
          onSubmit={props.handleSubmit((event) => props.submitForm(event))}
        >
          <DialogContentText>
            To Edit this book, please fill in the form.
          </DialogContentText>
          
          <Field
            component={renderInputField}
            type="text"
            id="name"
            name="name"
            label="Name Of Book"
            value={props.name}
            autoFocus
          />
          <Field
            component={renderInputField}
            type="text"
            id="author"
            name="author"
            label="Author"
            value={props.author}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.isLoading && true}
            color="primary"
            className={classes.submit}
          >
            {props.isLoading ? "Updating..." : "Update"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={props.resetForm}>
                Cancel
              </Link>
            </Grid>
          </Grid>
        </form>
        </DialogContent>
        

        <Notification message={props.message} type="success" />
      </Dialog>
    </div>
  );
}

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

export default reduxForm({ validate, form: "BookEditForm", enableReinitialize: true })(BookEdit);
