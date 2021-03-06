import {
  CardContent,
  CardMedia,
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
import { green } from "@material-ui/core/colors";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { PAST_ORDERS } from "../hooks/useViewManager";
import StatusStepper from "./StatusStepper";
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
            <TableCell className={classes.tableHead}>Product</TableCell>
            <TableCell className={classes.tableHead}>Quantity</TableCell>
            <TableCell className={classes.tableHead}>Gross Price</TableCell>
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
