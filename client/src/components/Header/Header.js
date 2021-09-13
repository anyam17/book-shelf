import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { filterData } from '../../actions/filter';
import _ from 'lodash';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  search: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 500,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    }
});

class Header extends React.Component {

  componentWillReceiveProps = nextProps => this.props.dispatch(filterData({filtered: nextProps.books})); 

  handleChange = e => {
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
      newList = currentList.filter(book => {
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
      this.props.dispatch(filterData({filtered: newList}));
    } else 
      this.props.dispatch(filterData({filtered: newList, isEmpty: true}));
  }

  logout = () => this.props.dispatch(logout());

  render() {
     const { classes, onDrawerToggle, auth } = this.props;

      return (
        <React.Fragment>
          <AppBar position="sticky" elevation={0} style={{backgroundColor:'#232f3e'}}>  {/* color="primary" */}
            <Toolbar>
              <Grid container spacing={1} alignItems="center">
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
              {window.location.pathname === '/' || window.location.pathname === '/my_books' ?
                <Grid item xs style={{marginLeft: -23}}>
                  <Paper component="form" className={classes.search}>
                    <InputBase
                      onChange={this.handleChange}
                      className={classes.input}
                      placeholder="Search Books"
                      inputProps={{ 'aria-label': 'search books' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                    </IconButton> 
                  </Paper>
                </Grid>
                : null
              }
                <Grid item xs />
                {auth && auth.isAuth ?
                <Toolbar>
                  <Grid item>
                    <Tooltip title="Alerts • No alerts">
                      <IconButton color="inherit">
                        <NotificationsIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item style={{marginRight: 20}}>
                    <Link to={`logout`} style={{color:"inherit", textDecoration: 'none'}}>
                      <Button className={classes.button} variant="outlined" color="inherit" size="small">
                        Logout
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    {auth && _.startCase(auth.firstname)} 
                    <Link to={`user`} style={{color:"inherit", textDecoration: 'none'}}>
                      <IconButton color="inherit" className={classes.iconButtonAvatar}>
                      {auth.photo ?
                        <Avatar src={`/images/${auth.photo}`} alt="My Avatar" />
                      :
                        <Avatar src={`/account.png`} alt="My Avatar" />
                      }
                      </IconButton>
                    </Link>
                  </Grid>
                </Toolbar>
                : null
              }
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
        books: state.books.books
    }
}

export default connect(mapStateToProps)((withStyles(styles)(Header)));