import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import ChooseAddressDialog from "../components/ChooseAddressDialog";
import OrderDetails from "../components/OrderDetails";
import useViewManager, {
  ADD_ADDRESS,
  ORDER,
  SIGNIN,
} from "../hooks/useViewManager";
import SideNavLayout from "../layout/SideNavLayout";
import { clearCart } from "../store/cartSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [product, setProduct] = useState();
  const auth = useSelector((state) => state.auth);
  const viewManager = useViewManager();
  const [quantity, setQuantity] = useState(1);
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

  useEffect(() => {
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
    if (cart.products.length >= 1) {
      api
        .fetchProduct(cart.products[0].id)
        .then((product) => {
          setProduct({
            ...product,
            quantity: 1,
          });
        })
        .catch((e) => {
          throw e;
        });
    }
  }, [auth.token, cart.products]);

  function placeOrderHandler() {
    api
      .createOrderUsingToken(
        auth.token,
        deliveryAddress.id,
        product.id,
        quantity
      )
      .then((createdOrder) => {
        dispatch(clearCart());
        viewManager.navigateTo({ viewName: ORDER, orderId: createdOrder.id });
      })
      .catch((e) => {
        throw e;
      });
  }

  return (
    <SideNavLayout>
      <h1>Checkout</h1>

      <OrderDetails
        order={{
          address: deliveryAddress,
          product: product,
          quantity: quantity,
          onQuantityChange: quantityChangeHandler,
        }}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={placeOrderHandler}
        disabled={!product}
      >
        Place Order
      </Button>

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
