import { Button, FormControl, makeStyles, TextField } from "@material-ui/core";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "block",
    margin: theme.spacing(1),
  },
}));

function UserCredentialsForm(props) {
  const emailInput = useRef();
  const passwordInput = useRef();

  const classes = useStyles();
  const { title, submitButtonLabel } = props;

  function onSubmitHandler(event) {
    event.preventDefault();
    props.onSubmit({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <h1 className={classes.formControl}>{title}</h1>
      <FormControl className={classes.formControl}>
        <TextField
          fullWidth
          inputRef={emailInput}
          label="Email"
          variant="outlined"
          type="text"
          required
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          fullWidth
          inputRef={passwordInput}
          label="Password"
          variant="outlined"
          type="password"
          required
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" color="primary" type="submit">
          {submitButtonLabel}
        </Button>
      </FormControl>
    </form>
  );
}

export default UserCredentialsForm;
