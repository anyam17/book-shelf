import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import {
  Avatar,
  Box,
  Card,
  Divider,
  CardHeader,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { convertFromBytesTo } from "../../utils";
import { Document, Page } from "react-pdf";
import Notification from "../Feedback/Notification";

const Favorite = ({
  books,
  handleRemoveFromFavoritesDialog,
  message,
  success,
  ...rest
}) => {
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedBookIds;

    if (event.target.checked) {
      newSelectedBookIds = books && books.map((book) => book._id);
    } else {
      newSelectedBookIds = [];
    }

    setSelectedBookIds(newSelectedBookIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBookIds.indexOf(id);
    let newSelectedBookIds = [];

    if (selectedIndex === -1) {
      newSelectedBookIds = newSelectedBookIds.concat(selectedBookIds, id);
    } else if (selectedIndex === 0) {
      newSelectedBookIds = newSelectedBookIds.concat(selectedBookIds.slice(1));
    } else if (selectedIndex === selectedBookIds.length - 1) {
      newSelectedBookIds = newSelectedBookIds.concat(
        selectedBookIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBookIds = newSelectedBookIds.concat(
        selectedBookIds.slice(0, selectedIndex),
        selectedBookIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBookIds(newSelectedBookIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ margin: 10 }}>
      {books && books.length <= 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "15%" }}>
          You have not added any books to your favorites yet!
        </h1>
      ) : (
        <Card {...rest}>
          <CardHeader title="Favorite Books" />
          <Divider />
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {books && (
                      <Checkbox
                        checked={selectedBookIds.length === books.length}
                        color="primary"
                        indeterminate={
                          selectedBookIds.length > 0 &&
                          selectedBookIds.length < books.length
                        }
                        onChange={handleSelectAll}
                      />
                    )}
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Pages</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books &&
                  books.slice(0, limit).map((favorite) => (
                    <TableRow
                      style={{ textDecoration: "none" }}
                      component={Link}
                      to={{
                        pathname: `book/${favorite.book._id}`,
                        state: favorite.book,
                      }}
                      hover
                      key={favorite._id}
                      selected={
                        selectedBookIds.indexOf(favorite.book._id) !== -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedBookIds.indexOf(favorite.book._id) !== -1
                          }
                          onClick={(event) => {
                            event.stopPropagation();
                            handleSelectOne(event, favorite.book._id);
                          }}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Avatar
                            src={favorite.book.avatarUrl}
                            style={{ marginRight: 15 }}
                          >
                            <Document
                              file={`/books/${favorite.book.file}`}
                              height={40}
                            >
                              <Page pageNumber={1} />
                            </Document>
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {`${_.startCase(favorite.book.name)}`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{`${_.startCase(
                        favorite.book.author
                      )}`}</TableCell>
                      <TableCell>{`${_.startCase(
                        favorite.book.rating
                      )}`}</TableCell>
                      <TableCell>{favorite.book.pages}</TableCell>
                      <TableCell>
                        {convertFromBytesTo(favorite.book.size)}
                      </TableCell>
                      <TableCell>
                        {moment(favorite.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Remove from favorites">
                          <IconButton
                            onClick={(e) =>
                              handleRemoveFromFavoritesDialog(
                                e,
                                favorite._id,
                                favorite.book.name
                              )
                            }
                            aria-label="remove book"
                            style={{
                              display: "inline-block",
                              marginLeft: 10,
                              color: "red",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>

          <TablePagination
            component="div"
            count={books && books.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      )}

      {success ? (
        <Notification message={message} type="success" />
      ) : (
        <Notification message={message} type="error" />
      )}
    </div>
  );
};

export default Favorite;
