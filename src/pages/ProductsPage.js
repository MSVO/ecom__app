import {
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Fuse from "fuse.js";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import ProductSearcher from "../components/ProductSearcher";
import ProductTile from "../components/ProductTile";
import ProductForm from "../forms/ProductForm";
import useViewManager, { CHECKOUT, LANDING } from "../hooks/useViewManager";
import SideNavLayout from "../layout/SideNavLayout";
import { clearCartAndAddProduct } from "../store/cartSlice";

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

function ProductsPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const viewManager = useViewManager();
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState({ open: false });
  const isAdmin = auth.roles.includes("ROLE_ADMIN");
  const classes = useStyles();
  const searchString = new URLSearchParams(useLocation().search).get("search");
  const currentView = useSelector((state) => state.flow.currentView);

  const onBuyNow = (product) => {
    dispatch(
      clearCartAndAddProduct({
        id: product.id,
      })
    );
    viewManager.navigateTo({
      viewName: CHECKOUT,
      title: "Checkout Cart",
    });
  };

  const transformProduct = useCallback(
    (product) => {
      let transformedProduct = { ...product, onBuyNow };
      if (isAdmin) {
        transformedProduct = {
          ...transformedProduct,
          quantity: product.stock_quantity,
        };
      }
      return transformedProduct;
    },
    [isAdmin]
  );

  useEffect(() => {
    // if (!auth.token || !isAdmin) {
    //   viewManager.navigateTo({
    //     viewName: LANDING,
    //     queryString: "",
    //   })
    //   return;
    // }
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
      .then((products) => products.map(transformProduct))
      .then((products) => setProducts(products))
      .catch((e) => {
        throw e;
      });
  }, [transformProduct, searchString]);

  function updateLocalProduct(productId, localIndex, updates) {
    setProducts((products) => {
      if (products[localIndex].id === productId) {
        if (updates.stock_quantity) {
          updates = { ...updates, quantity: updates.stock_quantity };
        }
        products[localIndex] = { ...products[localIndex], ...updates };
        return [...products];
      } else {
        return products;
      }
    });
  }

  function submitEditHandler(fields, localIndex) {
    const { id, name, description, price, stock_quantity, imageUrl } = fields;
    api
      .putProduct({
        token: auth.token,
        productId: id,
        name,
        description,
        price,
        stockQuantity: stock_quantity,
        imageUrl,
      })
      .then((updatedProduct) => {
        const { name, description, price, stock_quantity, imageUrl } =
          updatedProduct;
        updateLocalProduct(id, localIndex, {
          name,
          description,
          price,
          stock_quantity,
          imageUrl,
        });
        modalCloseHandler();
      })
      .catch((e) => {
        throw e;
      });
  }

  function editButtonHandler(productId, localIndex) {
    api
      .fetchProduct(productId)
      .then((product) => {
        const body = (
          <ProductForm
            product={product}
            onSubmit={(fields) => submitEditHandler(fields, localIndex)}
          />
        );
        setModal({ open: true, body });
      })
      .catch((e) => {
        throw e;
      });
  }

  const computeActions = useCallback(
    (product) => {
      if (!isAdmin) {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onBuyNow(product)}
          >
            Buy now
          </Button>
        );
      }
    },
    [isAdmin]
  );

  function modalCloseHandler() {
    setModal({ open: false });
  }
  function submitNewProductFormHandler(fields) {
    const {
      name,
      description,
      price,
      stock_quantity: stockQuantity,
      imageUrl,
    } = fields;
    api
      .createProduct({
        token: auth.token,
        name,
        description,
        price,
        stockQuantity,
        imageUrl,
      })
      .then((product) => {
        product.quantity = product.stock_quantity;
        setProducts((products) => {
          products.push(product);
          return [...products];
        });
        modalCloseHandler();
      })
      .catch((e) => {
        throw e;
      });
  }
  function newProductButtonHandler() {
    setModal({
      open: true,
      body: (
        <ProductForm
          onSubmit={(fields) => submitNewProductFormHandler(fields)}
        />
      ),
    });
  }

  const searchHandler = useCallback(
    (searchString) => {
      viewManager.navigateTo({
        ...currentView,
        queryString: `?search=${encodeURI(searchString)}`,
      });
    },
    [currentView]
  );

  return (
    <SideNavLayout>
      <Dialog open={modal.open} onClose={modalCloseHandler}>
        <Card className={classes.dialogContent}>{modal.body}</Card>
      </Dialog>
      <ProductSearcher onSearch={searchHandler} />
      <br />
      <br />
      {isAdmin && (
        <Fragment>
          <Button
            color="primary"
            variant="contained"
            onClick={newProductButtonHandler}
          >
            Add New
          </Button>
          <br />
          <br />
        </Fragment>
      )}
      <Grid container wrap="wrap" spacing={3}>
        {products.map((product, localIndex) => (
          <Grid key={product.id} className={classes.gridItem}>
            <ProductTile
              product={product}
              editButton={
                isAdmin && (
                  <IconButton
                    size="small"
                    onClick={() => editButtonHandler(product.id, localIndex)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )
              }
              actions={computeActions(product)}
              // changeQuantityButton={
              //   <IconButton
              //     size="small"
              //     onClick={() =>
              //       changeQuantityButtonHandler(product.id, localIndex)
              //     }
              //   >
              //     <EditIcon fontSize="small" />
              //   </IconButton>
              // }
            />
          </Grid>
        ))}
      </Grid>
    </SideNavLayout>
  );
}

export default ProductsPage;
