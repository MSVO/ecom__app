import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../api/api";
import { makeTiles } from "../components/ProductTile";
import SideNavLayout from "../layout/SideNavLayout";
import { clearCartAndAddProduct } from "../store/cartSlice";

function ProductsPage() {
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
    <SideNavLayout>
      <Fragment>{!!products && makeTiles(products)}</Fragment>
    </SideNavLayout>
  );
}

export default ProductsPage;
