import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import useViewManager, {
  CHECKOUT,
  LANDING,
  SIGNIN,
} from "../hooks/useViewManager";

function NavMenu(props) {
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

  const accountSubMenu = (
    <Fragment>
      {!!auth.token && (
        <List>
          <ListItem button key={"cart"} onClick={cartButtonHandler}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
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
