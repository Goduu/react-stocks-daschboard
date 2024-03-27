import React, { Fragment, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ImageIcon from "@mui/icons-material/Image";
import ReorderIcon from "@mui/icons-material/Reorder";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from "@mui/icons-material/Menu";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MessagePopperButton from "./MessagePopperButton";
import SideDrawer from "./SideDrawer";
import Balance from "./Balance";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import { removeToken } from "../../../logged_out/components/register_login/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Avatar from "avataaars";

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  accountAvatar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
  },
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.background.default,
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  mobileItemSelected: {
    backgroundColor: theme.palette.primary.main,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  justifyCenter: {
    justifyContent: "center",
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

function NavBar(props) {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.auth.avatar);
  const { selectedTab, messages, classes, width, openAddBalanceDialog } = props;
  // Will be use to make website more accessible by screen readers
  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const userName = useSelector((state) => state.auth.name);

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const openDrawer = useCallback(() => {
    setIsSideDrawerOpen(true);
  }, [setIsSideDrawerOpen]);

  const closeDrawer = useCallback(() => {
    setIsSideDrawerOpen(false);
  }, [setIsSideDrawerOpen]);

  const handleLogout = () => {
    dispatch(removeToken());
  };
  const menuItems = [
    {
      link: "/c/grid",
      name: "Grid",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Grid" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
    },
    {
      link: "/c/watchlist",
      name: "Watchlist",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ReorderIcon
            className={
              selectedTab === "Watchlist" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <ReorderIcon className="text-white" />,
      },
    },
    {
      link: "/c/dashboard",
      name: "Dashboard",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <InsertChartIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <InsertChartIcon className="text-white" />,
      },
    },
    // {
    //   link: "/c/posts",
    //   name: "Posts",
    //   onClick: closeMobileDrawer,
    //   icon: {
    //     desktop: (
    //       <ImageIcon
    //         className={
    //           selectedTab === "Posts" ? classes.textPrimary : "text-white"
    //         }
    //         fontSize="small"
    //       />
    //     ),
    //     mobile: <ImageIcon className="text-white" />,
    //   },
    // },
    {
      link: "/c/subscription",
      name: "Subscription",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AccountBalanceIcon
            className={
              selectedTab === "Subscription"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <AccountBalanceIcon className="text-white" />,
      },
    },
    {
      link: "/",
      name: "Logout",
      icon: {
        desktop: (
          <PowerSettingsNewIcon className="text-white" fontSize="small" />
        ),
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ];
  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsDown>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
              >
                Nex
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
              >
                it
              </Typography>
            </Hidden>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            {/* {isWidthUp("sm", width) && (
              <Box mr={3}>
                <Balance
                  balance={2573}
                  openAddBalanceDialog={openAddBalanceDialog}
                />
              </Box>
            )}
            <MessagePopperButton messages={messages} />
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <div className={classes.accountAvatar}>
                <Avatar
                  avatarStyle="Circle"
                  style={{ width: "35px", height: "35px" }}
                  {...avatar}
                />
              </div>
              {isWidthUp("sm", width) && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">{userName}</Typography>
                  }
                />
              )} 
            </ListItem>*/}
          </Box>
          <IconButton
            onClick={openDrawer}
            color="primary"
            aria-label="Open Sidedrawer"
          >
            <SupervisorAccountIcon />
          </IconButton>
          <SideDrawer open={isSideDrawerOpen} onClose={closeDrawer} />
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={(node) => {
                  links.current[index] = node;
                }}
              >
                <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                >
                  <ListItem
                    selected={selectedTab === element.name}
                    button
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                    onClick={() => {
                      handleLogout();
                    }}
                    aria-label={
                      element.name === "Logout"
                        ? "Logout"
                        : `Go to ${element.name}`
                    }
                  >
                    <ListItemIcon className={classes.justifyCenter}>
                      {element.icon.desktop}
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  );
}

NavBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavBar);
