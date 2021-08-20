import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import api from "../api/api";
import UserCredentialsForm from "../forms/UserCredentialsForm";
import useViewManager from "../hooks/useViewManager";
import { setToken } from "../store/authSlice";

const useStyles = makeStyles((theme) => ({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function AuthenticationPage(props) {
  const dispatch = useDispatch();
  const { activeTab } = props;
  const classes = useStyles();
  const viewManager = useViewManager();
  function onSignIn(creds) {
    const { email, password } = creds;
    api
      .obtainUserToken(email, password)
      .then((token) => {
        dispatch(setToken(token));
        viewManager.moveForward();
      })
      .catch((e) => {
        throw e;
      });
  }

  return (
    <div className={classes.centerContent}>
      {activeTab === "signin" && (
        <UserCredentialsForm
          title="Sign In"
          submitButtonLabel="Sign In"
          onSubmit={onSignIn}
        />
      )}
    </div>
  );
}

export default AuthenticationPage;
