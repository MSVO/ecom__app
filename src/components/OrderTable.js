import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function OrderTable(props) {
  const { orders } = props;

  function computePrice(product, quantity) {
    return product.price * quantity;
  }
  function computeAddressString(address) {
    if (!address) return "";
    else {
      return `${address.name}, ${address.fullAddress}`;
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Oder ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Gross Price</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{`₹ ${computePrice(
                order.product,
                order.quantity
              )}`}</TableCell>
              <TableCell>{computeAddressString(order.address)}</TableCell>
              <TableCell>{order.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
