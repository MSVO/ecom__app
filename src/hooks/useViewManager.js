import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import { resetAuth } from "../store/authSlice";
import { clearCart, resetCart } from "../store/cartSlice";
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
const ADDRESSES = "addresses";
const PAST_ORDERS = "pastOrders";
const MANAGE_ORDERS = "manageOrders";
const MANAGE_PRODUCTS = "manageProducts";
const CONTACT = "contactUs";

function useViewManager() {
  const history = useHistory();
  const dispatch = useDispatch();
  const flow = useSelector((state) => state.flow);
  const isAdmin = useSelector((state) =>
    state.auth.roles.includes("ROLE_ADMIN")
  );
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  const pushView = (viewName) => {
    dispatch(pushNextView(viewName));
  };
  const moveForward = () => {
    dispatch(popNextViewOrLandingToCurrent());
  };
  const discardStack = () => {
    dispatch(discardNextViews());
  };
  const navigateTo = (view) => {
    dispatch(discardNextViews());
    dispatch(setCurrentView(view));
  };
  const navigateToLanding = () => {
    navigateTo({ viewName: LANDING });
  };
  const promptSignIn = () => {
    dispatch(pushCurrentView());
    navigateTo(SIGNIN);
  };
  const pushCurrentAndNavigate = (destinationView) => {
    dispatch(pushCurrentViewAndSetNew(destinationView));
  };
  const logout = () => {
    navigateTo({ viewName: LANDING });
    dispatch(resetCart());
    dispatch(resetFlow());
    dispatch(resetAuth());
  };

  useEffect(() => {
    if (flow.currentView === null) {
    } else if (flow.currentView === "") {
      history.push(routes.landing.buildPath());
    } else if (typeof flow.currentView === "string") {
      history.push(routes[flow.currentView].buildPath());
    } else if (typeof flow.currentView === "object") {
      const viewName = flow.currentView.viewName;
      switch (viewName) {
        case CHECKOUT:
          history.push(routes[viewName].buildPath(flow.currentView.orderId));
          break;
        case ORDER:
          history.push(routes.order.buildPath(flow.currentView.orderId));
          break;
        case MANAGE_PRODUCTS:
        case MANAGE_ORDERS:
          if (!isAdmin) {
            navigateToLanding();
            break;
          }
          history.push(
            routes[viewName].buildPath({
              queryString: flow.currentView.queryString || "",
            })
          );
          break;
        case LANDING:
          history.push(
            routes[viewName].buildPath({
              queryString: flow.currentView.queryString || "",
            })
          );
          break;
        default:
          if (viewName) {
            history.push(routes[viewName].buildPath());
          } else {
            history.push(routes.landing.buildPath());
          }
          break;
      }
    }
  }, [flow.currentView, history, isAdmin, isAuthenticated]);

  const viewManager = {
    pushView,
    moveForward,
    navigateTo,
    navigateToLanding,
    discardStack,
    promptSignIn,
    pushCurrentAndNavigate,
    logout,
  };
  return viewManager;
}

export {
  LANDING,
  SIGNIN,
  CHECKOUT,
  ADD_ADDRESS,
  ORDER,
  ADDRESSES,
  PAST_ORDERS,
  MANAGE_ORDERS,
  MANAGE_PRODUCTS,
  CONTACT,
};
export default useViewManager;
