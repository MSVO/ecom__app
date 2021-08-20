import { Fragment } from "react";
import Address from "./Address";
import ProductTile from "./ProductTile";

function OrderDetails(props) {
  const { address, product, quantity } = props.order;

  return (
    <Fragment>
      <h2>Address</h2>
      <Address address={address} />
      <h2>Product</h2>
      {!!product && <ProductTile product={product} />}
      <h2>Total Price</h2>
      {!!product && <p>Rs. {product.price * quantity}</p>}
    </Fragment>
  );
}

export default OrderDetails;
