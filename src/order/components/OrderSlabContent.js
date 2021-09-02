import {
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import StatusStepper from "../../components/StatusStepper";
import AddressContent from "../../customer-address/components/AddressContent";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 50,
  },
  media: {
    height: 120,
    width: 120,
    backgroundSize: "contain",
    margin: "1em",
  },
  addressGrid: {
    minWidth: 400,
    maxWidth: 450,
    width: "100%",
  },
  imageGrid: {
    minWidth: 250,
    maxWidth: 300,
    width: "100%",
  },
  infoGrid: {
    minWidth: 80,
    maxWidth: 100,
    width: "100%",
  },
}));

function OrderSlabSkeleton(props) {
  const { isExpanded } = props;
  const classes = useStyles();
  return (
    <CardContent>
      <Grid container justifyContent="space-between">
        <Grid item xs={2} className={classes.imageGrid}>
          <Skeleton type="text" />
          <Skeleton type="rect" className={classes.media} />
        </Grid>
        <Grid item xs={1} className={classes.infoGrid}>
          <Grid container direction="column">
            <Grid item>
              <Skeleton type="text" />
            </Grid>
            <Grid item style={{ marginTop: "1em" }}>
              <Skeleton type="text" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Collapse in={isExpanded} style={{ paddingTop: "1em" }}>
          <Skeleton type="rect" style={{ width: "100%", height: "1em" }} />
        </Collapse>
      </Grid>
    </CardContent>
  );
}

// TODO: Take totalprice from props and discard this function
function computePrice(product, quantity) {
  return product.price * quantity;
}

export default function OrderSlabContent(props) {
  const classes = useStyles();
  const { order, isExpanded } = props;

  if (!order) return <OrderSlabSkeleton isExpanded={isExpanded} />;

  const { product, quantity, status, address } = order;
  const totalPrice = computePrice(product, quantity).toLocaleString("en-IN");
  const { imageUrl, name } = product;
  return (
    <CardContent>
      <Grid container xs={12} justifyContent="space-between" wrap="wrap">
        <Grid item className={classes.imageGrid}>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            {order.product.name}
          </Typography>
          <CardMedia image={imageUrl} className={classes.media} />
        </Grid>
        <Grid item className={classes.infoGrid}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                {quantity}
              </Typography>
              units
            </Grid>
            <Grid item style={{ marginTop: "1em" }}>
              <Typography
                variant="body1"
                style={{ fontWeight: 600, color: green[900] }}
              >
                ₹ {totalPrice}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.addressGrid}>
          <Typography variant="caption">Deliver to</Typography>
          <AddressContent address={address} />
        </Grid>
      </Grid>
      <Grid>
        <Collapse in={isExpanded} style={{ paddingTop: "1em" }}>
          <StatusStepper status={status} />
        </Collapse>
      </Grid>
    </CardContent>
  );
}
