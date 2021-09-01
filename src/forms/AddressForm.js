import { Button, makeStyles, TextField } from "@material-ui/core";
import { useRef } from "react";

// Styles
const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(2),
  },
}));

// Component
function AddressForm(props) {
  // Vars
  const classes = useStyles();
  const refs = {
    name: useRef(),
    fullAddress: useRef(),
    pinCode: useRef(),
    email: useRef(),
    mobile: useRef(),
  };

  // Handlers
  function formSubmitHandler(event) {
    event.preventDefault();
    props.onSubmit(
      Object.fromEntries(
        Object.keys(refs).map((key) => [key, refs[key].current.value])
      )
    );
  }

  // JSX
  return (
    <form onSubmit={formSubmitHandler}>
      <TextField
        inputRef={refs.name}
        required
        fullWidth
        margin="normal"
        size="small"
        type="text"
        id="address-name"
        autoFocus
        label="Name"
        variant="outlined"
      />
      <TextField
        inputRef={refs.fullAddress}
        required
        fullWidth
        minRows="3"
        margin="normal"
        size="small"
        type="text"
        label="Full Address"
        variant="outlined"
        multiline
      />
      <TextField
        inputRef={refs.pinCode}
        required
        fullWidth
        margin="normal"
        size="small"
        type="text"
        id="address-pincode"
        label="Pin Code"
        variant="outlined"
      />
      <TextField
        inputRef={refs.email}
        required
        fullWidth
        margin="normal"
        size="small"
        type="text"
        id="address-email"
        label="Email"
        variant="outlined"
      />
      <TextField
        inputRef={refs.mobile}
        required
        fullWidth
        margin="normal"
        size="small"
        type="text"
        id="address-mobile"
        label="Mobile"
        variant="outlined"
      />
      <Button
        className={classes.submit}
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default AddressForm;
