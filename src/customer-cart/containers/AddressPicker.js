import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Dialog,
  DialogTitle,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuthSelector } from "../../auth/hooks";
import useMySnackbar from "../../hooks/useMySnackbar";
import useViewManager, { ADD_ADDRESS } from "../../hooks/useViewManager";
import Address from "../../customer-address/components/Address";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    margin: theme.spacing(2),
  },
}));

const title = "PIck Address";

function useAddressPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState();
  const { isCustomer, authToken } = useAuthSelector();
  const { enqueueFetchFailedSnack } = useMySnackbar();
  const viewManager = useViewManager();
  const classes = useStyles();

  useEffect(() => {
    if (!isCustomer) {
      return <Typography>Not signed in!</Typography>;
    } else {
      api
        .fetchAddressesOfAuthenticatedUser(authToken)
        .then(setAddresses)
        .catch((e) => {
          enqueueFetchFailedSnack();
        });
    }
  }, [isCustomer, authToken]);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function addNewButtonHandler() {
    viewManager.pushCurrentAndNavigate({
      viewName: ADD_ADDRESS,
      message: {
        text: "Please add an address to continue purchase",
        severity: "warning",
      },
    });
  }

  function AddressCard(props) {
    const { address } = props;
    const { onPick: cardClickHandler } = props;

    return (
      <Card key={address.id} className={classes.card}>
        <CardActionArea onClick={cardClickHandler}>
          <Address address={address} />
        </CardActionArea>
      </Card>
    );
  }

  function AddressPickerContainer(props) {
    function cancel() {
      props.onCancel && props.onCancel();
    }

    function makePickHandler(address) {
      return () => props.onPick(address);
    }

    if (!addresses) return <CircularProgress />;
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={cancel}
        aria-labelledby={title}
        open={isOpen}
        className={classes.root}
      >
        <Box style={{ padding: "1em", backgroundColor: grey[200] }}>
          <DialogTitle id={`dialogTitle`}>{title}</DialogTitle>
          <List>
            {addresses.map((address) => (
              <AddressCard
                address={address}
                onPick={makePickHandler(address)}
              />
            ))}
            <Button
              onClick={addNewButtonHandler}
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

  const AddressPicker = {
    open,
    close,
    AddressPickerContainer,
  };
  return AddressPicker;
}

export default useAddressPicker;
