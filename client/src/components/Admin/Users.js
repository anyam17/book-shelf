import { useState } from "react";
import moment from "moment";
import _ from "lodash";
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Chip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Notification from "../Feedback/Notification";

const Users = ({ users, handleSetRole, handleSetStatus, handleDeleteDialog, message, success, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
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
        {/*<PerfectScrollbar>*/}
        <CardHeader
          action={<Chip color="primary" label={users && users.length} />}
          title="All Users"
        />
        <Divider />
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.slice(0, limit).map((user) => (
                  <TableRow
                    hover
                    key={user._id}
                    selected={selectedCustomerIds.indexOf(user._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(user._id) !== -1}
                        onChange={(event) => handleSelectOne(event, user._id)}
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
                          src={require(`../../../../server/assets/photos/${user.photo}`)}
                          alt="Avatar"
                          style={{ width: 30, height: 30, marginRight: 15 }}
                        />
                        <Typography color="textPrimary" variant="body1">
                          {`${_.startCase(user.firstname)} ${_.startCase(
                            user.lastname
                          )}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{`${_.startCase(user.country)}`}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <ToggleButtonGroup
                        size="small"
                        color={user.role === 1 ? "secondary" : "primary"}
                        value={user.role}
                        exclusive
                        onChange={(e) => handleSetRole(e, user.role, user._id)}
                      >
                        <ToggleButton value={1} disabled={user.role === 1 ? true : false}>Admin</ToggleButton>
                        <ToggleButton value={0} disabled={user.role === 0 ? true : false}>Basic</ToggleButton>
                      </ToggleButtonGroup>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={user.isActive ? "Deactivate" : "Activate"}
                      >
                        <Switch
                          color={user.isActive ? "primary" : "secondary"}
                          checked={user.isActive}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetStatus(e, user._id);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {moment(user.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={(e) =>
                            handleDeleteDialog(e, user._id, user.firstname)
                          }
                          aria-label="remove user"
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
        {/*</PerfectScrollbar>*/}
        <TablePagination
          component="div"
          count={users.length}
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

Users.propTypes = {
  // users: PropTypes.array.isRequired
};

export default Users;
