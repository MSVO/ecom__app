import { Fragment } from "react";
import Address from "./Address";
import ProductTile from "./ProductTile";

function OrderDetails(props) {
  const { address, product, quantity, onQuantityChange, status, remark } =
    props.order;

  return (
    <Fragment>
      <p>Status: {status}</p>
      <p>Remark: {remark || "No remarks"}</p>
      <h2>Address</h2>
      {!!address && <Address address={address} />}
      <h2>Product</h2>
      {!!product && (
        <ProductTile
          product={{ ...product, quantity }}
          onQuantityChange={onQuantityChange}
        />
      )}
      <h2>Total Price</h2>
      {!!product && <p>Rs. {product.price * quantity}</p>}
    </Fragment>
  );
}

export default OrderDetails;
