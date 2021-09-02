import { Container, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Fuse from "fuse.js";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../../api/api";
import ProductSearcher from "../../components/ProductSearcher";
import useViewManager from "../../hooks/useViewManager";
import SideNavLayout from "../../layout/SideNavLayout";
import CustomerProductTileContainer from "../containers/ProductTile";

const fuseOptions = {
  keys: ["name"],
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(3),
  },
  gridItem: {
    minWidth: 275,
    maxWidth: 350,
    width: "100%",
    margin: theme.spacing(2),
  },
}));

export default function CustomerProductsPage() {
  const [products, setProducts] = useState([]);
  const viewManager = useViewManager();
  const auth = useSelector((state) => state.auth);
  const searchString = new URLSearchParams(useLocation().search).get("search");
  const currentView = useSelector((state) => state.flow.currentView);

  useEffect(() => {
    api
      .fetchProducts()
      .then((products) => {
        if (searchString) {
          const fuse = new Fuse(products, fuseOptions);
          return fuse.search(searchString).map((result) => result.item);
        } else {
          return products;
        }
      })
      .then((products) => setProducts(products))
      .catch((e) => {
        throw e;
      });
  }, [searchString]);

  const searchHandler = useCallback(
    (searchString) => {
      viewManager.navigateTo({
        ...currentView,
        queryString: `?search=${encodeURI(searchString)}`,
      });
    },
    [currentView]
  );

  if (!products)
    return (
      <SideNavLayout>
        <CustomerProductTileContainer product={false} />
      </SideNavLayout>
    );

  return (
    <SideNavLayout>
      <ProductSearcher onSearch={searchHandler} />
      <br />
      <br />
      <Grid container wrap="wrap" spacing={3}>
        {products.map((product) => (
          <CustomerProductTileContainer productId={product.id} />
        ))}
      </Grid>
    </SideNavLayout>
  );
}
