import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api";
import Address from "../../customer-address/components/Address";
import CustomerProductTileContainer from "../../customer-products/containers/ProductTile";
import useAddressPicker from "./AddressPicker";

function CheckoutDetailsContainer(props) {
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const cart = useSelector((state) => state.cart);
  const AddressPicker = useAddressPicker();

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

  function addressPickHandler(address) {
    setDeliveryAddress(address);
    AddressPicker.close();
  }

  return (
    <Grid container style={{ marginTop: "2em" }}>
      {/* Left */}
      <Grid item xs={8}>
        <Grid container wrap="wrap" spacing={3}>
          {cart.products.map((item) => {
            return <CustomerProductTileContainer productId={item.id} />;
          })}
        </Grid>
      </Grid>
      {/* Right */}
      <Grid item xs={3}>
        <Typography variant="h6">Address</Typography>
        <br />
        <Button
          onClick={AddressPicker.open}
          variant="outlined"
          color="primary"
          size="small"
        >
          Change address
        </Button>
        <AddressPicker.AddressPickerContainer
          onCancel={AddressPicker.close}
          onPick={addressPickHandler}
        />
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
      </Grid>
    </Grid>
  );
}

export default CheckoutDetailsContainer;
