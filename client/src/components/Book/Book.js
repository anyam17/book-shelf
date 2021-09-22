import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import _ from "lodash";
import {
  Box,
  Container,
  Grid,
  Card,
  Chip,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Button,
  IconButton,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { convertFromBytesTo } from "../../utils";
import { addToFavorite } from "../../actions/book";
import Notification from "../Feedback/Notification";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Book = (props) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const { _id, name, author, pages, file, createdAt, review, rating, size } = location.state;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const increment = ({ pageNumber }) => {
    setPageNumber(pageNumber + 1);
  };

  const handleAddToFavorite = (e, id) => {
    e.preventDefault();
    dispatch(addToFavorite(id, props.auth.id));
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xl={3} xs={12}>
              <Card>
                <CardHeader title={_.startCase(name)} />
                <CardContent>
                  By <strong>{_.startCase(author)} </strong>
                  <br />
                  <br />
                  File size: <strong>{convertFromBytesTo(size)}</strong>
                </CardContent>
                <Divider />
                <Grid container spacing={2} style={{ padding: 10 }}>
                  <Grid item lg={12} sm={6} xl={3} xs={12}>
                    <Card>
                      <CardHeader title={`Description`} />
                      <CardContent>None</CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ padding: 10 }}>
                  <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <Card>
                      <CardHeader />
                      <CardContent>Share</CardContent>
                    </Card>
                  </Grid>

                  <Grid item lg={6} sm={6} xl={3} xs={12}>
                    <Card>
                      <CardHeader />
                      <CardContent>
                        <CardActions>
                          <IconButton
                            onClick={(e) => handleAddToFavorite(e, _id)}
                            aria-label="add to favorites"
                            style={{ display: "inline-block" }}
                          >
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="share"
                            style={{ display: "inline-block" }}
                          >
                            <ShareIcon />
                          </IconButton>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item lg={6} md={12} xl={9} xs={12}>
              <Card>
                <CardHeader
                  action={
                    <div>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => this.decrement()}
                      >
                        Prev
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        onClick={(pageNumber) => increment(pageNumber)}
                      >
                        Next
                      </Button>
                      <Button size="small" variant="text">
                        Page {pageNumber} of {numPages}
                      </Button>
                    </div>
                  }
                  title="Document View"
                />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      // height: 400,
                      position: "relative",
                    }}
                  >
                    <Document
                      file={`/books/${file}`}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {props.success ? (
          <Notification message={props.message} type="success" />
        ) : (
          <Notification message={props.message} type="error" />
        )}
      </Box>
    </>
  );
};

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        message: state.books.message,
        success: state.books.success,
    };
}

export default connect(mapStateToProps)(Book);
