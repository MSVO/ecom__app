import {
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogTitle,
  List,
  makeStyles,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import useViewManager, { ADD_ADDRESS } from "../hooks/useViewManager";
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
  const viewManager = useViewManager();
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
      <Box style={{ padding: "1em", backgroundColor: grey[200] }}>
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
          <Button
            onClick={() =>
              viewManager.pushCurrentAndNavigate({
                viewName: ADD_ADDRESS,
                message: {
                  text: "Please add an address to continue purchase",
                  severity: "warning",
                },
              })
            }
            variant="outlined"
            color="primary"
          >
            Add New
          </Button>
        </List>
      </Box>
    </Dialog>
  );
}
export default ChooseAddressDialog;
