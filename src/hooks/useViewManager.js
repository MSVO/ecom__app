import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import { resetAuth } from "../store/authSlice";
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
const ADDRESSES = "addresses";
const PAST_ORDERS = "pastOrders";
const MANAGE_ORDERS = "manageOrders";
const MANAGE_PRODUCTS = "manageProducts";
const CONTACT = "contactUs";

function useViewManager() {
  const history = useHistory();
  const dispatch = useDispatch();
  const flow = useSelector((state) => state.flow);

  useEffect(() => {
    if (flow.currentView === null) {
    } else if (flow.currentView === "") {
      history.push(routes.landing.buildPath());
    } else if (typeof flow.currentView === "string") {
      history.push(routes[flow.currentView].buildPath());
    } else if (typeof flow.currentView === "object") {
      const viewName = flow.currentView.viewName;
      switch (viewName) {
        case ORDER:
          history.push(routes.order.buildPath(flow.currentView.orderId));
          break;
        case MANAGE_PRODUCTS:
        case MANAGE_ORDERS:
        case LANDING:
          history.push(
            routes[viewName].buildPath({
              queryString: flow.currentView.queryString || "",
            })
          );
          break;
        // case SIGNIN:
        //   history.push(routes.signIn.buildPath());
        //   break;
        // case CHECKOUT:
        //   history.push(routes.checkout.buildPath());
        //   break;
        // case ADD_ADDRESS:
        //   history.push(routes.addAddress.buildPath());
        //   break;
        // case ADDRESSES:
        //   history.push(routes.addresses.buildPath());
        //   break;
        // case PAST_ORDERS:
        //   history.push(routes.pastOrders.buildPath());
        default:
          if (viewName) {
            history.push(routes[viewName].buildPath());
          } else {
            history.push(routes.landing.buildPath());
          }
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
    dispatch(discardNextViews());
    dispatch(setCurrentView(view));
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
    dispatch(clearCart());
    dispatch(resetFlow());
    dispatch(resetAuth());
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
