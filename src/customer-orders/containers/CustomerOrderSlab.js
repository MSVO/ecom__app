import { Card, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuthSelector } from "../../auth/hooks";
import OrderSlabContent from "../../order/components/OrderSlabContent";
import useMySnackbar from "../../util/notistack/useMySnackbar";

export default function CustomerOrderSlabContainer(props) {
  const { orderId } = props;
  const [order, setOrder] = useState();
  const { isCustomer, authToken } = useAuthSelector();
  const { errorSnackCorner } = useMySnackbar();

  useEffect(() => {
    if (isCustomer) {
      api
        .fetchOrderDetails({ token: authToken, orderId })
        .then(setOrder)
        .catch(() => {
          errorSnackCorner("Failed to fetch an order");
        });
    }
  }, [orderId, authToken, isCustomer]);

  return (
    <Card style={{ margin: "1em", padding: "1em", maxWidth: 1000 }}>
      <OrderSlabContent order={order} isExpanded={true} />
    </Card>
  );
}
