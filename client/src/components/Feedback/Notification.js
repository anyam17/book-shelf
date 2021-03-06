import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notification(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{marginLeft: "8%"}}
        open={open || props.message ? true : false}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.type}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
