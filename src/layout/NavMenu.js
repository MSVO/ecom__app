import {
  Badge,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Receipt } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StoreIcon from "@material-ui/icons/Store";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import useViewManager, {
  ADDRESSES,
  ADD_ADDRESS,
  CHECKOUT,
  CONTACT,
  LANDING,
  MANAGE_ORDERS,
  MANAGE_PRODUCTS,
  PAST_ORDERS,
  SIGNIN,
} from "../hooks/useViewManager";
const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NavMenu() {
  const classes = useStyles();

  const viewManager = useViewManager();

  const auth = useSelector((state) => state.auth);
  const isAdmin = auth.roles.includes("ROLE_ADMIN");
  const cartBadgeNumber = useSelector((state) => state.cart.products.length);
  const [ordersMenuOpen, setOrdersMenuOpen] = useState(false);
  function homeButtonHandler() {
    viewManager.navigateTo({ viewName: LANDING });
  }

  function cartButtonHandler() {
    viewManager.navigateTo({ viewName: CHECKOUT });
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

  function contactButtonHandler() {
    viewManager.navigateTo({
      viewName: CONTACT,
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
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
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
              <ListItem
                button
                key="manageProducts"
                onClick={manageProductsButtonHandler}
              >
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText>Products</ListItemText>
              </ListItem>
              <ListItem
                button
                key="manageOrders"
                onClick={() => setOrdersMenuOpen((value) => !value)}
              >
                <ListItemIcon>
                  <Receipt />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
                {ordersMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={ordersMenuOpen} className={classes.nested}>
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
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        {!isAdmin && (
          <ListItem button key={"checkout"} onClick={cartButtonHandler}>
            <ListItemIcon>
              <Badge badgeContent={cartBadgeNumber} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Checkout" />
          </ListItem>
        )}
      </List>
      <Divider />
      {accountSubMenu}
      <Divider />
      <List>
        {!isAdmin && (
          <ListItem button key={"contact"} onClick={contactButtonHandler}>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary={"Get Help"}></ListItemText>
          </ListItem>
        )}
      </List>
    </Fragment>
  );

  return navMenu;
}

export default NavMenu;
