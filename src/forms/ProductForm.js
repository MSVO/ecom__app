import { Button, TextField } from "@material-ui/core";
import { useRef } from "react";

function ProductForm(props) {
  const product = props.product || {};
  const title = props.title;
  const refs = {
    name: useRef(),
    description: useRef(),
    price: useRef(),
    stock_quantity: useRef(),
  };

  function submitHandler(event) {
    event.preventDefault();
    props.onSubmit({
      id: product.id,
      name: refs.name.current.value,
      description: refs.description.current.value,
      price: refs.price.current.value,
      stock_quantity: refs.stock_quantity.current.value,
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>{title}</h2>
      <TextField
        inputRef={refs.name}
        required
        fullWidth
        margin="normal"
        size="small"
        type="text"
        id="productName"
        autoFocus
        label="Name"
        variant="outlined"
        defaultValue={product.name}
      />
      <TextField
        inputRef={refs.description}
        minRows={3}
        multiline
        fullWidth
        margin="normal"
        size="small"
        type="text"
        id="productDescription"
        autoFocus
        label="Description"
        variant="outlined"
        defaultValue={product.description}
      />
      <TextField
        inputRef={refs.price}
        margin="normal"
        size="small"
        type="number"
        id="productPrice"
        autoFocus
        label="Price"
        variant="outlined"
        defaultValue={product.price}
      />
      <br />
      <TextField
        inputRef={refs.stock_quantity}
        margin="normal"
        size="small"
        type="number"
        id="productStockQuantity"
        autoFocus
        label="Stock Quantity"
        variant="outlined"
        defaultValue={product.stock_quantity}
      />
      <br />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
}

export default ProductForm;
