import { Grid, Paper, Tab, Tabs } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import UserCredentialsForm from "../../forms/UserCredentialsForm";
import useViewManager from "../../hooks/useViewManager";
import SideNavLayout from "../../layout/SideNavLayout";
import { setAuth } from "../../store/authSlice";

function AuthenticationPage(props) {
  const dispatch = useDispatch();
  const viewManager = useViewManager();
  const [tabIndex, setTabIndex] = useState(0);
  const currentView = useSelector((state) => state.flow.currentView);

  function authSuccessHandler({ email, token }) {
    dispatch(
      setAuth({
        token,
        name: email,
        roles: token.split(":")[1].split(";"),
        userId: Number(token.split(":")[0]),
      })
    );
    viewManager.moveForward();
  }

  function onSignIn(creds) {
    const { email, password } = creds;
    api
      .obtainUserToken(email, password)
      .then((token) => {
        authSuccessHandler({ email, token });
      })
      .catch((e) => {
        throw e;
      });
  }

  function onSignUp(creds) {
    const { email, password } = creds;
    api
      .createAccountAndObtainToken(email, password)
      .then((token) => {
        authSuccessHandler({ email, token });
      })
      .catch((e) => {
        throw e;
      });
  }

  function tabSelectHandler(event, newValue) {
    setTabIndex(newValue);
  }

  return (
    <SideNavLayout>
      <Grid item xs={4}>
        {currentView.message && (
          <Alert severity={currentView.message.severity}>
            {currentView.message.text}
          </Alert>
        )}
        <Paper square>
          <Tabs
            value={tabIndex}
            indicatorColor="primary"
            onChange={tabSelectHandler}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Paper>
        {tabIndex === 0 && (
          <UserCredentialsForm
            title="Sign In"
            submitButtonLabel="Sign In"
            onSubmit={onSignIn}
          />
        )}
        {tabIndex === 1 && (
          <UserCredentialsForm
            title="Sign Up"
            submitButtonLabel="Create Account"
            onSubmit={onSignUp}
          />
        )}
      </Grid>
    </SideNavLayout>
  );
}

export default AuthenticationPage;
