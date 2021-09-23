import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import {
  Avatar,
  Box,
  Card,
  Chip,
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
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { convertFromBytesTo } from "../../utils";
import { Document, Page } from "react-pdf";
import Notification from "../Feedback/Notification";

const AllBooks = ({
  books,
  handleDeleteDialog,
  handleApproveBook,
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
          No book has been added yet!
        </h1>
      ) : (
        <Card {...rest}>
          <CardHeader 
            action={
              <Chip
                color="primary"
                label={books && books.length}
                // size="small"
              />
            }
            title="All Books" 
          />
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
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books &&
                  books.slice(0, limit).map((book) => (
                    <TableRow
                      style={{ textDecoration: "none" }}
                      component={Link}
                      to={{ pathname: `book/${book._id}`, state: book }}
                      hover
                      key={book._id}
                      selected={selectedBookIds.indexOf(book._id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedBookIds.indexOf(book._id) !== -1}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleSelectOne(event, book._id);
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
                            src={book.avatarUrl}
                            style={{ marginRight: 15 }}
                          >
                            <Document file={`/books/${book.file}`} height={40}>
                              <Page pageNumber={1} />
                            </Document>
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {`${_.startCase(book.name)}`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{`${_.startCase(book.author)}`}</TableCell>
                      <TableCell>{`${_.startCase(book.rating)}`}</TableCell>
                      <TableCell>{book.pages}</TableCell>
                      <TableCell>{convertFromBytesTo(book.size)}</TableCell>
                      <TableCell>
                        {moment(book.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={book.isApproved ? "primary" : "secondary"}
                          label={book.isApproved ? `Approved` : `Disapproved`}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <Tooltip title={book.isApproved ? "Disapprove" : "Approve"}>
                            <Switch
                              color={book.isApproved ? "primary" : "secondary"}
                              checked={book.isApproved}
                              onClick={(e) => {e.stopPropagation(); handleApproveBook(e, book._id)}}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={(e) =>
                                handleDeleteDialog(e, book._id, book.name)
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
                        </div>
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

export default AllBooks;
