import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useSelector } from "react-redux";
import NavMenu from "./NavMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      // width: "100%",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  logo: {
    height: 50,
    margin: theme.spacing(2),
  },
  logoText: {
    margin: theme.spacing(2),
    marginTop: 0,
    marginLeft: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideNavLayout(props) {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const classes = useStyles();
  const theme = useTheme();

  const viewTitle = useSelector((state) =>
    state.flow.currentView && state.flow.currentView.title
      ? state.flow.currentView.title
      : ""
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img
          className={classes.logo}
          src="https://banner2.cleanpng.com/20180926/qau/kisspng-computer-icons-scalable-vector-graphics-applicatio-tynor-wrist-splint-ambidextrous-rs-274-wrist-s-5bac3149dcb297.944285061538011465904.jpg"
        />
        <Typography variant="h5" className={classes.logoText}>
          E-Shop
        </Typography>
      </div>
      <NavMenu />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {viewTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="js">
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
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default SideNavLayout;
