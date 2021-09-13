import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Notification from "../Feedback/Notification";

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

const AddBook = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add New Book
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.submitForm} encType="multipart/form-data">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name of Book"
            name="name"
            autoComplete="name"
            autoFocus
            value={props.name}
            onChange={props.handleInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="author"
            label="Author"
            type="text"
            id="author"
            value={props.author}
            onChange={props.handleInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pages"
            label="Pages"
            type="number"
            id="pages"
            value={props.pages}
            onChange={props.handleInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            type="number"
            id="price"
            value={props.price}
            onChange={props.handleInput}
          />
          <input type="file" className="form-control" multiple="" onChange={props.handleFile} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // disabled={props.isLoading && true}
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

export default AddBook;
