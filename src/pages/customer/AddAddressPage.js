import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import AddressForm from "../../forms/AddressForm";
import useViewManager from "../../hooks/useViewManager";
import SideNavLayout from "../../layout/SideNavLayout";
import { setDeliveryAddress } from "../../store/cartSlice";

function AddAddressPage(props) {
  const auth = useSelector((state) => state.auth);
  const currentView = useSelector((state) => state.flow.currentView);
  const viewManager = useViewManager();
  const dispatch = useDispatch();
  // TODO: Redirect if not logged in
  function addressFormSubmitHandler(address) {
    console.log(address);
    const { name, fullAddress, pinCode, email, mobile } = address;
    api
      .addNewAddressForUser({
        token: auth.token,
        name,
        fullAddress,
        pinCode,
        email,
        mobile,
      })
      .then((id) => {
        console.log(id);
        api
          .fetchAddressById({ token: auth.token, addressId: id })
          .then((address) => {
            dispatch(setDeliveryAddress(address));
          });
        viewManager.moveForward();
      })
      .catch((e) => {
        throw e;
      });
  }

  return (
    <SideNavLayout>
      <Grid xs={6}>
        <h1>Add an Address</h1>
        {currentView.message && (
          <Alert severity={currentView.message.severity}>
            {currentView.message.text}
          </Alert>
        )}
        <AddressForm onSubmit={addressFormSubmitHandler} />
      </Grid>
    </SideNavLayout>
  );
}

export default AddAddressPage;
