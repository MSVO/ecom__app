import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useAuthSelector } from "../../auth/hooks";
import useViewManager, { SIGNIN } from "../../hooks/useViewManager";
import SideNavLayout from "../../layout/SideNavLayout";
import CheckoutDetailsContainer from "../containers/CheckoutDetails";

// Page
function CheckoutPage() {
  const viewManager = useViewManager();

  const { isCustomer } = useAuthSelector();

  useEffect(() => {
    if (!isCustomer) {
      viewManager.pushCurrentAndNavigate({
        viewName: SIGNIN,
        message: {
          text: "Please sign in to continue to checkout",
          severity: "warning",
        },
      });
    }
  }, [isCustomer]);

  // JSX
  if (!isCustomer) return <Typography>Redirecting...</Typography>;
  return (
    <SideNavLayout>
      <h1>Checkout</h1>
      <CheckoutDetailsContainer />
    </SideNavLayout>
  );
}

export default CheckoutPage;
