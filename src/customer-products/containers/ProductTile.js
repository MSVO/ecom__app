import {
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTileContentComponent from "../../product/components/ProductTileContent";
import api from "../../api/api";
import useMySnackbar from "../../hooks/useMySnackbar";
import useViewManager, { CHECKOUT } from "../../hooks/useViewManager";
import {
  addProduct,
  changeQuantity,
  clearCartAndAddProduct,
  removeProduct,
} from "../../store/cartSlice";
import { isWithinRange } from "../../validation/validation";

const useStyles = makeStyles((theme) => ({
  margin: {},
  root: {
    margin: "1em",
    minWidth: 250,
    maxWidth: 300,
    width: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
  priceText: {
    fontWeight: "bold",
    display: "inline",
    color: "green",
  },
  quantityText: {
    fontWeight: "bold",
    display: "inline",
  },
  toolTipDesc: {
    fontSize: 16,
  },
}));

export default function CustomerProductTileContainer(props) {
  const classes = useStyles();
  const { productId } = props;
  const cartQuantityInputRef = useRef();
  const [product, setProduct] = useState();
  const inCart = useSelector((state) => {
    const boolean =
      state.cart.products.filter((p) => p.id === productId).length > 0;
    return boolean;
  });
  const cartQuantity = useSelector((state) => {
    const item = state.cart.products.find((e) => e.id === productId);
    return item ? item.quantity : 0;
  });
  const viewName = useSelector((state) => state.flow.currentView.viewName);
  const viewManager = useViewManager();
  const { enqueueSnackbar } = useMySnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .fetchProduct(productId)
      .then((prod) => setProduct(prod))
      .catch((e) => {
        throw e;
      });
  }, [productId]);

  const onBuyNow = () => {
    dispatch(
      clearCartAndAddProduct({
        id: productId,
        quantity: 1,
      })
    );
    viewManager.navigateTo({
      viewName: CHECKOUT,
      title: "Checkout Cart",
    });
  };

  function addToCartHandler() {
    dispatch(addProduct({ id: productId, quantity: 1 }));
    enqueueSnackbar(`Added item: ${product.name}`, { variant: "success" });
  }
  function removeFromCartHandler() {
    dispatch(removeProduct(productId));
    enqueueSnackbar(`Removed item: ${product.name}`, { variant: "warning" });
  }

  return (
    <Card className={`${props.hasMargin && classes.margin} ${classes.root}`}>
      <CardHeader />
      <ProductTileContentComponent showQuantity={false} product={product} />
      <CardActions>
        {!inCart && (
          <Button
            onClick={onBuyNow}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Buy now
          </Button>
        )}
        {!inCart && (
          <IconButton style={{ color: yellow[800] }} onClick={addToCartHandler}>
            <AddShoppingCartIcon />
            <Typography variant="body2">Add to cart</Typography>
          </IconButton>
        )}
        {inCart && (
          <IconButton onClick={removeFromCartHandler}>
            <RemoveShoppingCartIcon />
            <Typography variant="body2">Remove</Typography>
          </IconButton>
        )}
        {inCart && (
          <TextField
            inputRef={cartQuantityInputRef}
            label="Qt."
            style={{ maxWidth: "7em" }}
            type="number"
            required
            value={cartQuantity}
            onChange={(e) => {
              if (isWithinRange(e.target.value, 0, 100)) {
                dispatch(
                  changeQuantity({ id: productId, newQuantity: e.target.value })
                );
              } else {
                enqueueSnackbar("Sorry, Only 100 available!", {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                dispatch(changeQuantity({ id: productId, newQuantity: 1 }));
              }
            }}
          />
        )}
        {inCart && viewName !== CHECKOUT && (
          <Typography
            onClick={() => viewManager.navigateTo({ viewName: CHECKOUT })}
            variant="small"
            style={{ color: blue[300], cursor: "pointer" }}
          >
            View cart
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}
