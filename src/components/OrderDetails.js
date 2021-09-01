import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";
import Address from "./Address";
import ProductTile from "./ProductTile";
import StatusStepper from "./StatusStepper";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    minWidth: 250,
    maxWidth: 300,
    width: "100%",
    margin: theme.spacing(1),
  },
}));

function OrderDetails(props) {
  const {
    address,
    product,
    quantity,
    onQuantityChange,
    status,
    remark,
    products,
    showCartActions,
    showAddressPicker,
  } = props.order;
  const [totalPrice, setTotalPrice] = useState();
  const cart = useSelector((state) => state.cart);
  console.log("Products for order:", products);
  const classes = useStyles();

  // Calculating total price
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
  });

  return (
    <Fragment>
      {status && <StatusStepper status={status} />}
      {remark && (
        <Alert severity="info">Remark: {remark || "No remarks"}</Alert>
      )}
      <Grid container style={{ marginTop: "2em" }}>
        <Grid item xs={8}>
          {/* <Grid container>
            <Typography variant="h5">Products</Typography>
          </Grid> */}
          <Grid container wrap="wrap" spacing={3}>
            {!!product && (
              <Grid item className={classes.gridItem} key={product.id}>
                <ProductTile
                  product={{ ...product, quantity }}
                  onQuantityChange={onQuantityChange}
                />
              </Grid>
            )}
            {!!products &&
              products.map((p) => {
                return (
                  <Grid item className={classes.gridItem} key={p.id}>
                    <ProductTile
                      showCartButton={showCartActions}
                      productId={p.id}
                      fetchProduct={true}
                      onQuantityChange={onQuantityChange}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Address</Typography>
          <br />
          {showAddressPicker && (
            <Button
              variant="outlined"
              color="primary"
              onClick={showAddressPicker}
            >
              Change
            </Button>
          )}
          <br />
          <br />
          {!!address && <Address address={address} />}
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
          {props.actions}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default OrderDetails;
