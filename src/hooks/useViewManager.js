import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import { clearToken } from "../store/authSlice";
import { clearCart } from "../store/cartSlice";
import {
  discardNextViews,
  popNextViewOrLandingToCurrent,
  pushCurrentView,
  pushCurrentViewAndSetNew,
  pushNextView,
  resetFlow,
  setCurrentView,
} from "../store/flowSlice";
const LANDING = "landing";
const SIGNIN = "signIn";
const CHECKOUT = "checkout";
const ADD_ADDRESS = "addAddress";
const ORDER = "order";

function useViewManager() {
  const history = useHistory();
  const dispatch = useDispatch();
  const flow = useSelector((state) => state.flow);

  useEffect(() => {
    const currentView = flow.currentView;
    if (flow.currentView === null) {
    } else if (flow.currentView === "") {
      history.push(routes.landing.buildPath());
    } else if (typeof flow.currentView === "string") {
      history.push(routes[flow.currentView].buildPath());
    } else if (typeof flow.currentView === "object") {
      switch (flow.currentView.viewName) {
        case ORDER:
          history.push(routes.order.buildPath(currentView.orderId));
          break;
        case SIGNIN:
          history.push(routes.signIn.buildPath());
          break;
        case CHECKOUT:
          history.push(routes.checkout.buildPath());
          break;
        case ADD_ADDRESS:
          history.push(routes.addAddress.buildPath());
          break;
        default:
          break;
      }
    }
  }, [flow.currentView, history]);

  const pushView = (viewName) => {
    dispatch(pushNextView(viewName));
  };
  // const nextViewOrLanding = () => {
  //   if (flow.forwardViewStack.length >= 1) {
  //     return flow.forwardViewStack[flow.forwardViewStack.length - 1];
  //   } else {
  //     return LANDING;
  //   }
  // };
  const moveForward = () => {
    dispatch(popNextViewOrLandingToCurrent());
  };
  const discardStack = () => {
    dispatch(discardNextViews());
  };
  const navigateTo = (view) => {
    dispatch(setCurrentView(view));
  };
  const promptSignIn = () => {
    dispatch(pushCurrentView());
    navigateTo(SIGNIN);
  };
  const pushCurrentAndNavigate = (destinationView) => {
    dispatch(pushCurrentView());
    dispatch(pushCurrentViewAndSetNew(destinationView));
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
    promptSignIn,
    pushCurrentAndNavigate,
    logout,
  };
  return viewManager;
}

export { LANDING, SIGNIN, CHECKOUT, ADD_ADDRESS, ORDER };
export default useViewManager;
