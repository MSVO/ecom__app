import {
  CardContent,
  CardMedia,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "1em",
  },
  title: {
    fontSize: 14,
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
  priceText: {
    fontWeight: "bold",
    display: "inline",
    color: "green",
  },
  quantityText: {
    fontWeight: "bold",
    display: "inline",
  },
  toolTipDesc: {
    fontSize: 16,
  },
}));

function ProductTileContentSkeleton() {
  const classes = useStyles();
  return (
    <CardContent>
      <Skeleton variant="rect" className={`${classes.media} ${classes.img}`} />
      <br />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </CardContent>
  );
}
export default function ProductTileContentComponent(props) {
  const { product, showQuantity } = props;
  const classes = useStyles();

  if (!product) return <ProductTileContentSkeleton />;
  const { name, description, price, quantity, imageUrl } = product;
  return (
    <CardContent>
      <CardMedia
        className={`${classes.media} ${classes.img}`}
        image={imageUrl}
        title={name}
      />
      <br />
      <Typography variant="h6" noWrap aria-labelledby={name}>
        {name}
      </Typography>
      <Tooltip
        className={classes.toolTipDesc}
        title={description || "No description given."}
      >
        <Typography noWrap aria-labelledby={description}>
          {description || "No description given."}
        </Typography>
      </Tooltip>
      <Typography variant="h6" align="right" className={classes.priceText}>
        ₹ {Number(price).toLocaleString("en-IN")}
      </Typography>
      {showQuantity && (
        <p>
          Qt.{" "}
          <Typography className={classes.quantityText}>{quantity}</Typography>
          units
        </p>
      )}
    </CardContent>
  );
}
