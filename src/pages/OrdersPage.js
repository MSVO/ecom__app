import {
  Button,
  CardActions,
  Dialog,
  Divider,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import OrderDetails from "../components/OrderDetails";
import OrderTable from "../components/OrderTable";
import useViewManager, { LANDING } from "../hooks/useViewManager";
import SideNavLayout from "../layout/SideNavLayout";

const initialModal = {
  open: false,
  body: null,
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(3),
  },
}));

function OrdersPage(props) {
  const queryString = useLocation().search;

  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const viewManager = useViewManager();
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(initialModal);
  const [orderActionRemark, setOrderActionRemark] = useState();

  function updateLocalOrderTableEntry(orderId, orderIndex, updates) {
    setOrders((orders) => {
      if (orders[orderIndex].id === orderId) {
        orders[orderIndex] = {
          ...orders[orderIndex],
          ...updates,
        };
        console.log(orders[orderIndex]);
        return [...orders];
      } else {
        return orders;
      }
    });
  }

  function handleModalClose() {
    setModal(initialModal);
  }

  const performOrderActionHandler = useCallback(
    ({ action, orderId, localOrderIndex }) => {
      api
        .performOrderAction({
          token: auth.token,
          orderId,
          action,
          remark: orderActionRemark,
        })
        .then((order) => {
          const { status, remark } = order;
          updateLocalOrderTableEntry(orderId, localOrderIndex, {
            status,
            remark,
          });
          handleModalClose();
        });
    },
    [orderActionRemark, auth.token]
  );

  function orderActions(order, userRoles, localOrderIndex) {
    let actions = [];
    if (userRoles.includes("ROLE_ADMIN")) {
      switch (order.status) {
        case "PLACED":
          actions.push(
            <Button
              key="accept"
              color="primary"
              variant="contained"
              onClick={() =>
                performOrderActionHandler({
                  action: "ACCEPT",
                  orderId: order.id,
                  localOrderIndex,
                })
              }
            >
              Accept
            </Button>
          );
          actions.push(
            <Button
              key="reject"
              variant="contained"
              color="secondary"
              onClick={() =>
                performOrderActionHandler({
                  action: "REJECT",
                  orderId: order.id,
                  localOrderIndex,
                })
              }
            >
              Reject
            </Button>
          );
          break;
        default:
          break;
      }
    }
    return actions;
  }

  function viewOrderButtonHandler(orderId, localOrderIndex) {
    api
      .fetchOrderDetails({ token: auth.token, orderId })
      .then((order) => {
        const actions = orderActions(order, auth.roles, localOrderIndex);
        setOrderActionRemark(order.remark);
        setModal({
          open: true,
          body: (
            <Fragment>
              <OrderDetails order={order} />
              <Divider spacing={3} />
              <br />
              <br />
              {/* TODO: Add remark field and debug action request */}
              {/* <Autocomplete
                options={[
                  "Sorry, the item is out of stock",
                  "Sorry, we are unable to deliver at your location",
                ]}
                spacing={3}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add a remark"
                    fullWidth
                    variant="outlined"
                    onChange={(event) =>
                      setOrderActionRemark(event.target.value)
                    }
                    value={orderActionRemark}
                  />
                )}
              /> */}
              <br />
              <CardActions>{actions}</CardActions>
            </Fragment>
          ),
        });
      })
      .catch((e) => {
        throw e;
      });
  }

  function actionedOrder(order, orderIndex) {
    let actions = [];
    actions.push(
      <Button
        key="show"
        variant="outlined"
        size="small"
        onClick={() => viewOrderButtonHandler(order.id, orderIndex)}
      >
        Show
      </Button>
    );
    return {
      ...order,
      actions: <Fragment>{actions}</Fragment>,
    };
  }

  useEffect(() => {
    if (!auth.token || !auth.roles.includes("ROLE_ADMIN")) {
      viewManager.navigateTo(LANDING);
      return;
    }
    api
      .queryOrders({
        token: auth.token,
        queryString,
      })
      .then((orders) =>
        orders.map((order, orderIndex) => actionedOrder(order, orderIndex))
      )
      .then(setOrders)
      .catch((e) => {
        throw e;
      });
  }, [auth.token, auth.roles, queryString]);
  return (
    <SideNavLayout>
      <OrderTable orders={orders} />
      <Dialog fullWidth open={modal.open} onClose={handleModalClose}>
        <div className={classes.dialogContent}>{modal.body}</div>
      </Dialog>
    </SideNavLayout>
  );
}

export default OrdersPage;
