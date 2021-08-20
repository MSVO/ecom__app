import { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../api/api";
import OrderDetails from "../components/OrderDetails";

function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId;
  const auth = useSelector((state) => state.auth);
  const [order, setOrder] = useState();

  useEffect(() => {
    api
      .fetchOrderDetails({
        token: auth.token,
        orderId,
      })
      .then((order) => {
        setOrder(order);
      })
      .catch((e) => {
        throw e;
      });
  }, [auth.token, orderId]);
  return (
    <Fragment>
      <h1>Order Details</h1>
      {!!order && <OrderDetails order={order} />}
    </Fragment>
  );
}
export default OrderDetailsPage;
