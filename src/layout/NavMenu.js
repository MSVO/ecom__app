import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import useViewManager, {
  ADDRESSES,
  ADD_ADDRESS,
  CHECKOUT,
  LANDING,
  SIGNIN,
} from "../hooks/useViewManager";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NavMenu(props) {
  const classes = useStyles();

  const viewManager = useViewManager();

  const auth = useSelector((state) => state.auth);

  function homeButtonHandler() {
    viewManager.navigateTo(LANDING);
  }

  function cartButtonHandler() {
    viewManager.navigateTo(CHECKOUT);
  }

  function signOutButtonHandler() {
    viewManager.logout();
  }

  function signInButtonHandler() {
    viewManager.navigateTo(SIGNIN);
  }

  function addAddressButtonHandler() {
    viewManager.navigateTo(ADD_ADDRESS);
  }

  function addressesButtonHandler() {
    viewManager.navigateTo({
      viewName: ADDRESSES,
      title: "Your Addresses",
    });
  }

  const accountSubMenu = (
    <Fragment>
      {!!auth.token && (
        <List>
          <ListItem button key={"checkout"} onClick={cartButtonHandler}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Checkout" />
          </ListItem>
          <ListItem button key={"addresses"} onClick={addressesButtonHandler}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Addresses" />
          </ListItem>
          <Collapse in={true} className={classes.nested}>
            <List component="div" disablePadding>
              <ListItem
                button
                key={"addaddress"}
                onClick={addAddressButtonHandler}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Add New" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button key={"signOut"} onClick={signOutButtonHandler}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
        </List>
      )}
      {!auth.token && (
        <List>
          <ListItem button key={"signIn"} onClick={signInButtonHandler}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={"Sign In"} />
          </ListItem>
        </List>
      )}
    </Fragment>
  );

  const navMenu = (
    <Fragment>
      <Divider />
      <List>
        <ListItem button key={"home"} onClick={homeButtonHandler}>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
      </List>
      <Divider />
      {accountSubMenu}
    </Fragment>
  );

  return navMenu;
}

export default NavMenu;
