import { makeStyles } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import api from "../api/api";
import { makeTiles } from "../components/ProductTile";

const useStyles = makeStyles({
  page: {
    backgroundColor: "#E0E0E0",
    padding: "1em",
  },
});

function ProductsPage() {
  const classes = useStyles();

  const [products, setProducts] = useState();
  useEffect(() => {
    api
      .fetchProducts()
      .then((products) => setProducts(products))
      .catch((e) => {
        throw e;
      });
  }, []);

  return (
    <div className={classes.page}>
      <Fragment>{!!products && makeTiles(products)}</Fragment>;
    </div>
  );
}

export default ProductsPage;
