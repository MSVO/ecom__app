import {
  Card,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Fragment, useState } from "react";
import StatusStepper from "./StatusStepper";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { useSelector } from "react-redux";
import authReducer from "../store/authSlice";
import { PAST_ORDERS } from "../hooks/useViewManager";
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableHead: {
    fontWeight: "bold",
  },
  media: {
    height: 80,
    width: 80,
    backgroundSize: "contain",
  },
}));

function computePrice(product, quantity) {
  return product.price * quantity;
}
function computeAddressString(address) {
  if (!address) return "";
  else {
    return `${address.name}, ${address.fullAddress}`;
  }
}

function Row(props) {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const { order, showStatus } = props;
  return (
    <Fragment>
      <TableRow key={order.id} className={classes.root}>
        <TableCell>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            {order.id}
          </Typography>
        </TableCell>
        {/* <TableCell>{order.status}</TableCell> */}
        <TableCell>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            {order.product.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            {order.quantity}
          </Typography>
          units
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            style={{ fontWeight: 600, color: green[900] }}
          >
            {`₹ ${Number(
              computePrice(order.product, order.quantity)
            ).toLocaleString("en-IN")}`}
          </Typography>
        </TableCell>
        {/* <TableCell>{computeAddressString(order.address)}</TableCell> */}
        <TableCell>{order.actions} </TableCell>
      </TableRow>
      {showStatus && (
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <CardContent>
              <CardMedia
                className={classes.media}
                image={order.product.imageUrl}
              />
            </CardContent>
          </TableCell>
          <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <StatusStepper status={order.status} />
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}

function OrderTable(props) {
  const { orders } = props;
  const classes = useStyles();
  const viewName = useSelector((state) => state.flow.currentView.viewName);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>Order ID</TableCell>
            {/* <TableCell className={classes.tableHead}>Status</TableCell> */}
            <TableCell className={classes.tableHead}>Product</TableCell>
            <TableCell className={classes.tableHead}>Quantity</TableCell>
            <TableCell className={classes.tableHead}>Gross Price</TableCell>
            {/* <TableCell className={classes.tableHead}>Address</TableCell> */}
            <TableCell className={classes.tableHead}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row order={order} showStatus={viewName === PAST_ORDERS} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
