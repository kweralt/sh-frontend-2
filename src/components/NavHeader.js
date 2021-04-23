import { useState, Component } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  useTheme,
  Icon,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Divider,
  Hidden,
  Drawer,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import {
  NotificationsNone,
  ChatBubbleOutline,
  PowerSettingsNew,
  Menu,
} from "@material-ui/icons";
import { Link as RouterLink, Redirect, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import useToken from "../App/useToken";
import Login from "../pages/Login";
import Logout from "./Logout";
export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    color: "white",
    textDecoration: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#253053",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function roleValidation() {
  var isAuditor = false;
  if (localStorage.getItem("roleId") == 1) {
    isAuditor = true;
  }
  console.log(isAuditor);
  return isAuditor;
}

function Header(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useLocation();
  const isHome = false;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let navList = [
    { text: "home", icon: "home" },
    { text: "dashboard", icon: "dashboard" },
  ];

  if (roleValidation()) {
    navList.push({ text: "reports", icon: "assignment" });
    navList.push({ text: "tenants", icon: "person" });
    navList.push({ text: "directory", icon: "map" });
  } else {
    navList.push({ text: "actions", icon: "work" });
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navList.map(({ text, icon }, index) => (
          <ListItem
            component={RouterLink}
            // selected={pathname === `/${text}`}
            to={`/${text}`}
            button
            key={text}
          >
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={text.toUpperCase()} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div
        style={{
          height: "64px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "absolute",
          top: "0px",
          width: "100%",
          zIndex: -2,
        }}
      />
      <AppBar position="sticky" className={isHome ? "" : classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu fontSize="small" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            to={"/"}
            component={RouterLink}
            className={classes.logo}
          >
            SingHealth
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton color="inherit">
            <NotificationsNone fontSize="small" />
          </IconButton>
          <IconButton color="inherit">
            <ChatBubbleOutline fontSize="small" />
          </IconButton>
          {/* <IconButton color="inherit" edge="end">
            <PowerSettingsNew fontSize="small" />
          </IconButton> */}
          <Logout/>
        </Toolbar>
      </AppBar>
      {isHome && !mobileOpen ? (
        <div />
      ) : (
        <nav>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open={isHome}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
    </div>
  );
}

export default Header;
