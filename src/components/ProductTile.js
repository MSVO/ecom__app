import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import useMySnackbar from "../hooks/useMySnackbar";
import useViewManager, { CHECKOUT } from "../hooks/useViewManager";
import {
  addProduct,
  changeQuantity,
  clearCartAndAddProduct,
  removeProduct,
} from "../store/cartSlice";
import { isWithinRange } from "../validation/validation";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "1em",
  },
  root: {
    minWidth: 275,
    maxWidth: 400,
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

function isSet(variable) {
  return variable !== null && variable !== undefined;
}

function ProductTile(props) {
  const { changeQuantityButton, editButton, deleteButton, actions } = props;
  const classes = useStyles();
  const { productId, fetchProduct } = props;
  const cartQuantityInputRef = useRef();
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (fetchProduct) {
      api
        .fetchProduct(productId)
        .then((prod) => setProduct(prod))
        .catch((e) => {
          throw e;
        });
    } else {
      setProduct(props.product);
    }
  }, [fetchProduct, productId]);

  const { id, name, description, price, quantity, imageUrl } = product;
  const inCart = useSelector((state) => {
    const boolean = state.cart.products.filter((p) => p.id === id).length > 0;
    return boolean;
  });
  const cartQuantity = useSelector((state) => {
    const item = state.cart.products.find((e) => e.id === id);
    return item ? item.quantity : 0;
  });
  const [cartQuantityIsValid, setCartQuantityIsValid] = useState(false);
  const viewManager = useViewManager();
  const viewName = useSelector((state) => state.flow.currentView.viewName);
  const { enqueueSnackbar } = useMySnackbar();
  const dispatch = useDispatch();
  function onBuyNowClickHandler() {
    props.onBuyNow({ id });
  }

  const onBuyNow = () => {
    dispatch(
      clearCartAndAddProduct({
        id,
        quantity: 1,
      })
    );
    viewManager.navigateTo({
      viewName: CHECKOUT,
      title: "Checkout Cart",
    });
  };

  function addToCartHandler() {
    dispatch(addProduct({ id, quantity: 1 }));
    enqueueSnackbar(`Added item: ${name}`, { variant: "success" });
  }
  function removeFromCartHandler() {
    dispatch(removeProduct(id));
    enqueueSnackbar(`Removed item: ${name}`, { variant: "warning" });
  }

  return (
    <Card className={`${props.hasMargin && classes.margin} ${classes.root}`}>
      <CardHeader action={editButton} />
      <CardContent>
        <CardMedia
          className={`${classes.media} ${classes.img}`}
          image={imageUrl}
          title={name}
        />
        <br />
        <Typography variant="h6" noWrap aria-labelledby={name}>
          {name}
        </Typography>
        {/* <h3>{name}</h3> */}
        <Tooltip
          className={classes.toolTipDesc}
          title={description || "No description given."}
        >
          <Typography noWrap aria-labelledby={description}>
            {description || "No description given."}
          </Typography>
        </Tooltip>
        <Typography variant="h6" align="right" className={classes.priceText}>
          ₹ {Number(price).toLocaleString("en-IN")}
        </Typography>
        {!isSet(props.onQuantityChange) && isSet(quantity) && (
          <p>
            Qt.{" "}
            <Typography className={classes.quantityText}>
              {quantity}&nbsp;
            </Typography>
            units <span>{changeQuantityButton}</span>
          </p>
        )}
        {isSet(props.onQuantityChange) && (
          <span>
            Qt.{" "}
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => {
                props.onQuantityChange(e.target.value);
              }}
            />
          </span>
        )}
      </CardContent>
      <CardActions>
        {/* {actions} */}
        {props.showCartButton && !inCart && (
          <Button
            onClick={onBuyNow}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Buy now
          </Button>
        )}
        {props.showCartButton && !inCart && (
          <IconButton style={{ color: yellow[800] }} onClick={addToCartHandler}>
            <AddShoppingCartIcon />
            <Typography variant="body2">Add to cart</Typography>
          </IconButton>
        )}
        {props.showCartButton && inCart && (
          <IconButton onClick={removeFromCartHandler}>
            <RemoveShoppingCartIcon />
            <Typography variant="body2">Remove</Typography>
          </IconButton>
        )}
        {props.showCartButton && inCart && (
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
                  changeQuantity({ id: id, newQuantity: e.target.value })
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
                dispatch(changeQuantity({ id: id, newQuantity: 1 }));
              }
            }}
          />
        )}
        {props.showCartButton && inCart && viewName !== CHECKOUT && (
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

export function makeTiles(products) {
  return products.map((product) => {
    const { id, onBuyNow } = product;
    return (
      <ProductTile hasMargin key={id} product={product} onBuyNow={onBuyNow} />
    );
  });
}

export default ProductTile;
