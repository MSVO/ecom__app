import {
  Card,
  CardActionArea,
  Dialog,
  DialogTitle,
  List,
  makeStyles,
} from "@material-ui/core";
import Address from "./Address";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    margin: theme.spacing(2),
  },
}));
function ChooseAddressDialog(props) {
  const { title, open, addresses } = props;
  const classes = useStyles();

  function handleClose() {
    props.onClose(addresses[0].id);
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby={title}
      open={open}
      className={classes.root}
    >
      <DialogTitle id={`dialogTitle`}>{title}</DialogTitle>
      <List>
        {!!addresses &&
          addresses.map((address) => (
            <Card key={address.id} className={classes.card}>
              <CardActionArea onClick={() => props.onClose(address.id)}>
                <Address address={address} />
              </CardActionArea>
            </Card>
          ))}
      </List>
    </Dialog>
  );
}
export default ChooseAddressDialog;
