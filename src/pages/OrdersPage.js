import {
  Button,
  Container,
  Dialog,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import OrderDetails from "../components/OrderDetails";
import OrderTable from "../components/OrderTable";
import OrderActions from "../forms/OrderActions";
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
              <OrderActions
                order={order}
                onComplete={(order) => {
                  updateLocalOrderTableEntry(order.id, localOrderIndex, {
                    status: order.status,
                    remark: order.remark,
                  });
                  handleModalClose();
                }}
              />
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
      viewManager.navigateTo({ viewName: LANDING });
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
      {orders && orders.length > 0 && <OrderTable orders={orders} />}
      {(!orders || orders.length === 0) && (
        <Container fullWidth>
          <Typography variant="h5">Nothing to see here</Typography>
        </Container>
      )}
      <Dialog fullWidth open={modal.open} onClose={handleModalClose}>
        <div className={classes.dialogContent}>{modal.body}</div>
      </Dialog>
    </SideNavLayout>
  );
}

export default OrdersPage;
