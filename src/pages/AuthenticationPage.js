import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import api from "../api/api";
import UserCredentialsForm from "../forms/UserCredentialsForm";
import routes from "../routes/routes";
import { setToken } from "../store/authSlice";
import { clearNextView } from "../store/flowSlice";

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
  const history = useHistory();
  const nextView = useSelector((state) => state.flow.nextView);

  function onSignIn(creds) {
    const { email, password } = creds;
    api
      .obtainUserToken(email, password)
      .then((token) => {
        dispatch(setToken(token));
        history.push(routes[nextView].buildPath());
        dispatch(clearNextView());
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
