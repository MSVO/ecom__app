import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";
import OrderTable from "../components/OrderTable";
import useViewManager, { ORDER } from "../hooks/useViewManager";
import SideNavLayout from "../layout/SideNavLayout";

function PastOrdersPage(props) {
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);
  const viewManager = useViewManager();

  function viewAction(orderId) {
    viewManager.navigateTo({
      viewName: ORDER,
      orderId: orderId,
    });
  }

  function transformOrders(orders) {
    return orders.map((order) => ({
      ...order,
      actions: <Button onClick={() => viewAction(order.id)}>View</Button>,
    }));
  }

  useEffect(() => {
    api
      .getOrdersByCreatorToken({
        token: auth.token,
      })
      .then((orders) => transformOrders(orders))
      .then((orders) => setOrders(orders))
      .catch((e) => {
        throw e;
      });
  }, [auth.token]);

  return (
    <SideNavLayout>
      <Grid container xs={8}>
        <OrderTable orders={orders} />
      </Grid>
    </SideNavLayout>
  );
}

export default PastOrdersPage;
