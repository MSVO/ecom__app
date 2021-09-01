import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import ChooseAddressDialog from "../components/ChooseAddressDialog";
import OrderDetails from "../components/OrderDetails";
import useMySnackbar from "../hooks/useMySnackbar";
import useViewManager, {
  ADD_ADDRESS,
  ORDER,
  PAST_ORDERS,
  SIGNIN,
} from "../hooks/useViewManager";
import SideNavLayout from "../layout/SideNavLayout";
import { clearCart, removeProduct } from "../store/cartSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.cart.products);
  const [product, setProduct] = useState();
  const auth = useSelector((state) => state.auth);
  const viewManager = useViewManager();
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useMySnackbar();
  const [addressChooser, setAddressChooser] = useState({
    open: false,
    addresses: null,
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    id: null,
    name: null,
    fullAddress: null,
    pinCode: null,
    email: null,
    mobile: null,
  });

  useEffect(() => {
    api.fetchAddressesOfAuthenticatedUser(auth.token).then((addresses) => {
      if (addresses.length >= 1) {
        setDeliveryAddress(addresses[addresses.length - 1]);
      } else {
        viewManager.pushCurrentAndNavigate({
          viewName: ADD_ADDRESS,
          message: {
            text: "Please add an address to continue purchase",
            severity: "warning",
          },
        });
      }
    });
  }, []);

  if (!auth.token) {
    viewManager.pushCurrentAndNavigate({
      viewName: SIGNIN,
      title: "Sign In / Sign Up",
      message: {
        severity: "warning",
        text: "Please sign in to continue with the purchase",
      },
    });
    return;
  }

  function quantityChangeHandler(newQuantity) {
    setQuantity(newQuantity);
  }

  function openAddressChoser(addresses) {
    setAddressChooser({
      open: true,
      addresses,
      title: "Pick an address",
    });
  }

  function addressChooserCloseHandler(choice) {
    api
      .fetchAddressById({
        token: auth.token,
        addressId: choice,
      })
      .then((address) => {
        setDeliveryAddress(address);
      })
      .then(() => {
        setAddressChooser({
          open: false,
          addresses: null,
        });
      })
      .catch((e) => {
        throw e;
      });
  }

  function showAddressPicker() {
    api
      .fetchAddressesOfAuthenticatedUser(auth.token)
      .then((addresses) => {
        if (addresses.length === 1) {
          setDeliveryAddress(addresses[0]);
        } else if (addresses.length > 1) {
          openAddressChoser(addresses);
        } else {
          viewManager.discardStack();
          viewManager.pushCurrentAndNavigate({
            viewName: ADD_ADDRESS,
            message: {
              severity: "warning",
              text: "Please add one delivery address to continue with the purchase",
            },
          });
        }
      })
      .catch((e) => {
        throw e;
      });
  }

  function placeOrderHandler() {
    let promises = products.map((p) => {
      api
        .createOrderUsingToken(auth.token, deliveryAddress.id, p.id, p.quantity)
        .then((order) => {
          dispatch(removeProduct(p.id));
          enqueueSnackbar(`Order placed for ${order.product.name}`, {
            variant: "success",
          });
        })
        .catch((e) => {
          enqueueSnackbar("An item couldn't be ordered", { variant: "error" });
        });
    });
    Promise.allSettled(promises).then(() => {
      viewManager.navigateTo({ viewName: PAST_ORDERS, title: "Your Orders" });
    });
  }

  return (
    <SideNavLayout>
      <h1>Checkout</h1>

      <OrderDetails
        order={{
          address: deliveryAddress,
          products: products,
          quantity: quantity,
          showCartActions: true,
          showAddressPicker: showAddressPicker,
        }}
        actions={
          <Fragment>
            {products.length > 1 && (
              <Alert severity="info">
                {products.length} seperate orders will be placed.
              </Alert>
            )}
            <Button
              style={{ marginTop: "1em" }}
              variant="contained"
              color="secondary"
              onClick={placeOrderHandler}
              disabled={products.length < 1}
            >
              Place Order
            </Button>
          </Fragment>
        }
      />
      <ChooseAddressDialog
        open={addressChooser.open}
        addresses={addressChooser.addresses}
        onClose={addressChooserCloseHandler}
        title={addressChooser.title}
      />
    </SideNavLayout>
  );
}

export default CheckoutPage;
