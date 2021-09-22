import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { filterData } from "../../actions/filter";
import _ from "lodash";

import PropTypes from "prop-types";
import {
  AppBar,
  Grid,
  Toolbar,
  Hidden,
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Avatar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
    color: "#232f3e",
  },
  iconButtonAvatar: {
    padding: 4,
  },
});

class Header extends React.Component {
  componentWillReceiveProps = (nextProps) =>
    this.props.dispatch(filterData({ filtered: nextProps.books }));

  handleChange = (e) => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.props.books;

      // Use .filter() to determine which books should be displayed
      // based on the search terms
      newList = currentList.filter((book) => {
        // change current book to lowercase
        const lc = book.name.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list book includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.books;
    }

    // Set the filtered state based on what our rules added to newList
    if (Object.keys(newList).length > 0) {
      this.props.dispatch(filterData({ filtered: newList }));
    } else
      this.props.dispatch(filterData({ filtered: newList, isEmpty: true }));
  };

  render() {
    const { classes, onDrawerToggle, auth } = this.props;

    let field =
      window.location.pathname === `/` ||
      window.location.pathname === `/my_books` ||
      window.location.pathname === `/favorite` ||
      window.location.pathname === `/users` 
        ? { c: `#f4f6f8`, h: 120 }
        : { c: `#232f3e`, h: `1%` };

    return (
      <React.Fragment>
        <AppBar
          position="sticky"
          elevation={0}
          style={{ backgroundColor: field.c, height: field.h }}
        >
          {" "}
          {/* color="primary" */}
          <Toolbar>
            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{ display: "block" }}
            >
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              {window.location.pathname === "/" || 
              window.location.pathname === `/users` ||
              window.location.pathname === `/favorite` ||
              window.location.pathname === "/my_books" ? (
                <Box>
                  <Box sx={{ mt: 2 }}>
                    <Card>
                      <CardContent>
                        <Box sx={{ maxWidth: 600 }}>
                          <TextField
                            fullWidth
                            onChange={this.handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon fontSize="small" color="action">
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              ),
                            }}
                            placeholder="Search Book"
                            variant="outlined"
                          />
                        </Box>
                        {/*<Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      sx={{ mx: 1 }}
                      color="primary"
                      variant="contained"
                    >
                      Add Book
                    </Button>
                  </Box>*/}
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              ) : null}
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
    books: state.books.books,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
