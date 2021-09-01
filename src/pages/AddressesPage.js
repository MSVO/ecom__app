import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/api";
import Address from "../components/Address";
import SideNavLayout from "../layout/SideNavLayout";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
    maxWidth: 500,
  },
}));

function AddressesPage(props) {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const [addresses, setAddresses] = useState([]);

  function addressDeleteHandler(addressId, addressIndex) {
    api
      .deleteAddressById({
        token: auth.token,
        addressId,
      })
      .then(() => {
        setAddresses((addresses) => [
          ...addresses.slice(0, addressIndex),
          ...addresses.slice(addressIndex + 1, addresses.length),
        ]);
      })
      .catch((e) => {
        throw e;
      });
  }

  useEffect(() => {
    api
      .fetchAddressesOfAuthenticatedUser(auth.token)
      .then((addresses) => {
        setAddresses(addresses);
      })
      .catch((e) => {
        throw e;
      });
  }, [auth.token]);

  return (
    <SideNavLayout>
      <Grid container direction="column" xs={4}>
        {!!addresses &&
          addresses.map((address, index) => (
            <Address
              className={classes.card}
              key={address.id}
              address={address}
              actions={
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => addressDeleteHandler(address.id, index)}
                >
                  Delete
                </Button>
              }
            />
          ))}
        {(!addresses || addresses.length === 0) && (
          <Container fullWidth>
            <Typography variant="h5">Nothing to see here</Typography>
          </Container>
        )}
      </Grid>
    </SideNavLayout>
  );
}

export default AddressesPage;
