import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    fontWeight: "bold",
  },
}));

function OrderTable(props) {
  const { orders } = props;

  const classes = useStyles();
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
            <TableCell className={classes.tableHead}>Order ID</TableCell>
            <TableCell className={classes.tableHead}>Status</TableCell>
            <TableCell className={classes.tableHead}>Product</TableCell>
            <TableCell className={classes.tableHead}>Quantity</TableCell>
            <TableCell className={classes.tableHead}>Gross Price</TableCell>
            <TableCell className={classes.tableHead}>Address</TableCell>
            <TableCell className={classes.tableHead}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{`₹ ${Number(
                computePrice(order.product, order.quantity)
              ).toLocaleString("en-IN")}`}</TableCell>
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
