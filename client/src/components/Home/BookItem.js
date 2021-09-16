import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Chip from "@material-ui/core/Chip";

import { Document, Page } from "react-pdf";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    minWidth: 220,
    minHeight: 330,
    display: "inline-block",
    marginLeft: 25,
    marginBottom: 30,
  },
  media: {
    height: 200,
  },
  title: {
    fontSize: 14,
  },
  cardActions: {
    position: "absolute",
  },
  icons: {
    display: "inline-block",
    marginLeft: 15,
  },
});

const BookItem = (book) => {
  const classes = useStyles();
  const { name, author, pages, file } = book;

  const onDocumentLoadSuccess = ({ numPages }) => {};

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography className={classes.title}>{_.startCase(name)}</Typography>
        }
        subheader={<span className={classes.title}>{_.startCase(author)}</span>}
      />
      <CardMedia className={classes.media} image="" title={name}>
        <Document file={`/books/${file}`} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} height={210} />
        </Document>
      </CardMedia>
      <CardActions className={classes.cardActions}>
        <Chip
          label={`Pages ${" "}${pages}`}
          variant="outlined"
          color="primary"
          size="small"
          className={classes.icons}
        />
        <IconButton aria-label="add to favorites" className={classes.icons}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" className={classes.icons}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookItem;
