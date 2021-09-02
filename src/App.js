import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AddAddressPage from "./pages/customer/AddAddressPage";
import AddressesPage from "./pages/customer/AddressesPage";
import AuthenticationPage from "./pages/public/AuthenticationPage";
import CheckoutPage from "./customer-cart/pages/CheckoutPage";
import ContactPage from "./pages/customer/ContactPage";
import OrderDetailsPage from "./pages/common/OrderDetailsPage";
import OrdersPage from "./pages/admin/OrdersPage";
import PastOrdersPage from "./pages/customer/PastOrdersPage";
import ProductsPage from "./pages/public/ProductsPage";
import routes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ProductsPage />
        </Route>
        <Route exact path="/checkout">
          <CheckoutPage />
        </Route>
        <Route path={routes.signIn.template}>
          <AuthenticationPage activeTab="signin" />
        </Route>
        <Route exact path={routes.order.template}>
          <OrderDetailsPage />
        </Route>
        <Route exact path={routes.addAddress.template}>
          <AddAddressPage />
        </Route>
        <Route exact path={routes.addresses.template}>
          <AddressesPage />
        </Route>
        <Route exact path={routes.pastOrders.template}>
          <PastOrdersPage />
        </Route>
        <Route exact path={routes.manageOrders.template}>
          <OrdersPage />
        </Route>
        <Route exact path={routes.manageProducts.template}>
          <ProductsPage />
        </Route>
        <Route exact path={routes.contactUs.template}>
          <ContactPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
