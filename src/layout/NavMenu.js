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
  MANAGE_ORDERS,
  MANAGE_PRODUCTS,
  PAST_ORDERS,
  SIGNIN,
} from "../hooks/useViewManager";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import HistoryIcon from "@material-ui/icons/History";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NavMenu(props) {
  const classes = useStyles();

  const viewManager = useViewManager();

  const auth = useSelector((state) => state.auth);
  const isAdmin = auth.roles.includes("ROLE_ADMIN");

  function homeButtonHandler() {
    viewManager.navigateTo({ viewName: LANDING });
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

  function manageOrdersButtonHandler(queryString) {
    viewManager.navigateTo({
      viewName: MANAGE_ORDERS,
      title: "Manage Orders",
      queryString,
    });
  }

  function ordersPendingReviewButtonHandler() {
    manageOrdersButtonHandler("?status=placed");
  }
  function ordersAcceptedButtonHandler() {
    manageOrdersButtonHandler("?status=accepted");
  }
  function ordersRejectedButtonHandler() {
    manageOrdersButtonHandler("?status=rejected");
  }

  function manageProductsButtonHandler() {
    viewManager.navigateTo({
      viewName: MANAGE_PRODUCTS,
      title: "Manage Products",
    });
  }

  function pastOrdersButtonHandler() {
    viewManager.navigateTo({
      viewName: PAST_ORDERS,
      title: "Past Orders",
    });
  }

  const accountSubMenu = (
    <Fragment>
      {!!auth.token && (
        <List>
          <ListItem key="userChip">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>{auth.name}</ListItemText>
          </ListItem>
          {!isAdmin && (
            <Fragment>
              <ListItem button key={"checkout"} onClick={cartButtonHandler}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Checkout" />
              </ListItem>
              <ListItem
                button
                key={"addresses"}
                onClick={addressesButtonHandler}
              >
                <ListItemIcon>
                  <StoreMallDirectoryIcon />
                </ListItemIcon>
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
              <ListItem
                button
                key={"pastOrders"}
                onClick={pastOrdersButtonHandler}
              >
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </Fragment>
          )}
          {isAdmin && (
            <Fragment>
              <ListItem key="manageOrders">
                <ListItemIcon></ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </ListItem>
              <Collapse in={true} className={classes.nested}>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    key={"pendingReview"}
                    onClick={ordersPendingReviewButtonHandler}
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Placed" />
                  </ListItem>
                  <ListItem
                    button
                    key="accepted"
                    onClick={ordersAcceptedButtonHandler}
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Accepted" />
                  </ListItem>
                </List>
                <ListItem
                  button
                  key={"rejectedorders"}
                  onClick={ordersRejectedButtonHandler}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Rejected" />
                </ListItem>
              </Collapse>
              <ListItem
                button
                key="manageProducts"
                onClick={manageProductsButtonHandler}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText>Products</ListItemText>
              </ListItem>
            </Fragment>
          )}
          <ListItem button key={"signOut"} onClick={signOutButtonHandler}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
        </List>
      )}
      {!auth.token && (
        <List>
          <ListItem button key={"signIn"} onClick={signInButtonHandler}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
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
