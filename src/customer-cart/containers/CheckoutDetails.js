import { Button, Grid, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useAuthSelector } from "../../auth/hooks";
import Address from "../../customer-address/components/Address";
import CustomerProductTileContainer from "../../customer-products/containers/ProductTile";
import useViewManager, { PAST_ORDERS } from "../../hooks/useViewManager";
import { removeProduct, setDeliveryAddress } from "../../store/cartSlice";
import useMySnackbar from "../../util/notistack/useMySnackbar";
import useAddressPicker from "./AddressPicker";

function CheckoutDetailsContainer(props) {
  const deliveryAddress = useSelector((state) => state.cart.deliveryAddress);
  const [totalPrice, setTotalPrice] = useState();
  const cart = useSelector((state) => state.cart);
  const AddressPicker = useAddressPicker();
  const dispatch = useDispatch();
  const { authToken } = useAuthSelector();
  const { successSnackCorner, errorSnackCorner } = useMySnackbar();
  const viewManager = useViewManager();

  // Calculating total price from cart
  // TODO: The same componet is used to show order details, so total price become wrong there
  useEffect(() => {
    let promises = cart.products.map((p) => {
      return api.fetchProduct(p.id);
    });
    let quantities = cart.products.map((p) => Number(p.quantity));
    Promise.all(promises).then((products) => {
      console.log(products);
      const total = products
        .map((p, index) => [p.price, quantities[index]])
        .reduce((a, b) => [a[0] * a[1] + b[0] * b[1], 1], [0, 0]);
      setTotalPrice(total[0].toLocaleString("en-IN"));
    });
  }, [cart.products]);

  useEffect(() => {
    if (!deliveryAddress) {
      AddressPicker.open();
    }
  }, [deliveryAddress]);

  function addressPickHandler(address) {
    dispatch(setDeliveryAddress(address));
    AddressPicker.close();
  }

  function placeOrderHandler() {
    let promises = cart.products.map((item) => {
      api
        .createOrderUsingToken(
          authToken,
          deliveryAddress.id,
          item.id,
          item.quantity
        )
        .then((order) => {
          dispatch(removeProduct(item.id));
          successSnackCorner(`Order placed for ${order.product.name}`);
        })
        .catch((e) => {
          errorSnackCorner("An item couldn't be ordered");
        });
    });
    Promise.allSettled(promises).then(() => {
      viewManager.navigateTo({ viewName: PAST_ORDERS, title: "Your Orders" });
    });
  }

  function CartEmptyBrowseProductsInfo() {
    return (
      <Fragment>
        <Alert severity="info">
          No products added to cart,{" "}
          <Link onClick={() => viewManager.navigateToLanding()}>
            Browse Products
          </Link>
        </Alert>
        <br />
      </Fragment>
    );
  }

  return (
    <Grid container style={{ marginTop: "2em" }}>
      {/* Left */}
      <Grid item xs={8}>
        <Grid container wrap="wrap" spacing={3}>
          {cart.products.map((item) => {
            return <CustomerProductTileContainer productId={item.id} />;
          })}
          {cart.products.length === 0 && <CartEmptyBrowseProductsInfo />}
        </Grid>
      </Grid>
      {/* Right */}
      <Grid item xs={3}>
        <Typography variant="h6">Address</Typography>
        <br />
        {!deliveryAddress && (
          <Alert severity="info">Please set a delivery address</Alert>
        )}
        <AddressPicker.AddressPickerContainer
          onCancel={AddressPicker.close}
          onPick={addressPickHandler}
        />
        <br />
        <Button
          onClick={AddressPicker.open}
          variant="outlined"
          color="primary"
          size="small"
        >
          Change address
        </Button>
        <br />
        <br />
        {!!deliveryAddress && <Address address={deliveryAddress} />}
        <br />
        <br />
        <h2>Total Price</h2>
        {!!totalPrice && (
          <Typography
            variant="h6"
            style={{ color: green[700], fontWeight: 600 }}
          >
            ₹ {totalPrice}
          </Typography>
        )}
        <br />
        {cart.products.length > 1 && (
          <Alert severity="info">
            {cart.products.length} seperate orders will be placed.
          </Alert>
        )}
        <Button
          style={{ marginTop: "1em" }}
          variant="contained"
          color="secondary"
          onClick={placeOrderHandler}
          disabled={!deliveryAddress || cart.products.length < 1}
        >
          Place Order
        </Button>
      </Grid>
    </Grid>
  );
}

export default CheckoutDetailsContainer;
