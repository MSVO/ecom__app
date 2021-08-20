import { Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../api/api";
import OrderDetails from "../components/OrderDetails";
import routes from "../routes/routes";
import { setNextView } from "../store/flowSlice";

const useStyles = makeStyles({
  page: {
    padding: "1em",
  },
});

function CheckoutPage() {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const [product, setProduct] = useState();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [deliveryAddress, setDeliveryAddress] = useState({
    id: null,
    name: null,
    fullAddress: null,
    pinCode: null,
    email: null,
    mobile: null,
  });

  useEffect(() => {
    if (!auth.token) {
      dispatch(setNextView(routes.checkout.name));
      history.push(routes.signIn.buildPath());
      return;
    }
    api
      .fetchAddressesOfAuthenticatedUser(auth.token)
      .then((addresses) => {
        if (addresses.length >= 1) {
          setDeliveryAddress(addresses[0]);
        } else {
          dispatch(setNextView(routes.checkout.name));
          history.push(routes.addAddress.buildPath());
        }
      })
      .catch((e) => {
        throw e;
      });
    if (cart.products.length >= 1) {
      api
        .fetchProduct(cart.products[0].id)
        .then((product) => {
          setProduct(product);
        })
        .catch((e) => {
          throw e;
        });
    }
  }, [auth.token, history, dispatch, cart.products]);

  function placeOrderHandler() {
    api
      .createOrderUsingToken(auth.token, deliveryAddress.id, product.id, 1)
      .then((createdOrder) => {
        console.log(createdOrder);
        history.push(routes.order.buildPath(createdOrder.id));
      })
      .catch((e) => {
        throw e;
      });
  }

  return (
    <div className={classes.page}>
      <h1>Checkout</h1>

      <OrderDetails
        order={{
          address: deliveryAddress,
          product: product,
          quantity: 1,
        }}
      />

      <Button variant="contained" color="secondary" onClick={placeOrderHandler}>
        Place Order
      </Button>
    </div>
  );
}

export default CheckoutPage;
