import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "1em",
  },
  root: {
    minWidth: 275,
    maxWidth: 400,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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

function isSet(variable) {
  return variable !== null && variable !== undefined;
}

function ProductTile(props) {
  const { changeQuantityButton, editButton, deleteButton, actions } = props;
  const classes = useStyles();
  const { id, name, description, price, quantity, imageUrl } = props.product;

  function onBuyNowClickHandler() {
    props.onBuyNow({ id });
  }

  return (
    <Card className={`${props.hasMargin && classes.margin} ${classes.root}`}>
      <CardHeader action={editButton} />
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
        {/* <h3>{name}</h3> */}
        <Tooltip
          className={classes.toolTipDesc}
          title={description || "No description given."}
        >
          <Typography noWrap aria-labelledby={description}>
            {description || "No description given."}
          </Typography>
        </Tooltip>
        <p>
          Price:{" "}
          <Typography className={classes.priceText}>
            ₹ {Number(price).toLocaleString("en-IN")}
          </Typography>
        </p>
        {!isSet(props.onQuantityChange) && isSet(quantity) && (
          <p>
            Qt.{" "}
            <Typography className={classes.quantityText}>
              {quantity}&nbsp;
            </Typography>
            units <span>{changeQuantityButton}</span>
          </p>
        )}
        {isSet(props.onQuantityChange) && (
          <span>
            Qt.{" "}
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => {
                props.onQuantityChange(e.target.value);
              }}
            />
          </span>
        )}
      </CardContent>
      <CardActions>
        {actions}
        {props.onBuyNow && (
          <Button
            onClick={onBuyNowClickHandler}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Buy now
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export function makeTiles(products) {
  return products.map((product) => {
    const { id, onBuyNow } = product;
    return (
      <ProductTile hasMargin key={id} product={product} onBuyNow={onBuyNow} />
    );
  });
}

export default ProductTile;
