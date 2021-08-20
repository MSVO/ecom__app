import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import { clearToken } from "../store/authSlice";
import { clearCart } from "../store/cartSlice";
import {
  discardNextViews,
  popNextView,
  pushNextView,
  resetFlow,
} from "../store/flowSlice";
const LANDING = "landing";
const SIGNIN = "signIn";
const CHECKOUT = "checkout";

function useViewManager() {
  const history = useHistory();
  const dispatch = useDispatch();
  const flow = useSelector((state) => state.flow);
  const pushView = (viewName) => {
    dispatch(pushNextView(viewName));
  };
  const nextViewOrLanding = () => {
    if (flow.forwardViewStack.length >= 1) {
      return flow.forwardViewStack[flow.forwardViewStack.length - 1];
    } else {
      return LANDING;
    }
  };
  const moveForward = () => {
    const viewName = nextViewOrLanding();
    dispatch(popNextView());
    history.push(routes[viewName].buildPath());
  };
  const discardStack = () => {
    dispatch(discardNextViews());
  };
  const navigateTo = (viewName) => {
    history.push(routes[viewName].buildPath());
  };
  const logout = () => {
    dispatch(clearCart());
    dispatch(resetFlow());
    dispatch(clearToken());
    navigateTo(LANDING);
  };
  const viewManager = {
    pushView,
    moveForward,
    navigateTo,
    discardStack,
    logout,
  };
  return viewManager;
}

export { LANDING, SIGNIN, CHECKOUT };
export default useViewManager;
