import React from "react";
import { Link } from 'react-router-dom';
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

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
  cardHeaderr: {
    padding: 8,
  },
});

const BookItem = (book) => {
  const classes = useStyles();
  const { _id, name, author, file } = book;

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
    </Card>
  );
};

export default BookItem;
