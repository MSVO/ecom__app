import { makeStyles } from "@material-ui/core";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../api/api";
import { makeTiles } from "../components/ProductTile";
import { clearCartAndAddProduct } from "../store/cartSlice";

const useStyles = makeStyles({
  page: {
    backgroundColor: "#E0E0E0",
    padding: "1em",
  },
});

function ProductsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [products, setProducts] = useState();

  const onBuyNow = useCallback(
    (product) => {
      console.log("Buying", product);
      dispatch(
        clearCartAndAddProduct({
          id: product.id,
        })
      );
      history.push("/checkout");
    },
    [dispatch, history]
  );

  const transformProduct = useCallback(
    (product) => {
      return { ...product, onBuyNow };
    },
    [onBuyNow]
  );

  useEffect(() => {
    api
      .fetchProducts()
      .then((products) => products.map(transformProduct))
      .then((products) => setProducts(products))
      .catch((e) => {
        throw e;
      });
  }, [transformProduct]);

  return (
    <div className={classes.page}>
      <Fragment>{!!products && makeTiles(products)}</Fragment>
    </div>
  );
}

export default ProductsPage;
