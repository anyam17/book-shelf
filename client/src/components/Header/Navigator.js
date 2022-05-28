import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import BookIcon from "@material-ui/icons/Book";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import AddIcon from "@material-ui/icons/Add";
// import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import AppRegistration from "@material-ui/icons/HowToReg";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

const categories = [
  {
    id: "Basic",
    children: [
      {
        id: "Account",
        link: "/user",
        restricted: true,
        icon: <AccountCircleIcon />,
        active: true,
      },
      {
        id: "My Books",
        link: "/my_books",
        restricted: true,
        icon: <BookIcon />,
      },
      { id: "Add Book", link: "/add", restricted: true, icon: <AddIcon /> },
      {
        id: "Favorite Books",
        link: "/favorite",
        restricted: true,
        icon: <FavoriteBorderIcon />,
      },
      {
        id: "Reviews",
        link: "/reviews",
        restricted: true,
        icon: <PermMediaOutlinedIcon />,
      },
      {
        id: "Settings",
        link: "/settings",
        restricted: true,
        icon: <SettingsIcon />,
      },
      {
        id: "Register",
        link: "/register",
        restricted: false,
        exclude: true,
        icon: <AppRegistration />,
      },
      {
        id: "Login",
        link: "/login",
        restricted: false,
        exclude: true,
        icon: <LockIcon />,
      },
      { id: "Logout", link: "/logout", restricted: true, icon: <LogoutIcon /> },
    ],
  },
  {
    id: "Admin",
    children: [
      { id: "Users", link: "/users", restricted: true, icon: <PeopleIcon /> },
      {
        id: "All Books",
        link: "/books",
        restricted: true,
        icon: <PhonelinkSetupIcon />,
      },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
  },
  itemPhoto: {
    padding: "inherit",
  },
});

function Navigator(props) {
  const { auth, classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Link to="/" className={clsx(classes.link)}>
          <ListItem
            className={clsx(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            OLib
          </ListItem>
        </Link>
        {auth && auth.isAuth ? (
          <ListItem
            className={clsx(
              classes.item,
              classes.itemCategory,
              classes.itemPhoto
            )}
          >
            <ListItemIcon className={classes.itemIcon}>
              <Link
                to={`user`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <IconButton
                  color="inherit"
                  className={classes.iconButtonAvatar}
                >
                  {auth.photo ? (
                    <Avatar
                      src={`/images/${auth.photo}`
                        // require(`../../../../server/public/images/${auth.photo}`).default
                      }
                      alt="My Avatar"
                      style={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Avatar src={`/account.png`} alt="My Avatar" />
                  )}
                </IconButton>
              </Link>
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              {auth && _.startCase(auth.firstname)}
            </ListItemText>
          </ListItem>
        ) : null}
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            {auth && auth.isAuth ? (
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
            ) : null}
            {auth
              ? children.map(
                  ({
                    id: childId,
                    link,
                    restricted,
                    exclude,
                    icon,
                    active,
                  }) => {
                    if (auth.isAuth) {
                      return !exclude ? (
                        <Link
                          to={link}
                          className={clsx(classes.link)}
                          key={childId}
                        >
                          <ListItem
                            button
                            className={clsx(
                              classes.item,
                              active && classes.itemActiveItem
                            )}
                          >
                            <ListItemIcon className={classes.itemIcon}>
                              {icon}
                            </ListItemIcon>
                            <ListItemText
                              classes={{
                                primary: classes.itemPrimary,
                              }}
                            >
                              {childId}
                            </ListItemText>
                          </ListItem>
                        </Link>
                      ) : null;
                    } else {
                      return !restricted ? (
                        <Link
                          to={link}
                          className={clsx(classes.link)}
                          key={childId}
                        >
                          <ListItem
                            button
                            className={clsx(
                              classes.item,
                              active && classes.itemActiveItem
                            )}
                          >
                            <ListItemIcon className={classes.itemIcon}>
                              {icon}
                            </ListItemIcon>
                            <ListItemText
                              classes={{
                                primary: classes.itemPrimary,
                              }}
                            >
                              {childId}
                            </ListItemText>
                          </ListItem>
                        </Link>
                      ) : null;
                    }
                  }
                )
              : null}

            {auth && auth.isAuth ? (
              <Divider className={classes.divider} />
            ) : null}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Navigator));
