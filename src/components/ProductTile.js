import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
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
});

function isSet(variable) {
  return variable !== null && variable !== undefined;
}

function ProductTile(props) {
  const { changeQuantityButton, editButton, deleteButton, actions } = props;
  const classes = useStyles();
  const { id, name, description, price, quantity } = props.product;

  function onBuyNowClickHandler() {
    props.onBuyNow({ id });
  }

  return (
    <Card className={`${props.hasMargin && classes.margin} ${classes.root}`}>
      <CardContent>
        <h3>
          {name} {editButton}
          {deleteButton}
        </h3>
        <Typography noWrap>{description}</Typography>
        <p>Price: Rs. {price}</p>
        {!isSet(props.onQuantityChange) && isSet(quantity) && (
          <p>
            Qt. {quantity} units <span>{changeQuantityButton}</span>
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
