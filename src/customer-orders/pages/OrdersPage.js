import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api";
import { useAuthSelector } from "../../auth/hooks";
import useViewManager from "../../hooks/useViewManager";
import SideNavLayout from "../../layout/SideNavLayout";
import useMySnackbar from "../../util/notistack/useMySnackbar";
import CustomerOrderSlabContainer from "../containers/CustomerOrderSlab";

export default function CustomerOrdersPage(props) {
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);
  const viewManager = useViewManager();
  const { isCustomer, authToken } = useAuthSelector();
  const { errorSnackTop } = useMySnackbar();

  function transformOrders(orders) {
    return orders.sort((i1, i2) => i2.id - i1.id);
  }

  useEffect(() => {
    if (isCustomer) {
      api
        .getOrdersByCreatorToken({
          token: authToken,
        })
        .then((orders) => transformOrders(orders))
        .then((orders) => setOrders(orders))
        .catch((e) => {
          errorSnackTop("Fetch failed!");
        });
    }
  }, [authToken, isCustomer]);

  if (!orders || orders.length === 0) {
    return (
      <SideNavLayout>
        <Alert severity="Info">It looks empty here...</Alert>
      </SideNavLayout>
    );
  }

  return (
    <SideNavLayout>
      {orders.map((order) => (
        <CustomerOrderSlabContainer key={order.id} orderId={order.id} />
      ))}
    </SideNavLayout>
  );
}
