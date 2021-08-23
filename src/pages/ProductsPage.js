import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../api/api";
import { makeTiles } from "../components/ProductTile";
import useViewManager, { CHECKOUT } from "../hooks/useViewManager";
import SideNavLayout from "../layout/SideNavLayout";
import { clearCartAndAddProduct } from "../store/cartSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState();
  const viewManager = useViewManager();

  const onBuyNow = useCallback(
    (product) => {
      console.log("Buying", product);
      dispatch(
        clearCartAndAddProduct({
          id: product.id,
        })
      );
      viewManager.navigateTo({
        viewName: CHECKOUT,
        title: "Checkout Cart",
      });
    },
    [dispatch]
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
