import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
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
import EditIcon from "@material-ui/icons/Edit";

import { convertFromBytesTo } from "../../utils";
import { Document, Page } from "react-pdf";
import Notification from "../Feedback/Notification";

const BookMy = ({ books, handleDialog, handleEditDialog, message, success, ...rest }) => {
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
      <Card {...rest}>
      <CardHeader title="My Books" />
          <Divider />
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                {books && 
                  <Checkbox
                    checked={selectedBookIds.length === books.length}
                    color="primary"
                    indeterminate={
                      selectedBookIds.length > 0 &&
                      selectedBookIds.length < books.length
                    }
                    onChange={handleSelectAll}
                  />
                }
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Pages</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books &&
                books.slice(0, limit).map((book) => (
                  <TableRow
                    style={{textDecoration: "none"}}
                    component={Link}
                    to={{pathname: `book/${book._id}`, state: book}}
                    hover
                    key={book._id}
                    selected={selectedBookIds.indexOf(book._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedBookIds.indexOf(book._id) !== -1}
                        onClick={(event) => { event.stopPropagation(); handleSelectOne(event, book._id)}}
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
                      <div>
                      <Tooltip title="Edit Book">
                        <IconButton
                          onClick={(e) => handleEditDialog(e, book)}
                          aria-label="edit book"
                          style={{display: "inline-block", color: "#009be5"}}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Book">
                        <IconButton
                          onClick={(e) => handleDialog(e, book._id, book.name)}
                          aria-label="delete book"
                          style={{display: "inline-block", marginLeft: 10, color: "red"}}
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

      {success ? (
        <Notification message={message} type="success" />
      ) : (
        <Notification message={message} type="error" />
      )}
    </div>
  );
};

export default BookMy;
