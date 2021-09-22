import React from "react";
import { Link } from 'react-router-dom';
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
    maxWidth: 189,
    minWidth: 180,
    minHeight: 307,
    maxHeight: 307,
    display: "inline-block",
    margin: "10px 0.8%",
    width: "15%",
    // display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 235,
  },
  title: {
    fontSize: 13,
  },
  cardActions: {
    // position: "absolute",
    // marginBottom: 5,
  },
  cardHeaderr: {
    padding: 8,
  },
  icons: {
    display: "inline-block",
    marginLeft: 10,
  },
});

const BookItem = (book) => {
  const classes = useStyles();
  const { _id, name, author, pages, file } = book;

  const onDocumentLoadSuccess = ({ numPages }) => {};

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeaderr}
        title={
          <Typography className={classes.title}>{_.startCase(name)}</Typography>
        }
        subheader={<span className={classes.title}>{_.startCase(author)}</span>}
      />
      <CardMedia className={classes.media} image="" title={name}>
          <Link to={{pathname: `book/${_id}`, state: book}} style={{color:"inherit", textDecoration: 'none'}}>
          <Document file={`/books/${file}`} onLoadSuccess={onDocumentLoadSuccess} height={250}>
            <Page pageNumber={1} height={250} />
          </Document>
        </Link>
      </CardMedia>
      {/*<CardActions className={classes.cardActions}>
        <Chip
          label={`${pages}${" "}p.g`}
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
      </CardActions>*/}
    </Card>
  );
};

export default BookItem;
