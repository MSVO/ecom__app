import { useHistory } from "react-router-dom";
import routes from "../routes/routes";
import { popNextViewOrLanding, pushNextView } from "../store/flowSlice";

const LANDING = "landing";
const SIGNIN = "signin";
const CHECKOUT = "checkout";

function useViewManager() {
  const history = useHistory();

  const pushView = (viewName) => {
    pushNextView(viewName);
  };
  const moveForward = () => {
    const viewName = popNextViewOrLanding();
    history.push(routes[viewName].buildPath());
  };
  const viewManager = {
    pushView,
    moveForward,
  };
  return viewManager;
}

export { LANDING, SIGNIN, CHECKOUT };
export default useViewManager;
