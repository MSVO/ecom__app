import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "1em",
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
  const classes = useStyles();
  const { name, description, price, quantity } = props;
  return (
    <Card className={classes.root}>
      <CardContent>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price: Rs. {price}</p>
        {isSet(quantity) && <p>Qt. {quantity} units</p>}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" disableElevation>
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}

export function makeTiles(products) {
  return products.map((product) => {
    const { id, name, description, price } = product;
    return (
      <ProductTile
        key={id}
        name={name}
        description={description}
        price={price}
      />
    );
  });
}

export default ProductTile;
